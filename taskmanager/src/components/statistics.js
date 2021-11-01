import {createStatisticsTemplate} from '../templates/statistics';
import {generateRandomColor} from '../utils';
import {generateCurrentDate, createWidget, getAllTagsList} from '../lib/statistics';
import BaseComponent from './base';
import ChartComponent from './chart';
import {COLORS} from '../constants';
import moment from 'moment';

export default class StatisticsComponent extends BaseComponent {
  constructor(data) {
    super(data);
  }

  get template() {
    return createStatisticsTemplate();
  }

  _setChartParams(canvas, labels, background, text) {
    return {
      ctx: canvas,
      labelsArray: labels,
      backgroundColor: background,
      dataArray: [],
      text
    };
  }

  _filterCards(cardsList, startValue, endValue) {
    return cardsList.filter((card) => {
      return card.isDone
        && moment(card.dueDate).format(`D MMMM`) >= startValue
        && moment(card.dueDate).format(`D MMMM`) <= endValue;
    });
  }

  _getStatisticsByColors(newData, startElement, endElement) {
    const filteredCardsList = this._filterCards(newData, startElement.value, endElement.value);
    const statisticParams = this._setChartParams(this._element.querySelector(`.statistic__colors`), COLORS, COLORS, `COLORS`);
    COLORS.forEach((testColor, index) => {
      statisticParams.dataArray[index] = filteredCardsList.filter((card) => {
        return card.color === testColor;
      }).length;
    });
    return statisticParams;
  }

  _getStatisticsByTags(newData, startElement, endElement) {
    const filteredCardsList = this._filterCards(newData, startElement.value, endElement.value);
    const tagsList = getAllTagsList(filteredCardsList);
    const statisticParams = this._setChartParams(this._element.querySelector(`.statistic__tags`), tagsList,
        tagsList.map(generateRandomColor), `TAGS`);
    tagsList.forEach((testTag, index) => {
      statisticParams.dataArray[index] = filteredCardsList.filter((card) => {
        return Array.from(card.tags).some((tag) => tag === testTag);
      }).length;
    });
    return statisticParams;
  }

  _renderNewCharts(data, element, startElement, endElement) {
    this._tagsChart = new ChartComponent(this._getStatisticsByTags(data, startElement, endElement));
    this._colorsChart = new ChartComponent(this._getStatisticsByColors(data, startElement, endElement));
    this._tagsChart.render();
    this._colorsChart.render();
  }

  _resetCardsAmount(element, startElement, endElement) {
    element.querySelector(`.statistic__task-found`).innerHTML =
    this._filterCards(this._data, startElement.value, endElement.value).length;
    startElement.placeholder = startElement.value;
    endElement.placeholder = endElement.value;
  }

  _createListeners(element, startElement, endElement) {
    element.querySelectorAll(`.statistic-input-wrap input`)
      .forEach((input) => {
        input.addEventListener(`change`, () => {
          this._tagsChart.unrender();
          this._colorsChart.unrender();
          this._renderNewCharts(this._data, element, startElement, endElement);
          this._resetCardsAmount(element, startElement, endElement);
        });
      });
  }

  render() {
    const element = super.render();
    const startElement = element.querySelector(`.statistic__period-input-start`);
    const endElement = element.querySelector(`.statistic__period-input-end`);
    startElement.value = generateCurrentDate(`start`);
    endElement.value = generateCurrentDate(`end`);
    this._resetCardsAmount(element, startElement, endElement);
    this._element.querySelector(`.statistic__tags-wrap`).style.width = `350px`;
    this._element.querySelector(`.statistic__colors-wrap`).style.width = `350px`;
    this._renderNewCharts(this._data, element, startElement, endElement);
    this._createListeners(element, startElement, endElement);
    this._timeStart = createWidget(startElement, {
      maxDate: endElement.value,
      onClose: () => {
        this._timeStart.set(`minDate`, startElement.value);
      }
    });
    this._timeEnd = createWidget(endElement, {
      minDate: startElement.value,
      onClose: () => {
        this._timeStart.set(`maxDate`, endElement.value);
      }
    });
    return element;
  }

  unrender() {
    this._tagsChart.unrender();
    this._colorsChart.unrender();
    if (this._timeStart) {
      this._timeStart.destroy();
      this._timeStart = null;
    }
    if (this._timeEnd) {
      this._timeEnd.destroy();
      this._timeEnd = null;
    }
    super.unrender();
  }

  update(newData) {
    this._data = newData;
  }
}
