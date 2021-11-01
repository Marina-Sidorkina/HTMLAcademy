'use strict';

(function () {
  var mapFiltersBlock = document.querySelector('.map__filters-container');
  var mapFilersSelects = mapFiltersBlock.querySelectorAll('select');
  var mapFiltersFieldset = mapFiltersBlock.querySelector('fieldset');
  var housingFeaturesFieldset = document.querySelector('#housing-features');
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');
  var housingPriceSelect = document.querySelector('#housing-price');
  var PriceCheckVariant = {
    low: function (item, field) {
      return item.offer[field] < 10000;
    },
    middle: function (item, field) {
      return item.offer[field] >= 10000 && item.offer[field] <= 50000;
    },
    high: function (item, field) {
      return item.offer[field] > 50000;
    }
  };

  var setMapFiltersFormAbility = function (disabilityValue) {
    window.utils.setItemsAbility(mapFilersSelects, disabilityValue);
    mapFiltersFieldset.disabled = disabilityValue;
  };

  var checkHousingFeatures = function (item) {
    var check = true;
    var filters = housingFeaturesFieldset.querySelectorAll('input:checked');
    if (filters.length) {
      var array = Array.from(filters);
      check = array.every(function (filter) {
        return item.offer.features.some(function (feature) {
          return feature === filter.value;
        });
      });
    }
    return check;
  };

  var checkSelectValue = function (item, select, value, field) {
    var check = true;
    if (select.value !== 'any' && select !== housingPriceSelect) {
      check = item.offer[field] === value;
    } else if (select.value !== 'any') {
      check = PriceCheckVariant[value](item, field);
    }
    return check;
  };

  var checkOffer = function (item) {
    return (checkHousingFeatures(item)
      && checkSelectValue(item, housingRoomsSelect, parseInt(housingRoomsSelect.value, 10), 'rooms')
      && checkSelectValue(item, housingGuestsSelect, parseInt(housingGuestsSelect.value, 10), 'guests')
      && checkSelectValue(item, housingTypeSelect, housingTypeSelect.value, 'type')
      && checkSelectValue(item, housingPriceSelect, housingPriceSelect.value, 'price'));
  };

  setMapFiltersFormAbility(true);

  window.filter = {
    setMapFormAbility: setMapFiltersFormAbility,
    checkOffer: checkOffer
  };
})();
