
$(document).ready(function(){
    $('.slider__item').slick({
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/section4/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/section4/right.svg"></button>'
    });

    $('[data-modal=consultation]').on('click', function(){
        $('.dark-bg, #consultation').fadeIn();
    });
    document.getElementById('BTN').onclick = function() {
        let name = document.getElementById('name').value,
            surname = document.getElementById('surname').value,
            phone = document.getElementById('phone').value,
            email = document.getElementById('email').value,
            city = document.getElementById('city').value,
            street = document.getElementById('street').value,
            home = document.getElementById('home').value,
            apartment = document.getElementById('apartment').value;
        
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/customer',
            dataType: 'json',
            contentType: "application/json",
            async: false,
            data: JSON.stringify({
                NAME: name,
                SURNAME: surname,
                CUST_STATUS_ID: 1,
                CUST_TYPE_ID: 1,
                PHONE: 818188112,
                EMAIL: email,
                CITY: city,
                STREET: street,
                HOME: home,
                APARTMENT: apartment,
                CREATE_USER: 'TEST',
                UPDATE_USER: 'TEST'
            }),
            success: function (data) {
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3000/api/deals',
                    dataType: 'json',
                    contentType: "application/json",
                    async: false,
                    data: JSON.stringify({
                        CUSTOMER_ID: data.ID,
                        STATUS: 1,
                        COMMENTS: "ASDASD"
                    }),
                    success: function (data) {
                        $('.dark-bg, #consultation,#order,#ty').fadeOut();
                    }, 
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('Ошибка: "' + jqXHR.responseJSON.ERR_MSG + '"');
                    }
                });
            }, 
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Ошибка: "' + jqXHR.responseJSON.ERR_MSG + '"');
            }
        })
    };
    $('.modal__close').on('click', function(){
        $('.dark-bg, #consultation,#order,#ty').fadeOut();
    });
    $('.catalog__block_btn').each(function(i) {
        $(this).on('click', function() {
            $('.dark-bg, #order').fadeIn('slow');
        });
    });

    $('.form').validate();
    $('.modal__form').validate();
    $('input[name=phone').mask("+7(999)-999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.dark-bg, .modal_ty').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });
    $(window).scroll(function(){
        if($(this).scrollTop() > 1600){
            $('.up').fadeIn();
        }else{
            $('.up').fadeOut();
        }
    });
    $("a[href='#up']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog__block_item').eq(i).toggleClass('catalog__block_item_active');
                $('.catalog__block_list').eq(i).toggleClass('catalog__block_list_active');
            });
        });
    };

    toggleSlide('.catalog__block_link');
    toggleSlide('.catalog__block_back');

});
    

