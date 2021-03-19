const setFilterforType = (promo) => {
  const housingTypeValue = document.querySelector('#housing-type').value;
  if (housingTypeValue === 'any') {
    return true;
  }
  return promo.offer.type === housingTypeValue;
}



const setFilterForPrice = (promo) => {
  const PRICES = {
    middle: promo.offer.price >= 10000 && promo.offer.price <= 50000,
    low: promo.offer.price < 10000,
    high: promo.offer.price >= 50000,
    // any: promo.offer.price <= 10000 || promo.offer.price >= 50000,
    any: promo.offer.price,
  }
  const housingPriceValue = document.querySelector('#housing-price').value;
  return PRICES[housingPriceValue]
}

const setFilterForRooms = (promo) => {
  const housingRoomsValue = document.querySelector('#housing-rooms').value;
  if (housingRoomsValue === promo.offer.rooms.toString()) {
    return true
  } else if (housingRoomsValue === 'any') {
    return true
  }
}

const setFilterForGuests = (promo) => {
  const housingGuestsValue = document.querySelector('#housing-guests').value;
  if (housingGuestsValue === promo.offer.guests.toString()) {
    return true
  } else if (housingGuestsValue === 'any') {
    return true
  }
}

const setFilterForFeatures = (promo) => {
  const housingFeatures = document.querySelectorAll('.map__checkbox');
  let checkedFeatures = [];
  housingFeatures.forEach((element) => {
    if (element.checked) {
      promo.offer.features.includes(element.value) ? checkedFeatures.push(true) : checkedFeatures.push(false)
    }
  })

  return checkedFeatures.includes(false) ? false : true;
}

export {setFilterforType, setFilterForPrice, setFilterForRooms, setFilterForGuests, setFilterForFeatures}
