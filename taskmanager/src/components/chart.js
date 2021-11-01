import Chart from 'chart.js';
import BaseCompoentn from './base';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default class ChartComponent extends BaseCompoentn {

  get chartSetting() {
    return {
      plugins: [ChartDataLabels],
      type: `pie`,
      data: {
        labels: this._data.labelsArray,
        datasets: [{
          data: this._data.dataArray,
          backgroundColor: this._data.backgroundColor
        }]
      },
      options: {
        plugins: {
          datalabels: {
            display: false
          }
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const allData = data.datasets[tooltipItem.datasetIndex].data;
              const tooltipData = allData[tooltipItem.index];
              const total = allData.reduce((acc, it) => acc + parseFloat(it));
              const tooltipPercentage = Math.round((tooltipData / total) * 100);
              return `${tooltipData} TASKS — ${tooltipPercentage}%`;
            }
          },
          displayColors: false,
          backgroundColor: `#ffffff`,
          bodyFontColor: `#000000`,
          borderColor: `#000000`,
          borderWidth: 1,
          cornerRadius: 0,
          xPadding: 15,
          yPadding: 15
        },
        title: {
          display: true,
          text: `DONE BY: ${this._data.text}`,
          fontSize: 16,
          fontColor: `#000000`
        },
        legend: {
          position: `left`,
          labels: {
            boxWidth: 15,
            padding: 25,
            fontStyle: 500,
            fontColor: `#000000`,
            fontSize: 13
          }
        }
      }
    };
  }

  render() {
    this._element = new Chart(this._data.ctx, this.chartSetting);
    return this._element;
  }

  unrender() {
    this._element.destroy();
  }
}
