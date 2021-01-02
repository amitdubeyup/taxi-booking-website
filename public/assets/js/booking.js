const currentDate = new Date();
let currentDay = currentDate.getDate();
currentDay = currentDay < 10 ? `0${currentDay}` : currentDay;
let currentMonth = currentDate.getMonth() + 1;
currentMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
const currentYear = currentDate.getFullYear();
let currentHour = currentDate.getHours() + 2;
currentHour = currentHour < 10 ? `0${currentHour}` : currentHour;
let currentMinute = currentDate.getMinutes();
currentMinute = currentMinute < 10 ? `0${currentMinute}` : currentMinute;


var latitudeOne = 28.4336749;
var longitudeOne = 77.0859211;
var latitudeTwo = 28.4336749;
var longitudeTwo = 77.0859211;
var latitudeThree = 28.4336749;
var longitudeThree = 77.0859211;
var validPickupAddress = '';
var validDropOffAddress = '';
var validRentalPickupAddress = '';

var vehicle_details = null;
var rental_vehicle_details = null;
var one_way_trip = 1;
var round_way_trip = 0;
var one_way_minimum_distance = 0;
var round_way_minimum_distance = 0;
var driver_base_charge = 0;

var terms_and_conditions = 0;

var actual_distance = 0;
var total_distance = 0;
var fare_per_kilometer = 0;
var fare_able_distance = 0;
var fare_able_minimum_distance = 0;
var base_fare = 0;
var driver_charge = 0;
var gst_charge = 0;
var total_fare = 0;

var url = window.location.origin;

var map;
var directionsDisplay;
var stepDisplay;
var markerArray = [];

$(function () {
  var geoOptions = {
    enableHighAccuracy: true
  };
  var geoSuccess = function (position) {
    latitudeOne = position.coords.latitude;
    longitudeOne = position.coords.longitude;
    latitudeTwo = position.coords.latitude;
    longitudeTwo = position.coords.longitude;
    latitudeThree = position.coords.latitude;
    longitudeThree = position.coords.longitude;
  };
  var geoError = function (error) { };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

  $(window).load(function () {
    setTimeout(function () {
      pickupAddressAutoComplete();
      dropOffAddressAutoComplete();
      rentalPickupAddressAutoComplete();
    }, 1000);
  });

  $("#pickup_latitude").val(latitudeOne);
  $("#pickup_longitude").val(longitudeOne);
  $("#drop_off_latitude").val(latitudeTwo);
  $("#drop_off_longitude").val(longitudeTwo);
  $("#rental_pickup_latitude").val(latitudeThree);
  $("#rental_pickup_longitude").val(longitudeThree);
  $("#one_way_trip").val(one_way_trip);
  $("#round_way_trip").val(round_way_trip);
  $('#one_way_trip').prop('checked', one_way_trip);
  $('#round_way_trip').prop('checked', round_way_trip);
  $("#mobile").ForceNumericOnly();
  $("#otp").ForceNumericOnly();
  $("#pickup_date").attr("min", `${currentYear}-${currentMonth}-${currentDay}`);
  $("#pickup_date").val(`${currentYear}-${currentMonth}-${currentDay}`);
  $("#drop_off_date").attr("min", `${currentYear}-${currentMonth}-${currentDay}`);
  $("#drop_off_date").val(`${currentYear}-${currentMonth}-${currentDay}`);
  $("#rental_pickup_date").attr("min", `${currentYear}-${currentMonth}-${currentDay}`);
  $("#rental_pickup_date").val(`${currentYear}-${currentMonth}-${currentDay}`);
  $("#pickup_time").val(`${currentHour}:${currentMinute}`);
  $("#pickup_time").attr("min", `${currentHour}:${currentMinute}`);
  $("#rental_pickup_time").val(`${currentHour}:${currentMinute}`);
  $("#rental_pickup_time").attr("min", `${currentHour}:${currentMinute}`);
  if (one_way_trip) {
    $("#drop-off-date-section").css('display', 'none');
    $("#vehicle-type-section").addClass('col-xxs-12 col-xs-12 col-md-12 col-lg-12 mt');
  }
});

