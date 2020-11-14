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
        url: `${page_url}/api/transaction/initiate`,
        data: passingData,
        dataType: 'json',
        success: function (result) {
            $("#loader").css('display', 'none');
            toastr.success(result['message']);
            window.location.href = `${page_url}/payment-initiate/${result['data']}`;
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
        order_id: $("#document_id").val(),
        order_amount: $("#cash_payment").val(),
        customer_id: $("#mobile").val(),
    };
    initiateTransaction(passingData);
});

$("#pay-full-payment").click(() => {
    const passingData = {
        order_id: $("#document_id").val(),
        order_amount: $("#full_payment").val(),
        customer_id: $("#mobile").val(),
    };
    initiateTransaction(passingData);
});
