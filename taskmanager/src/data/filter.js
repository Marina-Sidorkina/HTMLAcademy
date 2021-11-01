import {generateRandomNumber} from '../utils';

const FILTER_NAMES = [`ALL`, `OVERDUE`, `TODAY`, `FAVORITES`, `Repeating`, `Tags`, `ARCHIVE`];

export const generateFilterData = () => (
  FILTER_NAMES.map((item) => ({
    name: item,
    status: name === `TODAY` ? `checked` : ``,
    number: generateRandomNumber(1, 15)
  }))
);
