import {COLORS} from '../constants';
import moment from 'moment';

const STATUSES = [`edit`, `archive`, `favorites`];

const createButtonTemlate = (isFavorite, value) => (
  `<button type="button" class="card__btn card__btn--${value}
    ${(!isFavorite && value === `favorites`) ? `card__btn--disabled` : ``}">
    ${value}
  </button>`
);

const createButtonsTemlate = (isFavorite) => {
  const block = STATUSES
    .map((value) => (
      createButtonTemlate(isFavorite, value)
    ))
    .join(``);

  return (
    `<div class="card__control">
      ${block}
    </div>`
  );
};

const createColorBarTemplate = () => (
  `<div class="card__color-bar">
    <svg class="card__color-bar-wave" width="100%" height="10">
      <use xlink:href="#wave"></use>
    </svg>
  </div>`
);

const createTextareaTemplate = (card) => (
  `<div class="card__textarea-wrap">
    <label>
      <textarea
        class="card__text"
        placeholder="Start typing your text here..."
        name="text">${card.title}</textarea>
    </label>
  </div>`
);

const createDeadlineToggleTemplate = (hasDate) => (
  `<button class="card__date-deadline-toggle" type="button">
    date: <span class="card__date-status">${hasDate ? `yes` : `no`}</span>
  </button>`
);

const createDeadlineInputTemlate = (parameter, setting) => (
  `<label class="card__input-deadline-wrap">
    <input
      class="card__${parameter}"
      type="text"
      placeholder="${setting}"
      name="${parameter}"
      value="${setting.toString()}"
    />
  </label>`
);

const createDeadlineTemplate = (card, hasDate) => {
  const date = new Date(card.dueDate);
  return `<fieldset class="card__date-deadline" ${!hasDate && `disabled`}>
    ${createDeadlineInputTemlate(`date`, moment(date).format(`D MMMM`))}
    ${createDeadlineInputTemlate(`time`,
      moment(date).format(`h:mm`) + ` ` + moment(date).format(`a`).toUpperCase())}
  </fieldset>`;
};

const createRepeatToggleTemplate = (isRepeated) => (
  `<button class="card__repeat-toggle" type="button">
    repeat:<span class="card__repeat-status">
      ${isRepeated ? `yes` : `no`}
    </span>
  </button>`
);

const createRepeatDayInputTemplate = (card, day) => (
  `<input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-${day}-${card.id}"
    name="repeat"
    value="${day}"
    ${card.repeatingDays[day] ? `checked` : ``}
  />
  <label class="card__repeat-day" for="repeat-${day}-${card.id}"
    >${day}</label
  >`
);

const createRepeatDaysTemplate = (card, isRepeated) => {
  const block = Object.entries(card.repeatingDays)
    .map((day) => createRepeatDayInputTemplate(card, day[0], card.id))
    .join(``);

  return (
    `<fieldset class="card__repeat-days" ${!isRepeated ? `disabled` : ``}>
      <div class="card__repeat-days-inner">
        ${block}
      </div>
    </fieldset>`
  );
};

const createDatesTemplate = (card, state) => (
  `<div class="card__dates">
    ${createDeadlineToggleTemplate(state.hasDate)}
    ${createDeadlineTemplate(card, state.hasDate)}
    ${createRepeatToggleTemplate(state.isRepeated)}
    ${createRepeatDaysTemplate(card, state.isRepeated)}
  </div>`
);

const createColorTemplate = (card) => (color) => (
  `<input
    type="radio"
    id="color-${color}-${card.id}"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    ${(color === card.color) ? `checked` : ``}
  />
  <label
    for="color-${color}-${card.id}"
    class="card__color card__color--${color}"
    >${color}</label
  >`
);

const createColorsTemplate = (card) => {
  const block = COLORS
    .map(createColorTemplate(card))
    .join(``);

  return (
    `<div class="card__colors-inner">
      <h3 class="card__colors-title">Color</h3>
      <div class="card__colors-wrap">
        ${block}
      </div>
    </div>`
  );
};

const createPictureTemplate = (card) => (
  `<label class="card__img-wrap">
    <input
      type="file"
      class="card__img-input visually-hidden"
      name="img"
    />
    <img
      src="${card.picture}"
      alt="task picture"
      class="card__img"
    />
  </label>`
);

const createHashtagButtonTemplate = (tag) => (
  `<span class="card__hashtag-inner">
    <input
      type="hidden"
      name="hashtag"
      value="${tag}"
      class="card__hashtag-hidden-input"
    />
    <button type="button" class="card__hashtag-name">
      #${tag}
    </button>
    <button type="button" class="card__hashtag-delete">
      delete
    </button>
  </span>`
);

const createHashtagInputTemplate = () => (
  `<label>
    <input
      type="text"
      class="card__hashtag-input"
      name="hashtag-input"
      placeholder="Type new hashtag here"
    />
  </label>`
);

const createHashtagsTemplate = (card) => {
  const block = Array.from(card.tags)
    .map(createHashtagButtonTemplate)
    .join(``);

  return (
    `<div class="card__hashtag">
      <div class="card__hashtag-list">
        ${block}
      </div>
      ${createHashtagInputTemplate()}
    </div>`
  );
};

const createStatusButtonsTemplate = () => (
  `<div class="card__status-btns">
    <button class="card__save" type="submit">save</button>
    <button class="card__delete" type="button">delete</button>
  </div>`
);

export const createNewHashtagTemplate = (hashtag) => (
  `<span class="card__hashtag-inner">
    <input
      type="hidden"
      name="hashtag"
      value="${hashtag}"
      class="card__hashtag-hidden-input"
    />
    <button type="button" class="card__hashtag-name">
      #${hashtag}
    </button>
    <button type="button" class="card__hashtag-delete">
      delete
    </button>
  </span>`
);

export const createCardViewTemplate = (card, state) => (
  `<article class="card ${card.color ? `card--${card.color}` : `card--black`} ${state.isRepeated ? `card--repeat` : ``}">
    <form class="card__form" method="get">
      <div class="card__inner">
      ${createButtonsTemlate(state.isFavorite)}
      ${createColorBarTemplate()}
      ${createTextareaTemplate(card)}
       <div class="card__settings">
          <div class="card__details">
            ${createDatesTemplate(card, state)}
            ${createHashtagsTemplate(card)}
          </div>
          ${createPictureTemplate(card)}
          ${createColorsTemplate(card)}
        </div>
          ${createStatusButtonsTemplate()}
       </div>
    </form>
  </article>`
);

export const createCardEditTemplate = (card, state) => (
  `<article class="card card--edit ${card.color ? `card--${card.color}` : `card--black`} ${state.isRepeated ? `card--repeat` : ``}">
    <form class="card__form" method="get">
      <div class="card__inner">
      ${createButtonsTemlate(state.isFavorite)}
      ${createColorBarTemplate()}
      ${createTextareaTemplate(card)}
       <div class="card__settings">
          <div class="card__details">
            ${createDatesTemplate(card, state)}
            ${createHashtagsTemplate(card)}
          </div>
          ${createPictureTemplate(card)}
          ${createColorsTemplate(card)}
        </div>
          ${createStatusButtonsTemplate()}
       </div>
    </form>
  </article>`
);

export const createCardsTemplate = () => (
  `<section class="board container">
    <p class="board__no-tasks visually-hidden">
      Congratulations, all tasks were completed! To create a new click on
      «add new task» button.
    </p>
    <div class="board__tasks"></div>
    <button class="load-more" type="button">load more</button>
  </section>
`);
