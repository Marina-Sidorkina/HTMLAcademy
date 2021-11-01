import {createCardViewTemplate} from '../templates/cards';
import BaseComponent from './base';

import {hasRepeatedDay} from '../utils';

export default class CardViewComponent extends BaseComponent {
  constructor(data) {
    super(data);

    this.setState({
      hasDate: data.hasDate,
      isFavorite: data.isFavorite,
      isRepeated: hasRepeatedDay(data.repeatingDays)
    });

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  get template() {
    return createCardViewTemplate(
        this._data,
        this._state
    );
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  createListeners() {
    if (this._element) {
      this
        ._element
        .querySelector(`.card__btn--edit`)
        .addEventListener(`click`, this._onEditButtonClick);
    }
  }

  removeListeners() {
    this
      ._element
      .querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }
}