function pickupAddressAutoComplete() {
  var pickup_address = document.getElementById("pickup_address");
  this.options = {
    types: [],
    componentRestrictions: {
      country: 'in'
    }
  };
  var autocomplete = new google.maps.places.Autocomplete(pickup_address, options);
  autocomplete.addListener('place_changed', () => {
    var place = autocomplete.getPlace();
    latitudeOne = place.geometry.location.lat();
    longitudeOne = place.geometry.location.lng();
    latitudeThree = place.geometry.location.lat();
    longitudeThree = place.geometry.location.lng();
    validPickupAddress = place.formatted_address;
    validRentalPickupAddress = place.formatted_address;
    if (validPickupAddress && validDropOffAddress) {
      calculateDistance();
    }
  });
}

function dropOffAddressAutoComplete() {
  const drop_off_address = document.getElementById("drop_off_address");
  this.options = {
    types: [],
    componentRestrictions: {
      country: 'in'
    }
  };
  const autocomplete = new google.maps.places.Autocomplete(drop_off_address, options);
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    latitudeTwo = place.geometry.location.lat();
    longitudeTwo = place.geometry.location.lng();
    validDropOffAddress = place.formatted_address;
    if (validPickupAddress && validDropOffAddress) {
      calculateDistance();
    }
  });
}

function rentalPickupAddressAutoComplete() {
  var pickup_address = document.getElementById("rental_pickup_address");
  this.options = {
    types: [],
    componentRestrictions: {
      country: 'in'
    }
  };
  var autocomplete = new google.maps.places.Autocomplete(pickup_address, options);
  autocomplete.addListener('place_changed', () => {
    var place = autocomplete.getPlace();
    latitudeOne = place.geometry.location.lat();
    longitudeOne = place.geometry.location.lng();
    latitudeTwo = place.geometry.location.lat();
    longitudeTwo = place.geometry.location.lng();
    latitudeThree = place.geometry.location.lat();
    longitudeThree = place.geometry.location.lng();
    validPickupAddress = place.formatted_address;
    validDropOffAddress = place.formatted_address;
    validRentalPickupAddress = place.formatted_address;
    $("#pickup_address").val(validPickupAddress);
    $("#drop_off_address").val(validDropOffAddress);
    $("#rental_pickup_address").val(validRentalPickupAddress);
    calculateRentalAmount();
  });
}

function calculateDistance() {
  $.ajax({
    type: 'POST',
    url: `${url}/api/location/calculate-distance`,
    data: {
      latitudeOne: latitudeOne,
      longitudeOne: longitudeOne,
      latitudeTwo: latitudeTwo,
      longitudeTwo: longitudeTwo,
    },
    dataType: 'json',
    success: function (result) {
      actual_distance = result['distance'];
      $("#pickup_address").val(result['origin']);
      $("#drop_off_address").val(result['destination']);
      $("#rental_pickup_address").val(result['origin']);
      calculateAmount();
    },
    error: function (error) {
      actual_distance = 0;
    }
  });
}

$("#pickup_date").change(function () {
  const pickupDate = $("#pickup_date").val();
  const dropOffDate = $("#drop_off_date").val();
  if (dropOffDate) {
    const pickupDateTimeStamp = (new Date(pickupDate)).getTime();
    const dropOffDateTimeStamp = (new Date(dropOffDate)).getTime();
    if (pickupDateTimeStamp > dropOffDateTimeStamp) {
      $("#drop_off_date").val(pickupDate);
    }
  }
  const pickupDateTime = (new Date(pickupDate));
  if (pickupDateTime.getDate() == currentDate.getDate()) {
    $("#pickup_time").val(`${currentHour}:${currentMinute}`);
    $("#pickup_time").attr("min", `${currentHour}:${currentMinute}`);
  } else {
    $("#pickup_time").removeAttr("min");
  }
});

