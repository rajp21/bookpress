
document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 0) {
            document.getElementById('navbar_top').classList.add('fixed-top');
            document.getElementById('navbar_top').classList.add('scroll');
            // add padding top to show content behind navbar
            navbar_height = document.querySelector('.navbar').offsetHeight;
            document.body.style.paddingTop = navbar_height + 'px';
        } else {
            document.getElementById('navbar_top').classList.remove('fixed-top');
            document.getElementById('navbar_top').classList.remove('scroll');
            // remove padding top from body
            document.body.style.paddingTop = '0';
        }
    });
});

$(document).ready(function () {
    //counter
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });





    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbarSupportedContent',
        offset: 140
    })



    // magnific popPup
    $(".video-play").magnificPopup({
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',

            patterns: {
                youtube: {
                    index: 'youtube.com/',

                    id: 'v=',

                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: '/',
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                },
                gmaps: {
                    index: '//maps.google.',
                    src: '%id%&output=embed'
                }


            },

            srcAction: 'iframe_src',
        }
    });

    // const myModal = new bootstrap.Modal('#offcanvasSearch', {
    //     focus: true
    // })
    // $('.offcanvas').on('shown.bs.modal', function () {
    //     $('#mySearch').focus();
    // })

});



