export const createStatisticsTemplate = () => (
  `<section class="statistic container">
    <div class="statistic__line">
      <div class="statistic__period">
        <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>

        <div class="statistic-input-wrap">
          <input
            class="statistic__period-input-start"
            type="text"
            id = "start"
            placeholder="01 Feb"
          />
          <input
            class="statistic__period-input-end"
            type="text"
            id = "end"
            placeholder="01 Feb"
          />
        </div>

        <p class="statistic__period-result">
          In total for the specified period
          <span class="statistic__task-found">0</span> tasks were fulfilled.
        </p>
      </div>
      <div class="statistic__line-graphic visually-hidden">
        <canvas class="statistic__days" width="550" height="150"></canvas>
      </div>
    </div>

    <div class="statistic__circle">
      <div class="statistic__tags-wrap">
        <canvas class="statistic__tags" width="400" height="300"></canvas>
      </div>
      <div class="statistic__colors-wrap">
        <canvas class="statistic__colors" width="400" height="300"></canvas>
      </div>
    </div>
  </section>`
);
