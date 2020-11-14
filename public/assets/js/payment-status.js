var url = window.location.origin;
$("#pay-now-cash").click(() => {
    const passingData = {
        created_at: $("#created_at").val(),
        document_id: $("#document_id").val()
    };
    $("#loader").css('display', 'block');
    $.ajax({
        type: 'POST',
        url: `${url}/api/booking/payment`,
        data: passingData,
        dataType: 'json',
        success: function (result) {
            $("#loader").css('display', 'none');
            toastr.success(result['message']);
            window.location.href = url;
        },
        error: function (error) {
            $("#loader").css('display', 'none');
            const message = error['responseJSON'] ? error['responseJSON']['message'] : 'Oops, something went wrong!';
            toastr.error(message);
        }
    });
});

$("#pay-now-online").click(() => {
    toastr.error('Unable to pay online at this moment, Please choose cash payment instead!');
});