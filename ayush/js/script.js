let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
}


window.onscroll = () => {
    navbar.classList.remove('active');
}


$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('#topbtn').fadeIn();
        }
        else {
            $('#topbtn').fadeOut();
        }
    });


    $("#topbtn").click(function () {
        $('html, body').animate({ scrollTop: 0 }, 10);
    });
});