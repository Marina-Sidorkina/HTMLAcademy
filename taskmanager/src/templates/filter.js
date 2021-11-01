export const createFilterTemplate = (data) => (
  `<span>
    <input
      type="radio"
      id="filter__${data.name.toLowerCase()}"
      class="filter__input visually-hidden"
      name="filter"
      value="${data.number}"
      ${data.status}
    />
    <label for="filter__${data.name.toLowerCase()}" class="filter__label">
      ${data.name} <span class="filter__all-count">${data.number}</span></label
    >
  </span>`
);

export const createFiltersTemplate = () => (
  `<section class="main__filter filter container">

  </section>`
);
