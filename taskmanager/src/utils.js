import {hashtagCheck} from './constants';

export const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];
export const generateRandomColor = () => {
  const letters = `0123456789abcdef`;
  let color = `#`;
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);
export const generateRandomBoolean = () => Math.random() >= 0.5;
export const generateRandomDate = () => (Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000);
export const generateRandomArray = (array, min, max) => array.sort(() => Math.random() - 0.5).slice(min, generateRandomNumber(min, max));

export const createNumberRange = (limit) => Array.from(new Array(limit), (_, i) => i);
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};


export const hasRepeatedDay = (repeatingDays) => Object.entries(repeatingDays).some(([_, isRepeatable]) => isRepeatable);

export const checkHashtagValidity = (inputElement, tags) => {
  if (!hashtagCheck.HASH.test(inputElement.value)
  && inputElement.value.length !== 0) {
    return {isValid: false, error: `Хештег должен начинаться с символа #`};
  } else if (hashtagCheck.HASH_ONLY.test(inputElement.value)
  && inputElement.value.length !== 0) {
    return {isValid: false, error: `Хештег не может состоять только из символа #`};
  } else if (hashtagCheck.SPACE.test(inputElement.value)) {
    return {isValid: false, error: `Хештег не может содержать знак пробела`};
  } else if ((inputElement.value.length > 8 && inputElement.value.length !== 0) || (inputElement.value.length < 3 && inputElement.value.length !== 0)) {
    return {isValid: false, error: `Один хештег не может содержать более 8 и менее 3 символов, включая символ #`};
  } else if (tags.size === 5) {
    return {isValid: false, error: `Нельзя указывать более пяти хештегов`};
  } else {
    return {isValid: true, error: ``};
  }
};

export const getFilteredCards = (cardsList) => {
  return {
    'filter__all': () => cardsList,
    'filter__overdue': () => cardsList
        .filter((card) => card.dueDate < Date.now()),
    'filter__today': () => cardsList
        .filter((card) => card.dueDate === Date.now()),
    'filter__repeating': () => {
      const list = cardsList
          .filter((card) => hasRepeatedDay(card.repeatingDays));
      return list;

    }
  };
};
