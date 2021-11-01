import BaseComponent from './base';
import CardEditComponent from './card-edit';
import CardViewComponent from './card-view';
import {hasRepeatedDay} from '../utils';

export default class CardComponent extends BaseComponent {

  get template() {}

  set onEdit(fn) {
    this._onEdit = fn;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  render() {
    if (this._state.isRendered) {
      return this._element;
    }
    const editComponent = new CardEditComponent(this._data);
    const viewComponent = new CardViewComponent(this._data);
    this._state.isRendered = true;
    this._element = viewComponent.render();

    viewComponent.onEdit = () => {
      if (typeof this._onEdit === `function`) {
        this._onEdit({
          prevElement: viewComponent.element,
          nextElement: editComponent.render()
        });
      }
      viewComponent.unrender();
      this._element = editComponent.element;
    };

    editComponent.onSubmit = (changedData) => {
      const prevData = Object.assign({}, this._data);
      viewComponent.update(changedData);
      const nextData = Object.assign({}, viewComponent._data);

      viewComponent.setState({
        isRepeated: hasRepeatedDay(changedData.repeatingDays),
        hasDate: changedData.hasDate
      });

      if (typeof this._onSubmit === `function`) {
        this._onSubmit({
          prevData,
          nextData,
          prevElement: editComponent.element,
          nextElement: viewComponent.render()
        });
      }
      editComponent.unrender();
      this._element = viewComponent.element;
    };

    editComponent.onDelete = () => {
      if (typeof this._onDelete === `function`) {
        this._onDelete({
          data: this._data,
          element: editComponent.element
        });
      }
      editComponent.unrender();
    };
    return this._element;
  }

  unrender() {
    if (this._state.isRendered) {
      this._element = null;
      this.setState({
        isRendered: false
      });
    }
  }
}