$("#drop_off_date").change(function () {
  const pickupDate = $("#pickup_date").val();
  const dropOffDate = $("#drop_off_date").val();
  if (pickupDate) {
    const pickupDateTimeStamp = (new Date(pickupDate)).getTime();
    const dropOffDateTimeStamp = (new Date(dropOffDate)).getTime();
    if (pickupDateTimeStamp > dropOffDateTimeStamp) {
      $("#pickup_date").val(dropOffDate);
    }
  }
});

jQuery.fn.ForceNumericOnly =
  function () {
    return this.each(function () {
      $(this).keydown(function (e) {
        var key = e.charCode || e.keyCode || 0;
        return (
          key == 8 ||
          key == 9 ||
          key == 13 ||
          key == 46 ||
          key == 110 ||
          key == 190 ||
          (key >= 35 && key <= 40) ||
          (key >= 48 && key <= 57) ||
          (key >= 96 && key <= 105));
      });
    });
  };

$("#otp").keypress(function (e) {
  var length = jQuery(this).val().length;
  if (length > 5) {
    return false;
  } else if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
    return false;
  } else if ((length == 0) && (e.which == 48)) {
    return false;
  }
});

$("#mobile").keypress(function (e) {
  var length = jQuery(this).val().length;
  if (length > 9) {
    return false;
  } else if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
    return false;
  } else if ((length == 0) && (e.which == 48)) {
    return false;
  }
});

jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});

$.validator.addMethod("validName", function (value, element) {
  return /^[a-zA-Z\s]+$/.test(value);
}, "Please enter a valid name");

$.validator.addMethod("validMobile", function (value, element) {
  return /^((\\+91-?)|0)?[0-9]{10}$/.test(value);
}, "Please enter a valid mobile number");

$.validator.addMethod("validEmail", function (value, element) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}, "Please enter a valid email address");

$("#trip_form").submit(function (e) {
  e.preventDefault();
}).validate({
  rules: {
    pickup_address: {
      required: 1,
    },
    drop_off_address: {
      required: 1,
    },
    pickup_date: {
      required: 1,
    },
    drop_off_date: {
      required: 1,
    },
    pickup_time: {
      required: 1
    },
    first_name: {
      required: 1,
      validName: 1
    },
    last_name: {
      required: 1,
      validName: 1
    },
    gender: {
      required: 1
    },
    mobile: {
      required: 1,
      validMobile: 1
    },
    email: {
      required: 1,
      validEmail: 1
    },
  },
  messages: {
    pickup_address: {
      required: "Please enter pickup address",
    },
    drop_off_address: {
      required: "Please enter drop off address",
    },
    pickup_time: {
      required: "Please select pickup time"
    },
    pickup_date: {
      required: "Please select pickup date",
    },
    drop_off_date: {
      required: "Please select drop off date",
    },
    first_name: {
      required: "Please enter your first name",
      validName: "Please enter a valid name"
    },
    last_name: {
      required: "Please enter your last name",
      validName: "Please enter a valid name"
    },
    gender: {
      required: "Please select your gender",
    },
    mobile: {
      required: "Please enter your mobile",
      validMobile: "Please enter a valid mobile number"
    },
    email: {
      required: "Please enter your email",
      validEmail: "Please enter a valid email address"
    },
  },
  submitHandler: function (form) {
    if ($("#trip_form").valid()) {
      const formDataArr = $("#trip_form").serializeArray();
      var formData = {};
      for (i in formDataArr) {
        formData[formDataArr[i]['name']] = formDataArr[i]['value']
      }
      if (terms_and_conditions) {
        $("#custom-loader").css('display', 'block');
        $.ajax({
          type: 'POST',
          url: `${url}/api/user/verify-booking-user`,
          data: formData,
          dataType: 'json',
          success: function (result) {
            $("#custom-loader").css('display', 'none');
            if (result['success']) {
              localStorage.setItem('token', result['token']);
              submitFormFinal();
            } else {
              toastr.success(result['message']);
              $('#otp_modal').modal('show');
            }
          },
          error: function (error) {
            $("#custom-loader").css('display', 'none');
            const message = error['responseJSON'] ? error['responseJSON']['message'] : 'Oops, something went wrong!';
            toastr.error(message);
          }
        });
      } else {
        toastr.error('Please read and accept terms & conditions.');
      }
    } else {
      $("#trip_form").validate();
    }
  }
});

