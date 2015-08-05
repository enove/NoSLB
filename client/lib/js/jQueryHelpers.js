/* -All jQuery & JS usage for UI enhancements has been moved from templates
    to this document for review, improvements and to be moved as seen fit. */


Template.body.onRendered(function () {
    //Bind the 'esc' button to close any active 'modal' states
    //Scroll event which toggles between header states
    //Animate elements as they load in


    //Header State Change (window.scroll)
    window.addEventListener("scroll",function() { 
        if(window.scrollY > 160) {
            $('body').addClass('scrolled');
        }
        else {
            $('body').removeClass('scrolled');
            $('header nav').removeClass('active');
        }
    },false);



    //Menu Toggle Click
    $('.menu-toggle').click(function(){
        $('body').toggleClass('open-nav');
    });



    //Carousel Function
    $('section.carousel nav li').click(function(){
        var left = parseInt($('section.carousel main').css('left'));
        var carouselWidth = $('section.carousel main').width();
        if($(this).hasClass('prev')){
            if(left == 0 ){
                // do nothing
            }
            else { 
                var prevLeft = left + carouselWidth;
                $('section.carousel main').css({left: prevLeft});
            }
        }
        if($(this).hasClass('next')){
            if(left == - $('section.carousel main article').length * carouselWidth + carouselWidth){
                // do nothing
            }
            else { 
                var nextLeft = left - carouselWidth;
                $('section.carousel main').css({left: nextLeft});
            }
        }
    });
    $('.details-ref').click(function(){
        $('section.carousel').addClass('active');
     });
    $('.close-carousel').click(function(){
        $('section.carousel').removeClass('active');
     });


    //Toggle visibility of the List View in Events
    $('h4.list-view').click(function(){
        $('body').addClass('calendar-list-hide');
     });
    $('span.show-list').click(function(){
        $('body').removeClass('calendar-list-hide');
     });

}); //End jQuery Helpers