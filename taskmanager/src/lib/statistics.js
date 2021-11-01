import flatpickr from 'flatpickr';
import moment from 'moment';


export const getAllTagsList = (cardsList) => {
  const tags = new Set();
  cardsList.forEach((card) => {
    card.tags.forEach((tag) => {
      tags.add(tag);
    });
  });
  return Array.from(tags);
};

export const generateCurrentDate = (type) => moment(Date.now())[type + `Of`](`week`).add(1, `days`).format(`D MMMM`);

export const createWidget = (element, params) => flatpickr(element,
    Object.assign({}, {altInput: true, altFormat: `j F`, dateFormat: `j F`}, params));