function selectTripType() {
  if (one_way_trip) {
    one_way_trip = 0;
    round_way_trip = 1;
    $("#drop-off-date-section").css('display', 'block');
    $("#vehicle-type-section").removeClass('col-xxs-12 col-xs-12 col-md-12 col-lg-12');
    $("#vehicle-type-section").addClass('col-xxs-12 col-xs-6 col-md-6 col-lg-6');
  } else {
    one_way_trip = 1;
    round_way_trip = 0;
    $("#drop-off-date-section").css('display', 'none');
    $("#vehicle-type-section").addClass('col-xxs-12 col-xs-12 col-md-12 col-lg-12');
    $("#vehicle-type-section").removeClass('col-xxs-12 col-xs-6 col-md-6 col-lg-6');
  }
  $("#one_way_trip").val(one_way_trip);
  $("#round_way_trip").val(round_way_trip);
  $('#one_way_trip').prop('checked', one_way_trip);
  $('#round_way_trip').prop('checked', round_way_trip);
  selectVehicleType();
  calculateAmount();
}

function acceptTermsConditions() {
  terms_and_conditions = $("#terms_and_conditions").prop("checked") ? 1 : 0;
}

function formatDate(value, format) {
  if (value) {
    const fullDate = new Date(value);
    const year = fullDate.getFullYear();
    const month = fullDate.getMonth() + 1 < 10 ? '0' + (fullDate.getMonth() + 1) : fullDate.getMonth() + 1;
    const date = fullDate.getDate() < 10 ? '0' + fullDate.getDate() : fullDate.getDate();
    if (format === 'dd-mm-yyyy') {
      return date + '-' + month + '-' + year;
    }
    if (format === 'mm-dd-yyyy') {
      return month + '-' + date + '-' + year;
    }
    if (format === 'dd/mm/yyyy') {
      return date + '/' + month + '/' + year;
    }
    if (format === 'mm/dd/yyyy') {
      return month + '/' + date + '/' + year;
    }
    if (format === 'yyyy-mm-dd') {
      return year + '-' + month + '-' + date;
    }
    if (format === 'yyyy-dd-mm') {
      return year + '-' + date + '-' + month;
    }
    if (format === 'yyyy/mm/dd') {
      return year + '/' + month + '/' + date;
    }
    if (format === 'yyyy/dd/mm') {
      return year + '/' + date + '/' + month;
    }
    return fullDate;
  } else {
    return null;
  }
}

function returnDateDifference(startDate, endDate) {
  const dateOne = (new Date(startDate)).getTime();
  const dateTwo = (new Date(endDate)).getTime();
  const dateDifference = dateTwo - dateOne;
  const numberOfDate = parseInt((dateDifference / 3600000) / 24);
  return parseInt(numberOfDate) + 1;
}

function returnTimeValue(value) {
  if (value) {
    const time = parseFloat(value.split(':').join('.'));
    if ((time >= 21) && (time <= 23.59)) {
      return true
    } else if ((time >= 0) && (time <= 6)) {
      return true
    } else {
      return false;
    }
  }
}

