const uuid = require('uuid');

const Booking = {
  document_id: null,
  salutation: null,
  first_name: null,
  last_name: null,
  mobile: null,
  email: null,
  gender: null,

  booking_type: null,
  package_type: null,
  car_type: null,
  rental_car_type: null,

  pickup_address: null,
  pickup_latitude: null,
  pickup_longitude: null,
  pickup_date: null,
  pickup_time: null,

  drop_off_address: null,
  drop_off_latitude: null,
  drop_off_longitude: null,
  drop_off_date: null,

  rental_pickup_address: null,
  rental_pickup_latitude: null,
  rental_pickup_longitude: null,
  rental_pickup_date: null,
  rental_pickup_time: null,

  one_way_trip: null,
  round_way_trip: null,
  actual_distance: null,

  fare_per_kilometer: null,
  base_fare: null,
  driver_charge: null,
  extra_day_charge: null,
  gst_charge: null,
  total_fare: null,
  deduction_rate: 20,

  payment_gateway: null,
  payment_description: null,
  payment_reference_number: null,
  payment_amount: null,
  payment_status: null,

  discount_code: null,
  discount_amount: 0,

  vendor_mobile: null,
  driver_mobile: null,
  vehicle_id: null,

  message: null,

  status: null,
  created_at: null,
  updated_at: null,
};

function returnUpdatedBookingCollectionField(receivedData) {
  const newObj = Object.assign({}, Booking);
  Object.keys(newObj).forEach((index) => {
    newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
  });
  return newObj;
}

function returnNewBookingData(receivedData) {
  const newObj = Object.assign({}, Booking);
  Object.keys(newObj).forEach((index) => {
    newObj[index] = receivedData[index] ? receivedData[index] : newObj[index];
  });
  newObj['document_id'] = uuid();
  newObj['mobile'] = newObj['mobile'] ? parseInt(newObj['mobile']) : newObj['mobile'];
  newObj['vendor_mobile'] = newObj['vendor_mobile'] ? parseInt(newObj['vendor_mobile']) : newObj['vendor_mobile'];
  newObj['driver_mobile'] = newObj['driver_mobile'] ? parseInt(newObj['driver_mobile']) : newObj['driver_mobile'];
  newObj['status'] = 'booked';
  newObj['created_at'] = (new Date()).getTime();
  newObj['updated_at'] = (new Date()).getTime();
  return newObj;
}

function returnUpdatedBookingData(previousData, receivedData) {
  const previousObj = Object.assign({}, previousData);
  Object.keys(previousObj).forEach((index) => {
    previousObj[index] = receivedData[index] ? receivedData[index] : previousObj[index];
  });
  previousObj['mobile'] = previousObj['mobile'] ? parseInt(previousObj['mobile']) : previousObj['mobile'];
  previousObj['vendor_mobile'] = previousObj['vendor_mobile'] ? parseInt(previousObj['vendor_mobile']) : previousObj['vendor_mobile'];
  previousObj['driver_mobile'] = previousObj['driver_mobile'] ? parseInt(previousObj['driver_mobile']) : previousObj['driver_mobile'];
  previousObj['updated_at'] = (new Date()).getTime();
  return previousObj;
}

module.exports = {
  returnUpdatedBookingCollectionField: returnUpdatedBookingCollectionField,
  returnNewBookingData: returnNewBookingData,
  returnUpdatedBookingData: returnUpdatedBookingData,
};