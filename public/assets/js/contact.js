var url = window.location.origin;

jQuery.fn.ForceNumericOnly = function () {
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

$("#contact-form").submit(function (e) {
    e.preventDefault();
}).validate({
    rules: {
        name: {
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
        message: {
            required: 1,
        },
    },
    messages: {
        name: {
            required: "Please enter your name",
            validName: "Please enter a valid name"
        },
        mobile: {
            required: "Please enter your mobile",
            validMobile: "Please enter a valid mobile number"
        },
        email: {
            required: "Please enter your email",
            validEmail: "Please enter a valid email address"
        },
        message: {
            required: "Please enter your message",
        },
    },
    submitHandler: function (form) {
        $("#custom-loader").css('display', 'block');
        const contactFormArr = $("#contact-form").serializeArray();
        var contactFormData = {};
        for (i in contactFormArr) { contactFormData[contactFormArr[i]['name']] = contactFormArr[i]['value'] }
        $.ajax({
            type: 'POST',
            url: `${url}/api/contact/add`,
            data: contactFormData,
            dataType: 'json',
            success: function (result) {
                $("#custom-loader").css('display', 'none');
                toastr.success('Message sent successfully!');
                $("#contact-form").trigger("reset");
            },
            error: function (error) {
                $("#custom-loader").css('display', 'none');
                toastr.error('Unable to send message, Please try again!');
            }
        });
    }
});