function verifyOTP(passingData) {
  $.ajax({
    type: 'POST',
    url: `${url}/api/user/verify`,
    data: passingData,
    dataType: 'json',
    success: function (result) {
      $("#custom-loader").css('display', 'none');
      toastr.success(result['message']);
      $('#otp_modal').modal('hide');
      submitFormFinal();
    },
    error: function (error) {
      $("#custom-loader").css('display', 'none');
      const message = error['responseJSON'] ? error['responseJSON']['message'] : 'Oops, something went wrong!';
      toastr.error(message);
    }
  });
}

$("#submit-otp").click(function () {
  const mobile_code = $("#mobile_code").val();
  const mobile = $("#mobile").val();
  if (mobile_code == '' || mobile_code == null || mobile_code == undefined) {
    toastr.error('Please enter mobile verification code!');
  } else {
    const passingData = {
      mobile: mobile,
      mobile_code: mobile_code,
    };
    verifyOTP(passingData);
  }
});

function selectVehicleType() {
  const one_way_trip = parseInt($("#one_way_trip").val());
  const round_way_trip = parseInt($("#round_way_trip").val());
  const vehicle_type = $("#vehicle_type").val() ? JSON.parse($("#vehicle_type").val()) : [];
  if (vehicle_type.length) {
    let options = `<option value="">Select One</option>`;
    vehicle_type.forEach((element) => {
      if (one_way_trip == 1) {
        options = options + `<option value='${JSON.stringify(element)}'>${element['car_name']}</option>`;
      }
      if (round_way_trip == 1) {
        options = options + `<option value='${JSON.stringify(element)}'>${element['car_name']}</option>`;
      }
    });
    $("#vehicle_name").html(options);
  }
}

function selectVehicleName() {
  vehicle_details = $("#vehicle_name").val() ? JSON.parse($("#vehicle_name").val()) : null;
  rental_vehicle_details = vehicle_details;
  calculateAmount();
}

function calculateAmount() {
  if (vehicle_details) {
    const pickup_address = $("#pickup_address").val();
    const drop_off_address = $("#drop_off_address").val();
    const one_way_trip = parseInt($("#one_way_trip").val());
    const round_way_trip = parseInt($("#round_way_trip").val());
    const pickup_date = $("#pickup_date").val();
    const drop_off_date = $("#drop_off_date").val();
    const pickup_time = $("#pickup_time").val();
    if (pickup_address && drop_off_address && pickup_date && drop_off_date && pickup_time) {
      if (one_way_trip) {
        calculateFinalAmount(1);
      }
      if (round_way_trip) {
        calculateFinalAmount(2);
      }
    }
  }
}

