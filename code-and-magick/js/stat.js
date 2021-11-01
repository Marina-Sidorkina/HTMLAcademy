'use strict';

(function () {
  var cloudParams = {
    WIDTH: 420,
    HEIGHT: 270,
    START_X: 100,
    START_Y: 10,
    FIRST_COLOR: 'rgba(255, 255, 255, 1)',
    SECOND_COLOR: 'rgba(51, 102, 255, 1)',
    COLOR_FIRST_OFFSET: 0.3,
    COLOR_SECOND_OFFSET: 1,
    BORDER_COLOR: 'rgba(0, 51, 204, 1)',
    BORDER_WIDTH: 3,
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
    SHADOW_OFFSET: 10,
  };

  var textParams = {
    FONT: '16px PT Mono',
    COLOR: 'rgba(0,0,0,1)',
    SHADOW: 'transparent',
    BASELINE: 'hanging',
    FIRST_LINE_X: 240,
    FIRST_LINE_Y: 30,
    SECOND_LINE_X: 225,
    SECOND_LINE_Y: 50
  };

  var chartParams = {
    HEIGHT: 150,
    WIDTH: 40,
    SPACE: 50,
    MAIN_COLOR: 'rgba(255, 0, 0, 1)',
    START_X: 165,
    START_Y: 245,
    BOTTOM_OFFSET_Y: 5,
    TOP_OFFSET_Y: 15
  };

  var getRandomNumber = function (min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
  };

  var getMaxElement = function (array) {
    return Math.max.apply(null, array);
  };

  var renderCloud = function (ctx) {
    var gradient = ctx.createLinearGradient(cloudParams.START_X, cloudParams.START_Y, cloudParams.WIDTH, cloudParams.HEIGHT);
    gradient.addColorStop(cloudParams.COLOR_FIRST_OFFSET, cloudParams.FIRST_COLOR);
    gradient.addColorStop(cloudParams.COLOR_SECOND_OFFSET, cloudParams.SECOND_COLOR);
    ctx.beginPath();
    ctx.moveTo(100, 10);
    ctx.lineTo(149, 10);
    ctx.lineTo(149, 30);
    ctx.lineTo(160, 30);
    ctx.lineTo(160, 40);
    ctx.lineTo(170, 40);
    ctx.lineTo(170, 50);
    ctx.lineTo(200, 50);
    ctx.lineTo(200, 40);
    ctx.lineTo(210, 40);
    ctx.lineTo(210, 30);
    ctx.lineTo(220, 30);
    ctx.lineTo(220, 20);
    ctx.lineTo(230, 20);
    ctx.lineTo(230, 10);
    ctx.lineTo(260, 10);
    ctx.lineTo(260, 20);
    ctx.lineTo(280, 20);
    ctx.lineTo(280, 10);
    ctx.lineTo(300, 10);
    ctx.lineTo(300, 20);
    ctx.lineTo(350, 20);
    ctx.lineTo(350, 10);
    ctx.lineTo(390, 10);
    ctx.lineTo(390, 20);
    ctx.lineTo(400, 20);
    ctx.lineTo(400, 30);
    ctx.lineTo(410, 30);
    ctx.lineTo(410, 40);
    ctx.lineTo(420, 40);
    ctx.lineTo(420, 70);
    ctx.lineTo(450, 70);
    ctx.lineTo(450, 60);
    ctx.lineTo(460, 60);
    ctx.lineTo(460, 50);
    ctx.lineTo(500, 50);
    ctx.lineTo(500, 60);
    ctx.lineTo(510, 60);
    ctx.lineTo(510, 70);
    ctx.lineTo(520, 70);
    ctx.lineTo(520, 150);
    ctx.lineTo(490, 150);
    ctx.lineTo(490, 160);
    ctx.lineTo(500, 160);
    ctx.lineTo(500, 170);
    ctx.lineTo(520, 170);
    ctx.lineTo(520, 240);
    ctx.lineTo(510, 240);
    ctx.lineTo(510, 250);
    ctx.lineTo(500, 250);
    ctx.lineTo(500, 260);
    ctx.lineTo(490, 260);
    ctx.lineTo(490, 270);
    ctx.lineTo(480, 270);
    ctx.lineTo(480, 280);
    ctx.lineTo(400, 280);
    ctx.lineTo(400, 270);
    ctx.lineTo(290, 270);
    ctx.lineTo(290, 280);
    ctx.lineTo(200, 280);
    ctx.lineTo(200, 270);
    ctx.lineTo(150, 270);
    ctx.lineTo(150, 260);
    ctx.lineTo(140, 260);
    ctx.lineTo(140, 250);
    ctx.lineTo(130, 250);
    ctx.lineTo(130, 240);
    ctx.lineTo(120, 240);
    ctx.lineTo(120, 230);
    ctx.lineTo(110, 230);
    ctx.lineTo(110, 220);
    ctx.lineTo(100, 220);
    ctx.lineTo(100, 180);
    ctx.lineTo(120, 180);
    ctx.lineTo(120, 170);
    ctx.lineTo(130, 170);
    ctx.lineTo(130, 160);
    ctx.lineTo(150, 160);
    ctx.lineTo(150, 150);
    ctx.lineTo(120, 150);
    ctx.lineTo(120, 140);
    ctx.lineTo(110, 140);
    ctx.lineTo(110, 130);
    ctx.lineTo(100, 130);
    ctx.lineTo(100, 100);
    ctx.lineTo(120, 100);
    ctx.lineTo(120, 90);
    ctx.lineTo(130, 90);
    ctx.lineTo(130, 80);
    ctx.lineTo(100, 80);
    ctx.lineTo(100, 10);
    ctx.fillStyle = gradient;
    ctx.strokeStyle = cloudParams.BORDER_COLOR;
    ctx.lineWidth = cloudParams.BORDER_WIDTH;
    ctx.stroke();
    ctx.shadowColor = cloudParams.SHADOW_COLOR;
    ctx.shadowOffsetX = cloudParams.SHADOW_OFFSET;
    ctx.shadowOffsetY = cloudParams.SHADOW_OFFSET;
    ctx.fill();
  };

  var renderText = function (ctx) {
    ctx.fillStyle = textParams.COLOR;
    ctx.shadowColor = textParams.SHADOW;
    ctx.font = textParams.FONT;
    ctx.textBaseline = textParams.BASELINE;
    ctx.fillText('Ура вы победили!', textParams.FIRST_LINE_X, textParams.FIRST_LINE_Y);
    ctx.fillText('Список результатов:', textParams.SECOND_LINE_X, textParams.SECOND_LINE_Y);
  };

  var renderBar = function (ctx, x, y, height, width, color) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - height);
    ctx.lineTo(x + width, y - height);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x, y);
    ctx.fillStyle = color;
    ctx.fill();
  };

  var renderName = function (ctx, name, x, y) {
    ctx.font = textParams.FONT;
    ctx.fillStyle = textParams.COLOR;
    ctx.textBaseline = textParams.BASELINE;
    ctx.fillText(name, x, y + chartParams.BOTTOM_OFFSET_Y);
  };

  var renderScore = function (ctx, time, x, y, height) {
    ctx.font = textParams.FONT;
    ctx.fillStyle = textParams.COLOR;
    ctx.textBaseline = textParams.BASELINE;
    ctx.fillText(Math.round(time), x, y - height - chartParams.TOP_OFFSET_Y);
  };

  var renderChart = function (ctx, names, times, maxTime) {
    var x = chartParams.START_X;
    var y = chartParams.START_Y;
    for (var i = 0; i < names.length; i++) {
      var color = names[i] === 'Вы' ? chartParams.MAIN_COLOR : 'rgba(51, 0, 204, ' + getRandomNumber(0.1, 1) + ')';
      var height = (chartParams.HEIGHT / maxTime) * times[i];
      renderBar(ctx, x, y, height, chartParams.WIDTH, color);
      renderName(ctx, names[i], x, y);
      renderScore(ctx, times[i], x, y, height);
      x = x + chartParams.WIDTH + chartParams.SPACE;
    }
  };

  window.renderStatistics = function (ctx, names, times) {
    var maxTime = getMaxElement(times);
    renderCloud(ctx);
    renderText(ctx);
    renderChart(ctx, names, times, maxTime);
  };
})();
