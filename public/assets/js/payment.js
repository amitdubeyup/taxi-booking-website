var page_url = window.location.origin;
function initiatePromoTransaction(passingData, endpoint) {
    $("#loader").css('display', 'block');
    $.ajax({
        type: 'POST',
        url: `${page_url}/api/promo-code/${endpoint}`,
        data: passingData,
        dataType: 'json',
        success: function (result) {
            $("#loader").css('display', 'none');
            toastr.success(result['message']);
            location.reload();
        },
        error: function (error) {
            $("#loader").css('display', 'none');
            const message = error['responseJSON'] ? error['responseJSON']['message'] : 'Oops, something went wrong!';
            toastr.error(message);
        }
    });
}

$("#remove-promo-code").click(() => {
    if ($("#code").val()) {
        const passingData = {
            document_id: $("#document_id").val(),
            code: ($("#code").val()).toUpperCase(),
        };
        initiatePromoTransaction(passingData, 'remove');
    } else {
        toastr.error('Promo code is required!');
    }
});

$("#apply-promo-code").click(() => {
    if ($("#code").val()) {
        const passingData = {
            document_id: $("#document_id").val(),
            code: ($("#code").val()).toUpperCase(),
        };
        initiatePromoTransaction(passingData, 'apply');
    } else {
        toastr.error('Promo code is required!');
    }
});

function initiateTransaction(passingData) {
    $("#loader").css('display', 'block');
    $.ajax({
        type: 'POST',
        url: `${page_url}/api/payment/create-order`,
        data: passingData,
        dataType: 'json',
        success: function (result) {
            const data = result['data'];
            $("#loader").css('display', 'none');
            const options = {
                key: data['key'],
                amount: data['amount'],
                currency: data['currency'],
                name: data['name'],
                description: data['description'],
                image: data['image'],
                order_id: data['order_id'],
                callback_url: data['callback_url'],
                prefill: {
                    name: data['customer_name'],
                    email: data['customer_email'],
                    contact: data['customer_contact']
                },
                notes: {
                    address: data['address']
                },
                theme: {
                    color: data['color']
                }
            };
            const razorpay = new Razorpay(options);
            razorpay.open();
        },
        error: function (error) {
            $("#loader").css('display', 'none');
            const message = error['responseJSON'] ? error['responseJSON']['message'] : 'Oops, something went wrong!';
            toastr.error(message);
        }
    });
}

$("#pay-cash-payment").click(() => {
    const passingData = {
        customer_name: $("#name").val(),
        customer_email: $("#email").val(),
        customer_contact: $("#mobile").val(),
        amount: parseInt($("#cash_payment").val(), 10) * 100,
        currency: "INR",
        receipt: $("#document_id").val(),
        notes: 'Booking Payment'
    };
    initiateTransaction(passingData);
});

$("#pay-full-payment").click(() => {
    const passingData = {
        customer_name: $("#name").val(),
        customer_email: $("#email").val(),
        customer_contact: $("#mobile").val(),
        amount: parseInt($("#full_payment").val(), 10) * 100,
        currency: "INR",
        receipt: $("#document_id").val(),
        notes: 'Booking Payment'
    };
    initiateTransaction(passingData);
});