function calculateFinalAmount(trip_type) {
  base_fare = 0;
  driver_charge = 0;
  gst_charge = 0;
  total_fare = 0;
  fare_per_kilometer = 0;
  fare_able_minimum_distance = 0;
  fare_able_distance = 0;
  total_days = 0;

  const driver_charge_applicable = returnTimeValue($('#pickup_time').val());
  one_way_minimum_distance = parseInt(vehicle_details['one_way_minimum_distance']);
  round_way_minimum_distance = parseInt(vehicle_details['round_way_minimum_distance']);
  driver_base_charge = parseInt(vehicle_details['driver_base_charge']);

  if (trip_type == 1) {
    total_days = 1;
    fare_per_kilometer = parseInt(vehicle_details['one_way_fare']);
    fare_able_minimum_distance = one_way_minimum_distance;
    fare_able_distance = actual_distance < one_way_minimum_distance ? one_way_minimum_distance : actual_distance;
  } else {
    total_days = returnDateDifference($('#pickup_date').val(), $('#drop_off_date').val());
    fare_per_kilometer = parseInt(vehicle_details['round_way_fare']);
    fare_able_minimum_distance = round_way_minimum_distance;
    fare_able_distance = (actual_distance * 2) < round_way_minimum_distance ? round_way_minimum_distance : actual_distance * 2;
  }

  const actual_fare_able_day = parseInt(fare_able_distance / fare_able_minimum_distance);

  var native_base_fare = 0;
  var native_driver_charge = driver_base_charge * total_days;
  if (driver_charge_applicable) {
    native_driver_charge = native_driver_charge + driver_base_charge;
  }

  if (total_days <= actual_fare_able_day) {
    native_base_fare = fare_per_kilometer * fare_able_distance;
    total_distance = fare_able_distance;
  } else {
    if (trip_type == 1) {
      native_base_fare = fare_per_kilometer * fare_able_minimum_distance;
      total_distance = fare_able_minimum_distance;
    } else {
      native_base_fare = fare_per_kilometer * total_days * fare_able_minimum_distance;
      total_distance = total_days * fare_able_minimum_distance;
    }
  }

  base_fare = parseInt(native_base_fare + native_driver_charge);
  driver_charge = parseInt(native_driver_charge);
  gst_charge = parseInt(base_fare * 0.05);
  total_fare = parseInt(base_fare + gst_charge);

  $("#distance-value").html(`${total_distance}.00KM`);
  $("#amount-value").html(`&#8377;${base_fare}.00/-`);
  $("#driver-value").html(`&#8377;${driver_charge}.00/-`);
  $("#tax-value").html(`&#8377;${gst_charge}.00/-`);
  $("#total-value").html(`&#8377;${total_fare}.00/-`);

  if (total_fare > 0) {
    $("#pricing-section").css('display', 'block');
    $("#distance-section").css('display', 'block');
    $("#offer-section").css('display', 'none');
  } else {
    $("#pricing-section").css('display', 'none');
    $("#distance-section").css('display', 'none');
    $("#offer-section").css('display', 'block');
  }

  if (one_way_trip) {
    $("#fare-note").html(`<strong>Note 1:</strong> If the vehicle travels between 09:00 PM to 06:00 AM, then ₹${vehicle_details['driver_base_charge']} will be charged. This charge should be paid directly to the driver.<br>
    <strong>Note 2:</strong> If vehicle travels more than ${total_distance}KM then you have to pay &#8377;${vehicle_details['one_way_fare']} per kilometer extra.`);
  }
  if (round_way_trip) {
    $("#fare-note").html(`<strong>Note 1:</strong> Toll & state tax will be paid by the customer. If the vehicle travels between 09:00 PM to 06:00 AM, then ₹${vehicle_details['driver_base_charge']} will be charged. This charge should be paid directly to the driver.<br>
    <strong>Note 2:</strong> If vehicle travels more than ${total_distance}KM then you have to pay &#8377;${vehicle_details['round_way_fare']} per kilometer extra.`);
  }
}

function selectRentalVehicleType() {
  const rental_vehicle_type = $("#rental_vehicle_type").val() ? JSON.parse($("#rental_vehicle_type").val()) : [];
  if (rental_vehicle_type.length) {
    let options = `<option value="">Select One</option>`;
    rental_vehicle_type.forEach((element) => {
      options = options + `<option value='${JSON.stringify(element)}'>${element['car_name']}</option>`;
    });
    $("#rental_vehicle_name").html(options);
  }
}

function selectRentalVehicleName() {
  rental_vehicle_details = $("#rental_vehicle_name").val() ? JSON.parse($("#rental_vehicle_name").val()) : null;
  vehicle_details = rental_vehicle_details;
  calculateRentalAmount();
}

function calculateRentalAmount() {
  if (($("#rental_pickup_address").val()) && ($("#rental_pickup_date").val()) && ($("#rental_pickup_time").val()) && (rental_vehicle_details)) {
    calculateFinalRentalAmount();
    $("#fare-note").html(`<strong>Note 1: </strong>Toll tax, state tax & parking charges are not included. This charge will be paid by the customer if applicable.<br>
    <strong>Note 2:</strong> If vehicle travels more than ${parseInt(($("#package_type").val()).split(',')[1])}KM then you have to pay &#8377;${rental_vehicle_details['rental_fare']} per kilometer extra.`);
  }
}

