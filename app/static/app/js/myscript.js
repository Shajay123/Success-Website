$(document).ready(function () {
    // Owl Carousel initialization
    $('#slider1, #slider2, #slider3').owlCarousel({
        loop: true,
        margin: 20,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                autoplay: true,
            },
            600: {
                items: 3,
                nav: true,
                autoplay: true,
            },
            1000: {
                items: 5,
                nav: true,
                loop: true,
                autoplay: true,
            }
        }
    });

    // Plus Cart click event
    $('.plus-cart').click(function (event) {
        event.preventDefault();
        var id = $(this).data("pid").toString();
        $.ajax({
            type: "GET",
            url: "/pluscart",
            data: {
                prod_id: id
            },
            success: function (data) {
                handleCartUpdate(this, data);
            }.bind(this)
        });
    });

    // Minus Cart click event
    $('.minus-cart').click(function (event) {
        event.preventDefault();
        var id = $(this).data("pid").toString();
        $.ajax({
            type: "GET",
            url: "/minuscart",
            data: {
                prod_id: id
            },
            success: function (data) {
                handleCartUpdate(this, data);
            }.bind(this)
        });
    });

    // Remove Cart click event
    $('.remove-cart').click(function (event) {
        event.preventDefault();
        var id = $(this).data("pid").toString();
        $.ajax({
            type: "GET",
            url: "/removecart",
            data: {
                prod_id: id
            },
            success: function (data) {
                handleCartUpdate(this, data);
                $(this).closest('.card').remove(); // Remove the entire card
            }.bind(this)
        });
    });
});

// Common success callback function for AJAX requests
function handleCartUpdate(element, data) {
    var eml = element.closest('.row').find('.quantity');
    eml.text(data.quantity);
    document.getElementById("amount").innerText = data.amount;
    document.getElementById("totalamount").innerText = data.totalamount;
}