// navigation
function navbarClassAddRemoveOnScroll() {
  if ($('.navbar-toggler').css('display') == 'none') {
    if($(window).scrollTop() == 0) {
      $('.navbar').addClass('nav-transparent');
    } else {
      $('.navbar').removeClass('nav-transparent');
    }
  } else {
    $('.navbar').removeClass('nav-transparent');
  }
}
function navbarClassAddRemoveOnResize() {
  if (window.innerWidth <= 991) {
    $('.navbar').removeClass('nav-transparent');
  } else {
    if($(window).scrollTop() == 0) {
      $('.navbar').addClass('nav-transparent');
    } else {
      $('.navbar').removeClass('nav-transparent');
    }
  }
}
if (window.location.pathname == '/') {
  navbarClassAddRemoveOnScroll();
  navbarClassAddRemoveOnResize();
  $(window).scroll(function (event) {
    navbarClassAddRemoveOnScroll();
  });
  $( window ).resize(function() {
    navbarClassAddRemoveOnResize();
    // $(".heroUnit").css("min-height", $('.heroUnit .container').outerHeight() + 96 + 'px');
  });
}

// smooth scrolling
$( document ).ready(function() {
  $(document).on("scroll", onScroll);
  if (window.location.hash) {
    $('html, body').animate({ scrollTop: $(window.location.hash).offset().top - 60}, 1000);
  }
  // $(".heroUnit").css("min-height", $('.heroUnit .container').outerHeight() + 96 + 'px');
});

$(".navbar-custom li a").click(function(e) {
  if($(this).attr('href').replace('/','')) {
    $('html, body').animate({ scrollTop: $($(this).attr('href').replace('/','')).offset().top - 60}, 1000);
  }
});

$(".go-to-pricing").click(function(e) {
  if($(this).attr('href').replace('/','')) {
    $('html, body').animate({ scrollTop: $($(this).attr('href').replace('/','')).offset().top - 60}, 1000);
  }
});

function onScroll(event){
  var scrollPos = $(document).scrollTop() + 77;
  $('.nav-item a').each(function () {
      var currLink = $(this);
      var links = currLink.attr("href");
      if( links &&  links.indexOf('/#') != -1 ) {
        var refElement = $(links.replace("/", ""));
        if (Object.keys(refElement).length > 0) {
          if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
              $('.nav-item').removeClass("active");
              currLink.parent().addClass("active");
          }
          else{
              currLink.parent().removeClass("active");
          }
        }
      }
  });
}

function subscriptionMsg(className) {
  setTimeout(function(){
    $("#subscribeMsg").removeClass(className);
    $("#subscribeMsg").html("");
    $('input[name="email"]').val("");
  }, 5000);
}

$( "#getInTouch" ).submit(function( event ) {
  event.preventDefault();
  var email = $("input[name='email']").val();
  $.ajax({
    type: "POST",
    url: 'https://demo.repairrabbit.co/api/feedback',
    data: { name: "lead-from-site", email },
    success: function(response) {
      $("#subscribeMsg").addClass("success");
      $("#subscribeMsg").html(`Thank you for connecting with RepairRabbit`);
      subscriptionMsg("success");
    },
    error: function(error) {
      $("#subscribeMsg").addClass("error");
      $("#subscribeMsg").html(`${JSON.parse(error.responseText).messages.email[0]}`);
      subscriptionMsg("error");
    }
  });
});

// set current year
$( "#cYear" ).html(new Date().getFullYear());
