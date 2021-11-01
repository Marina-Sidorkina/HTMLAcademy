import BaseComponent from './base';
import CardComponent from './card';
import {createCardsTemplate} from '../templates/cards';

export default class CardsComponent extends BaseComponent {
  constructor(data) {
    super(data);
  }

  get template() {
    return createCardsTemplate();
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  render() {
    const element = super.render();

    this._renderCards(element.querySelector(`.board__tasks`));

    return element;
  }

  _renderCards(containerElement) {
    this.components = this._data.map((card) => {
      const component = new CardComponent(card);

      component.onEdit = (({prevElement, nextElement}) => {
        containerElement.replaceChild(nextElement, prevElement);
      });

      component.onSubmit = (({prevData, nextData, prevElement, nextElement}) => {
        const index = this._data.findIndex((item) => item.id === prevData.id);
        this._data[index] = Object.assign({}, this._data[index], nextData);
        containerElement.replaceChild(nextElement, prevElement);
        if (typeof this._onChange === `function`) {
          this._onChange(this._data);
        }
      });

      component.onDelete = (({data, element}) => {
        const index = this._data.findIndex((item) => item.id === data.id);
        this._data[index] = null;
        this._data = this._data.filter((item) => item !== null);
        containerElement.removeChild(element);
        if (typeof this._onChange === `function`) {
          this._onChange(this._data);
        }
      });
      return component;
    });

    this.components.forEach((component) => {
      containerElement.appendChild(component.render());
    });
  }

  unrender() {
    if (this._state.isRendered) {
      this.components.forEach((component) => {
        component.unrender();
      });
      this.components = null;
    }
    super.unrender();
  }
}
