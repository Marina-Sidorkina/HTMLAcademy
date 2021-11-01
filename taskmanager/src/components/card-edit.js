import flatpickr from 'flatpickr';
import moment from 'moment';
import BaseComponent from './base';
import {COLORS} from '../constants';
import getCardDataPattern from '../patterns/card';
import getRepeatingDays from '../patterns/repeating-days';
import {createCardEditTemplate, createNewHashtagTemplate} from '../templates/cards';
import {hasRepeatedDay, checkHashtagValidity, createElement} from '../utils';
import {createPreview} from '../lib/picture';

import 'flatpickr/dist/flatpickr.css';

export default class CardEditComponent extends BaseComponent {
  constructor(data) {
    super(data);

    this.setState({
      hasDate: data.hasDate,
      isFavorite: data.isFavorite,
      isRepeated: hasRepeatedDay(data.repeatingDays)
    });

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDateChange = this._onDateChange.bind(this);
    this._onRepeatChange = this._onRepeatChange.bind(this);
    this._onColorChange = this._onColorChange.bind(this);
    this._onHashtagEnter = this._onHashtagEnter.bind(this);
    this._onHashtagDelete = this._onHashtagDelete.bind(this);
    this._onHashtagInvalid = this._onHashtagInvalid.bind(this);
    this._onPictureChange = this._onPictureChange.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  _resetDisabilityStatus(element, value) {
    if (value) {
      element.removeAttribute(`disabled`);
    } else {
      element.setAttribute(`disabled`, `disabled`);
    }
  }

  _resetYesNoStatus(element, value) {
    element.textContent = value ? `yes` : `no`;
  }

  _removeCardColor(element) {
    for (const color of COLORS) {
      element.classList.remove(`card--` + color);
    }
  }

  _onDateChange() {
    const hasDate = !this._state.hasDate;
    this.setState({
      hasDate
    });
    this._data.hasDate = this._state.hasDate;
    this._resetDisabilityStatus(this._element.querySelector(`.card__date-deadline`), this._state.hasDate);
    this._resetYesNoStatus(this._element.querySelector(`.card__date-status`), this._state.hasDate);
  }

  _onRepeatChange() {
    this.setState({
      isRepeated: !this._state.isRepeated
    });
    this._data.isRepeated = this._state.isRepeated;
    this._element.classList.toggle(`card--repeat`);
    this._resetDisabilityStatus(this._element.querySelector(`.card__repeat-days`), this._state.isRepeated);
    this._resetYesNoStatus(this._element.querySelector(`.card__repeat-status`), this._state.isRepeated);
  }

  _onColorChange(evt) {
    const color = `card--` + evt.target.value;
    this._removeCardColor(this._element);
    this._element.classList.add(color);
  }

  _onHashtagInvalid() {
    const inputElement = this._element.querySelector(`.card__hashtag-input`);
    const {isValid, error} = checkHashtagValidity(inputElement, this._data.tags);
    const validity = isValid ? `` : error;
    inputElement.setCustomValidity(validity);
  }

  _onHashtagEnter(evt) {
    const hashtagInputElement = this._element.querySelector(`.card__hashtag-input`);
    const hashtagsInitialAmount = this._data.tags.size;

    if (evt.keyCode === 13 && hashtagInputElement.checkValidity()) {
      evt.preventDefault();
      this._data.tags.add(evt.target.value.replace(/#/, ``));

      if (this._data.tags.size > hashtagsInitialAmount && evt.target.value.length !== 0) {
        const template = createNewHashtagTemplate(this._element
          .querySelector(`.card__hashtag-input`).value.replace(/#/, ``));
        this._element.querySelector(`.card__hashtag-list`)
          .appendChild(createElement(template));
      }

      this._element.querySelectorAll(`.card__hashtag-delete`).forEach((elem) => {
        elem.removeEventListener(`click`, this._onHashtagDelete);
      });
      this._element.querySelectorAll(`.card__hashtag-delete`).forEach((elem) => {
        elem.addEventListener(`click`, this._onHashtagDelete);
      });
      evt.target.value = ``;
    }
  }

  _onHashtagDelete(evt) {
    const targetElement = evt.target.parentNode;
    const hashtagElementValue = targetElement.querySelector(`input`).value;
    this._data.tags.delete(hashtagElementValue);
    this._element.querySelector(`.card__hashtag-list`).removeChild(targetElement);
    this._onHashtagInvalid();
  }

  _onPictureChange() {
    const pictureInputElement = this._element.querySelector(`.card__img-input`);
    const picturePreviewElement = this._element.querySelector(`.card__img`);
    createPreview(pictureInputElement, picturePreviewElement);
  }

  _getDefaultTime() {
    const date = new Date(this._data.dueDate);
    return {
      hours: parseInt(moment(date).format(`h`), 10),
      minutes: parseInt(moment(date).format(`mm`), 10)
    };
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const defaultTime = this._getDefaultTime();
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = Object.assign(this._processForm(formData), {isRepeated: this._state.isRepeated}, {hasDate: this._state.hasDate});
    const newDueDate = new Date(newData.dueDate);
    if (!this._element.querySelector(`.card__time`).value) {
      newData.dueDate = new Date(newDueDate.getFullYear(),
          newDueDate.getMonth(), newDueDate.getDate(),
          defaultTime.hours, defaultTime.minutes);
    }
    this.update(newData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onDelete === `function` && this._onDelete();
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  get template() {
    return createCardEditTemplate(
        this._data,
        this._state
    );
  }

  _createCardMapper(target, newRepeatingDaysValues) {
    return {
      hashtag: (value) => (target.tags.add(value)),
      text: (value) => (target.title = value),
      color: (value) => (target.color = value),
      repeat: (value) => (newRepeatingDaysValues[value] = true),
      date: (value) => (target.dueDate = `${value}, 2019, `),
      time: (value) => (target.dueDate = Date.parse(target.dueDate + value))
    };
  }

  _processForm(formData) {
    const entry = getCardDataPattern;
    const newRepeatingDaysValues = getRepeatingDays();
    const taskEditMapper = this._createCardMapper(entry, newRepeatingDaysValues);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }
    entry.repeatingDays = newRepeatingDaysValues;
    return entry;
  }

  createListeners() {
    this._element
      .querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element
      .querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, this._onDateChange);
    this._element.querySelector(`.card__repeat-toggle`)
        .addEventListener(`click`, this._onRepeatChange);
    this._element.querySelectorAll(`.card__color-input`)
      .forEach((input) => input.addEventListener(`click`, this._onColorChange));
    this._element.querySelector(`.card__hashtag-input`)
      .addEventListener(`keypress`, this._onHashtagEnter);
    this._element.querySelectorAll(`.card__hashtag-delete`).forEach((element) => {
      element.addEventListener(`click`, this._onHashtagDelete);
    });
    this._element.querySelectorAll(`.card__hashtag-input`).forEach((element) => {
      element.addEventListener(`input`, this._onHashtagInvalid);
    });
    this._element.querySelector(`.card__img-input`)
      .addEventListener(`change`, this._onPictureChange);
    this._element.querySelector(`.card__delete`)
      .addEventListener(`click`, this._onDeleteButtonClick);
  }

  removeListeners() {
    this
      ._element
      .querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this.
      _element.querySelector(`.card__date-deadline-toggle`)
      .removeEventListener(`click`, this._onDateChange);
    this.
      _element.querySelector(`.card__repeat-toggle`)
      .removeEventListener(`click`, this._onRepeatChange);
    this.
      _element.querySelectorAll(`.card__color-input`)
      .forEach((input) => input.removeEventListener(`click`, this._onColorChange));
    this.
      _element.querySelector(`.card__hashtag-input`)
      .addEventListener(`keypress`, this._onHashtagEnter);
    this.
      _element.querySelectorAll(`.card__hashtag-delete`).forEach((element) => {
        element.addEventListener(`click`, this._onHashtagDelete);
      });
    this.
      _element.querySelectorAll(`.card__hashtag-input`).forEach((element) => {
        element.removeEventListener(`input`, this._onHashtagInvalid);
      });
    this.
      _element.querySelector(`.card__img-input`)
      .addEventListener(`change`, this._onPictureChange);
    this.
      _element.querySelector(`.card__delete`)
      .removeEventListener(`click`, this._onDeleteButtonClick);
  }

  render() {
    this._element = super.render();

    if (this._state.hasDate) {
      this.widgetDate = flatpickr(this._element.querySelector(`.card__date`), {altInput: true, altFormat: `j F`, dateFormat: `j F`});
      this.widgetTime = flatpickr(this._element.querySelector(`.card__time`), {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i K`, dateFormat: `h:i K`});
    }

    return this._element;
  }

  unrender() {
    if (this.widgetDate) {
      this.widgetDate.destroy();
      this.widgetDate = null;
    }
    if (this.widgetTime) {
      this.widgetTime.destroy();
      this.widgetTime = null;
    }
    super.unrender();
  }
}