function calculateFinalRentalAmount() {
  base_fare = 0;
  driver_charge = 0;
  gst_charge = 0;
  total_fare = 0;

  total_distance = parseInt(($("#package_type").val()).split(',')[1]);
  fare_per_kilometer = parseInt(rental_vehicle_details['rental_fare']);
  native_base_fare = total_distance * fare_per_kilometer;

  base_fare = parseInt(native_base_fare);
  gst_charge = parseInt(base_fare * 0.05);
  total_fare = parseInt(base_fare + gst_charge);

  $("#distance-value").html(`${total_distance}.00KM`);
  $("#amount-value").html(`&#8377;${base_fare}.00/-`);
  $("#tax-value").html(`&#8377;${gst_charge}.00/-`);
  $("#total-value").html(`&#8377;${total_fare}.00/-`);

  if (total_fare > 0) {
    $("#pricing-section").css('display', 'block');
    $("#distance-section").css('display', 'block');
    $("#offer-section").css('display', 'none');
  } else {
    $("#pricing-section").css('display', 'none');
    $("#distance-section").css('display', 'none');
    $("#offer-section").css('display', 'block');
  }
}

function submitFormFinal() {
  if ($("#trip_form").valid() && (total_fare > 0)) {
    const arr = $("#trip_form").serializeArray();
    var formData = {};
    for (i in arr) {
      formData[arr[i]['name']] = arr[i]['value']
    }
    formData['actual_distance'] = total_distance;
    formData['fare_per_kilometer'] = fare_per_kilometer;
    formData['base_fare'] = base_fare;
    formData['driver_charge'] = driver_charge;
    formData['gst_charge'] = gst_charge;
    formData['total_fare'] = total_fare;
    formData['car_type'] = `${vehicle_details['car_type']} - ${vehicle_details['car_name']}`;
    formData['rental_car_type'] = `${rental_vehicle_details['car_type']} - ${rental_vehicle_details['car_name']}`;
    $("#custom-loader").css('display', 'block');
    $.ajax({
      type: 'POST',
      url: `${url}/api/booking/add`,
      data: formData,
      dataType: 'json',
      success: function (result) {
        $("#custom-loader").css('display', 'none');
        window.location.href = `${url}/payment/${result['data']['document_id']}`;
      },
      error: function (error) {
        $("#custom-loader").css('display', 'none');
        const message = error['responseJSON'] ? error['responseJSON']['message'] : 'Unable to book, Please try again!';
        toastr.error(message);
      }
    });
  } else {
    $("#trip_form").validate();
  }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

$(window).load(function () {
  setTimeout(function () {
    const cookie = getCookie('promo');
    if ((cookie == '') || (cookie == null) || (cookie == undefined)) {
      $.ajax({
        type: 'GET',
        url: `${url}/api/promo-code/fetch-active`,
        dataType: 'json',
        success: function (result) {
          $('#coupon-section').html(`
                        <img src="${result['data']['image']}" alt="Avatar" style="width:100%;">
                        <div class="coupon-container" style="background-color:white">
                        <h4 class="coupon-title"><b>${result['data']['title']}</b></h4>
                        <p class="coupon-description">${result['data']['description']}</p>
                        </div>
                        <div class="coupon-container">
                        <p class="coupon-code">Use Promo Code: <span>${result['data']['code']}</span></p>
                        </div>
                    `);
          $('#coupon_modal').modal('show');
          document.cookie = `promo=active;`;
          setCookie('promo', 'active', 1);
        },
        error: function (error) { }
      });
    }
  }, 3000);
});

$("#close_modal").click(function () {
  $('#coupon_modal').modal('hide');
});


function outstationTaxi() {
  $("#pricing-section").css('display', 'none');
  $("#offer-section").css('display', 'block');
  $("#booking_type").val('outstation');
  calculateAmount();
}


function rentalTaxi() {
  $("#pricing-section").css('display', 'none');
  $("#offer-section").css('display', 'block');
  $("#booking_type").val('rental');
  calculateRentalAmount();
}