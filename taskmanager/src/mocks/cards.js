import {getRandomArrayElement} from '../utils';
import {generateRandomBoolean} from '../utils';
import {generateRandomDate} from '../utils';
import {generateRandomArray} from '../utils';
import {createNumberRange} from '../utils';

import {COLORS} from '../constants';

const tagsLimit = {
  MIN: 0,
  MAX: 3
};

const TITLES = [
  `Изучить теорию`,
  `Пересмотреть лекцию`,
  `Покрутить демки`,
  `Почитать конспект`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const TAGS = [
  `homework`,
  `theory`,
  `practice`,
  `demo`,
  `intensive`,
  `keks`
];

const generateCard = (id) => ({
  id,
  title: getRandomArrayElement(TITLES),
  dueDate: generateRandomDate(),
  tags: new Set(generateRandomArray(TAGS, tagsLimit.MIN, tagsLimit.MAX)),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: getRandomArrayElement(COLORS),
  repeatingDays: {
    'mo': generateRandomBoolean(),
    'tu': generateRandomBoolean(),
    'we': generateRandomBoolean(),
    'th': generateRandomBoolean(),
    'fr': generateRandomBoolean(),
    'sa': generateRandomBoolean(),
    'su': generateRandomBoolean()
  },
  isFavorite: generateRandomBoolean(),
  hasDate: true,
  isDone: generateRandomBoolean()
});

export const generateCards = (limit) => (
  createNumberRange(limit).map(generateCard)
);
