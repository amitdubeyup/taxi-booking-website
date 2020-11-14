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

var terms_and_conditions = 0;
var mobile_code = 0;
var native_base_fare = parseInt($('#package_amount').val());
var base_fare = 0;
var gst_charge = 0;
var total_days = 0;
var total_person = 0;
var total_fare = 0;
var url = window.location.origin;

$(function () {
    $("#mobile").ForceNumericOnly();
    $("#otp").ForceNumericOnly();
    $("#start_date").attr("min", `${currentYear}-${currentMonth}-${currentDay}`);
    $("#start_date").val(`${currentYear}-${currentMonth}-${currentDay}`);
    $("#end_date").attr("min", `${currentYear}-${currentMonth}-${currentDay}`);
    $("#end_date").val(`${currentYear}-${currentMonth}-${currentDay}`);
    calculateFinalAmount();
});

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

$("#package_form").submit(function (e) {
    e.preventDefault();
}).validate({
    rules: {
        salutation: {
            required: 1,
        },
        first_name: {
            required: 1,
            validName: 1
        },
        last_name: {
            required: 1,
            validName: 1
        },
        mobile: {
            required: 1,
            validMobile: 1
        },
        email: {
            required: 1,
            validEmail: 1
        },
        package_type: {
            required: 1,
        },
        start_date: {
            required: 1
        },
        end_date: {
            required: 1,
        },
        adults: {
            required: 1
        },
        children: {
            required: 1,
        },
    },
    messages: {
        salutation: {
            required: "Please select salutation",
        },
        first_name: {
            required: "Please enter first name",
            validName: "Please enter a valid name"
        },
        last_name: {
            required: "Please enter last name",
            validName: "Please enter a valid name"
        },
        mobile: {
            required: "Please enter mobile number",
            validMobile: "Please enter a valid mobile number"
        },
        email: {
            required: "Please enter your email",
            validEmail: "Please enter a valid email address"
        },
        package_type: {
            required: "Please select room type",
        },
        start_date: {
            required: "Please select start date",
        },
        end_date: {
            required: "Please select end date",
        },
        adults: {
            required: "Please select adults",
        },
        children: {
            required: "Please select children",
        },
    },
    submitHandler: function (form) {
        if ($("#package_form").valid()) {
            const formDataArr = $("#package_form").serializeArray();
            var formData = {};
            for (i in formDataArr) { formData[formDataArr[i]['name']] = formDataArr[i]['value'] }
            if (terms_and_conditions) {
                $("#custom-loader").css('display', 'block');
                $.ajax({
                    type: 'POST',
                    url: `${url}/api/user/verify-hotel-booking-user`,
                    data: formData,
                    dataType: 'json',
                    success: function (result) {
                        $("#custom-loader").css('display', 'none');
                        if (result['success']) {
                            toastr.success(result['message']);
                            $('#otp_modal').modal('show');
                        } else {
                            toastr.error(result['message']);
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
            $("#package_form").validate();
        }
    }
});

function acceptTermsConditions() {
    terms_and_conditions = $("#terms_and_conditions").prop("checked") ? 1 : 0;
}

$("#start_date").change(function () {
    const checkInDate = $("#start_date").val();
    const checkOutDate = $("#end_date").val();
    if (checkOutDate) {
        const checkInDateTimeStamp = (new Date(checkInDate)).getTime();
        const checkOutDateTimeStamp = (new Date(checkOutDate)).getTime();
        if (checkInDateTimeStamp > checkOutDateTimeStamp) {
            $("#end_date").val('');
            toastr.error('Drop off date can not be less than pickup date!');
        }
    }
    calculateFinalAmount();
});

$("#end_date").change(function () {
    const checkInDate = $("#start_date").val();
    const checkOutDate = $("#end_date").val();
    if (checkInDate) {
        const checkInDateTimeStamp = (new Date(checkInDate)).getTime();
        const checkOutDateTimeStamp = (new Date(checkOutDate)).getTime();
        if (checkInDateTimeStamp > checkOutDateTimeStamp) {
            $("#start_date").val('');
            toastr.error('Drop off date can not be less than pickup date!');
        }
    }
    calculateFinalAmount();
});

function calculateFinalAmount() {
    if (($('#package_amount').val()) && ($('#start_date').val()) && ($('#end_date').val())) {
        total_days = returnDateDifference($('#start_date').val(), $('#end_date').val());
        total_person = parseInt($('#adults').val()) + parseInt($('#children').val());
        if (total_person == 1 && total_days >= 1) {
            base_fare = native_base_fare * total_days;
        } else if (total_person >= 1 && total_days == 1) {
            base_fare = native_base_fare * total_person;
        } else if (total_person == 1 && total_days == 1) {
            base_fare = native_base_fare;
        } else {
            base_fare = native_base_fare * (total_person + total_days);
        }

        var tax_rate = 0;
        if (base_fare <= 1000) {
            tax_rate = 0;
        } else if (1000 < base_fare <= 2500) {
            tax_rate = 0.12;
        } else if (2500 < base_fare <= 7500) {
            tax_rate = 0.18;
        } else if (7500 < base_fare) {
            tax_rate = 0.28;
        } else {
            tax_rate = 0.18;
        }

        gst_charge = parseInt(base_fare * tax_rate);
        total_fare = parseInt(base_fare + gst_charge);
        $("#amount-value").html(`&#8377;${base_fare}.00/-`);
        $("#tax-value").html(`&#8377;${gst_charge}.00/-`);
        $("#total-value").html(`&#8377;${total_fare}.00/-`);
    }
}

$("#submit-otp").click(function () {
    mobile_code = $("#mobile_code").val();
    const mobile = $("#mobile").val();
    if (mobile_code == '' || mobile_code == null || mobile_code == undefined) {
        toastr.error('Please enter mobile verification code!');
    }
    else {
        $("#custom-loader").css('display', 'block');
        const passingData = {
            mobile: mobile,
            mobile_code: mobile_code,
        };
        $.ajax({
            type: 'POST',
            url: `${url}/api/user/verify-hotel-booking-code`,
            data: passingData,
            dataType: 'json',
            success: function (result) {
                $("#custom-loader").css('display', 'none');
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
});

function submitFormFinal() {
    if ($("#package_form").valid() && (total_fare > 0)) {
        const arr = $("#package_form").serializeArray();
        var formData = {};
        for (i in arr) { formData[arr[i]['name']] = arr[i]['value'] }
        formData['native_base_fare'] = native_base_fare;
        formData['total_days'] = total_days;
        formData['base_fare'] = base_fare;
        formData['gst_charge'] = gst_charge;
        formData['total_fare'] = total_fare;
        formData['mobile_code'] = mobile_code;
        formData['message'] = $("#message").val();
        formData['package_document_id'] = $("#package_document_id").val();
        formData['package_owner_mobile'] = $("#package_owner_mobile").val();
        formData['package_name'] = $("#package_name").val();
        formData['package_location'] = $("#package_location").val();
        formData['package_quotation'] = $("#package_quotation").val();
        $("#custom-loader").css('display', 'block');
        $.ajax({
            type: 'POST',
            url: `${url}/api/package-booking/add`,
            data: formData,
            dataType: 'json',
            success: function (result) {
                $("#custom-loader").css('display', 'none');
                toastr.success(result['message']);
                window.location.href = `${url}/packages`;
            },
            error: function (error) {
                $("#custom-loader").css('display', 'none');
                const message = error['responseJSON'] ? error['responseJSON']['message'] : 'Unable to book, Please try again!';
                toastr.error(message);
            }
        });
    } else {
        $("#package_form").validate();
    }
}

function displayImagePreview(package_image, package_image_name) {
    $("#image-preview").html(`<img src="${package_image}" class="package-large-image"
    alt="${package_image_name}" />`);
}

function selectPrice() {
    var package_type = ($("#package_type").val()).split('-');
    native_base_fare = parseInt(package_type[1]);
    calculateFinalAmount();
}