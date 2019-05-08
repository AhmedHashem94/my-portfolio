/* jshint esversion : 6 */
$(document).ready(function() {
  //preloader
  $(".spinner").fadeOut(function() {
    $(this).remove();
  });
  //navbar
  $(".main-nav ul li").click(function(e) {
    e.preventDefault();
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
    $("html, body").animate(
      {
        scrollTop: $(
          $(this)
            .find("a")
            .attr("href")
        ).offset().top
      },
      800
    );
  });
  $(".hamburger").click(function() {
    $(this).toggleClass("is-active");
  });
  $("header .content a").click(function(e) {
    e.preventDefault();
    $("body, html").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top - 70
      },
      1000
    );
  });
  $(window).on("scroll", function() {
    if ($(window).scrollTop() > $(window).innerHeight()) {
      $("header .main-nav").addClass("fixed-top");
      $("header .main-nav").addClass("animated fadeInDown faster");
    } else {
      $("header .main-nav").removeClass("fixed-top");
      $("header .main-nav").removeClass("fixed-top animated fadeInDown faster");
    }
    $(".block").each(function() {
      if ($(window).scrollTop() > $(this).offset().top - 100) {
        $(
          "header nav.main-nav ul li a[href='" + "#" + $(this).attr("id") + "']"
        )
          .parent()
          .addClass("active")
          .siblings()
          .removeClass("active");
      }
    });
  });
  if ($(window).width() < 1024) {
    $("*").removeClass("wow");
    $("canvas").css("display", "none");
  }

  // brogresses

  var $meters = $(".about .skills .progress .progress-bar");
  var $section = $(".about");
  var $queue = $({});

  function loadDaBars() {
    $meters.each(function() {
      var $el = $(this);
      var origWidth = $el.data("width");
      $el.width(0);
      $queue.queue(function(next) {
        $el.animate({ width: origWidth }, 200, next);
      });
    });
  }

  $(document).bind("scroll", function(ev) {
    var scrollOffset = $(document).scrollTop();
    var containerOffset = $section.offset().top + 100;
    if (scrollOffset > containerOffset) {
      loadDaBars();
      // unbind event not to load scrolsl again
      $(document).unbind("scroll");
    }
  });
  // mixitup plugin
  var mixer = mixitup(".mixitup-container", {
    selectors: {
      control: "[data-mixitup-control]"
    }
  });
  // scrollTop button
  $(".scroll-top .icon").click(function() {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      1000
    );
  });
  // wow js
  new WOW().init();
});

// inputs
const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
// Form
const form = document.getElementById("myForm");
// Validation colors
const green = "#4CAF50";
const red = "#F44336";
// Handle form
form.addEventListener("submit", function(event) {
  // Prevent default behaviour
  if (validateName() && validateEmail() && validateMessage()) {
    form.setAttribute(
      "action",
      "https://formspree.io/ahmedhashem44700@gmail.com"
    );
    form.setAttribute("method", "POST");
    form.submit();
  } else {
    event.preventDefault();
    return false;
  }
});

// Validators
function validateName() {
  // check if is empty
  if (checkIfEmpty(name)) return;
  // is if it has only letters
  if (!checkIfOnlyLetters(name)) return;
  return true;
}
function validateEmail() {
  if (checkIfEmpty(email)) return;
  if (!containsCharacters(email, 5)) return;
  return true;
}
function validateMessage() {
  if (checkIfEmpty(message)) return;
  return true;
}
// Utility functions
function checkIfEmpty(field) {
  if (isEmpty(field.value.trim())) {
    // set field invalid
    setInvalid(field, `${field.name} must not be empty`);
    return true;
  } else {
    // set field valid
    setValid(field);
    return false;
  }
}
function isEmpty(value) {
  if (value === "") return true;
  return false;
}
function setInvalid(field, message) {
  field.nextElementSibling.innerHTML = message;
  field.nextElementSibling.style.color = red;
}
function setValid(field) {
  field.nextElementSibling.innerHTML = "";
  //field.nextElementSibling.style.color = green;
}
function checkIfOnlyLetters(field) {
  if (/^[a-zA-Z ]+$/.test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} must contain only letters`);
    return false;
  }
}

function containsCharacters(field, code) {
  let regEx;
  switch (code) {
    case 1:
      // letters
      regEx = /(?=.*[a-zA-Z])/;
      return matchWithRegEx(regEx, field, "Must contain at least one letter");
    case 2:
      // letter and numbers
      regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        "Must contain at least one letter and one number"
      );
    case 3:
      // uppercase, lowercase and number
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        "Must contain at least one uppercase, one lowercase letter and one number"
      );
    case 4:
      // uppercase, lowercase, number and special char
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
      return matchWithRegEx(
        regEx,
        field,
        "Must contain at least one uppercase, one lowercase letter, one number and one special character"
      );
    case 5:
      // Email pattern
      regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return matchWithRegEx(regEx, field, "Must be a valid email address");
    default:
      return false;
  }
}
function matchWithRegEx(regEx, field, message) {
  if (field.value.match(regEx)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, message);
    return false;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJ2YWxpZGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBqc2hpbnQgZXN2ZXJzaW9uIDogNiAqL1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gIC8vcHJlbG9hZGVyXG4gICQoXCIuc3Bpbm5lclwiKS5mYWRlT3V0KGZ1bmN0aW9uKCkge1xuICAgICQodGhpcykucmVtb3ZlKCk7XG4gIH0pO1xuICAvL25hdmJhclxuICAkKFwiLm1haW4tbmF2IHVsIGxpXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCh0aGlzKVxuICAgICAgLmFkZENsYXNzKFwiYWN0aXZlXCIpXG4gICAgICAuc2libGluZ3MoKVxuICAgICAgLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoXG4gICAgICB7XG4gICAgICAgIHNjcm9sbFRvcDogJChcbiAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuZmluZChcImFcIilcbiAgICAgICAgICAgIC5hdHRyKFwiaHJlZlwiKVxuICAgICAgICApLm9mZnNldCgpLnRvcFxuICAgICAgfSxcbiAgICAgIDgwMFxuICAgICk7XG4gIH0pO1xuICAkKFwiLmhhbWJ1cmdlclwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiaXMtYWN0aXZlXCIpO1xuICB9KTtcbiAgJChcImhlYWRlciAuY29udGVudCBhXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgJChcImJvZHksIGh0bWxcIikuYW5pbWF0ZShcbiAgICAgIHtcbiAgICAgICAgc2Nyb2xsVG9wOiAkKCQodGhpcykuYXR0cihcImhyZWZcIikpLm9mZnNldCgpLnRvcCAtIDcwXG4gICAgICB9LFxuICAgICAgMTAwMFxuICAgICk7XG4gIH0pO1xuICAkKHdpbmRvdykub24oXCJzY3JvbGxcIiwgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+ICQod2luZG93KS5pbm5lckhlaWdodCgpKSB7XG4gICAgICAkKFwiaGVhZGVyIC5tYWluLW5hdlwiKS5hZGRDbGFzcyhcImZpeGVkLXRvcFwiKTtcbiAgICAgICQoXCJoZWFkZXIgLm1haW4tbmF2XCIpLmFkZENsYXNzKFwiYW5pbWF0ZWQgZmFkZUluRG93biBmYXN0ZXJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCJoZWFkZXIgLm1haW4tbmF2XCIpLnJlbW92ZUNsYXNzKFwiZml4ZWQtdG9wXCIpO1xuICAgICAgJChcImhlYWRlciAubWFpbi1uYXZcIikucmVtb3ZlQ2xhc3MoXCJmaXhlZC10b3AgYW5pbWF0ZWQgZmFkZUluRG93biBmYXN0ZXJcIik7XG4gICAgfVxuICAgICQoXCIuYmxvY2tcIikuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAkKHRoaXMpLm9mZnNldCgpLnRvcCAtIDEwMCkge1xuICAgICAgICAkKFxuICAgICAgICAgIFwiaGVhZGVyIG5hdi5tYWluLW5hdiB1bCBsaSBhW2hyZWY9J1wiICsgXCIjXCIgKyAkKHRoaXMpLmF0dHIoXCJpZFwiKSArIFwiJ11cIlxuICAgICAgICApXG4gICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgLmFkZENsYXNzKFwiYWN0aXZlXCIpXG4gICAgICAgICAgLnNpYmxpbmdzKClcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCAxMDI0KSB7XG4gICAgJChcIipcIikucmVtb3ZlQ2xhc3MoXCJ3b3dcIik7XG4gICAgJChcImNhbnZhc1wiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgfVxuXG4gIC8vIGJyb2dyZXNzZXNcblxuICB2YXIgJG1ldGVycyA9ICQoXCIuYWJvdXQgLnNraWxscyAucHJvZ3Jlc3MgLnByb2dyZXNzLWJhclwiKTtcbiAgdmFyICRzZWN0aW9uID0gJChcIi5hYm91dFwiKTtcbiAgdmFyICRxdWV1ZSA9ICQoe30pO1xuXG4gIGZ1bmN0aW9uIGxvYWREYUJhcnMoKSB7XG4gICAgJG1ldGVycy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyICRlbCA9ICQodGhpcyk7XG4gICAgICB2YXIgb3JpZ1dpZHRoID0gJGVsLmRhdGEoXCJ3aWR0aFwiKTtcbiAgICAgICRlbC53aWR0aCgwKTtcbiAgICAgICRxdWV1ZS5xdWV1ZShmdW5jdGlvbihuZXh0KSB7XG4gICAgICAgICRlbC5hbmltYXRlKHsgd2lkdGg6IG9yaWdXaWR0aCB9LCAyMDAsIG5leHQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAkKGRvY3VtZW50KS5iaW5kKFwic2Nyb2xsXCIsIGZ1bmN0aW9uKGV2KSB7XG4gICAgdmFyIHNjcm9sbE9mZnNldCA9ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xuICAgIHZhciBjb250YWluZXJPZmZzZXQgPSAkc2VjdGlvbi5vZmZzZXQoKS50b3AgKyAxMDA7XG4gICAgaWYgKHNjcm9sbE9mZnNldCA+IGNvbnRhaW5lck9mZnNldCkge1xuICAgICAgbG9hZERhQmFycygpO1xuICAgICAgLy8gdW5iaW5kIGV2ZW50IG5vdCB0byBsb2FkIHNjcm9sc2wgYWdhaW5cbiAgICAgICQoZG9jdW1lbnQpLnVuYmluZChcInNjcm9sbFwiKTtcbiAgICB9XG4gIH0pO1xuICAvLyBtaXhpdHVwIHBsdWdpblxuICB2YXIgbWl4ZXIgPSBtaXhpdHVwKFwiLm1peGl0dXAtY29udGFpbmVyXCIsIHtcbiAgICBzZWxlY3RvcnM6IHtcbiAgICAgIGNvbnRyb2w6IFwiW2RhdGEtbWl4aXR1cC1jb250cm9sXVwiXG4gICAgfVxuICB9KTtcbiAgLy8gc2Nyb2xsVG9wIGJ1dHRvblxuICAkKFwiLnNjcm9sbC10b3AgLmljb25cIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZShcbiAgICAgIHtcbiAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICB9LFxuICAgICAgMTAwMFxuICAgICk7XG4gIH0pO1xuICAvLyB3b3cganNcbiAgbmV3IFdPVygpLmluaXQoKTtcbn0pO1xuIiwiLy8gaW5wdXRzXHJcbmNvbnN0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hbWVcIik7XHJcbmNvbnN0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbWFpbFwiKTtcclxuY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZVwiKTtcclxuLy8gRm9ybVxyXG5jb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUZvcm1cIik7XHJcbi8vIFZhbGlkYXRpb24gY29sb3JzXHJcbmNvbnN0IGdyZWVuID0gXCIjNENBRjUwXCI7XHJcbmNvbnN0IHJlZCA9IFwiI0Y0NDMzNlwiO1xyXG4vLyBIYW5kbGUgZm9ybVxyXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAvLyBQcmV2ZW50IGRlZmF1bHQgYmVoYXZpb3VyXHJcbiAgaWYgKHZhbGlkYXRlTmFtZSgpICYmIHZhbGlkYXRlRW1haWwoKSAmJiB2YWxpZGF0ZU1lc3NhZ2UoKSkge1xyXG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgIFwiYWN0aW9uXCIsXHJcbiAgICAgIFwiaHR0cHM6Ly9mb3Jtc3ByZWUuaW8vYWhtZWRoYXNoZW00NDcwMEBnbWFpbC5jb21cIlxyXG4gICAgKTtcclxuICAgIGZvcm0uc2V0QXR0cmlidXRlKFwibWV0aG9kXCIsIFwiUE9TVFwiKTtcclxuICAgIGZvcm0uc3VibWl0KCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIFZhbGlkYXRvcnNcclxuZnVuY3Rpb24gdmFsaWRhdGVOYW1lKCkge1xyXG4gIC8vIGNoZWNrIGlmIGlzIGVtcHR5XHJcbiAgaWYgKGNoZWNrSWZFbXB0eShuYW1lKSkgcmV0dXJuO1xyXG4gIC8vIGlzIGlmIGl0IGhhcyBvbmx5IGxldHRlcnNcclxuICBpZiAoIWNoZWNrSWZPbmx5TGV0dGVycyhuYW1lKSkgcmV0dXJuO1xyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcbmZ1bmN0aW9uIHZhbGlkYXRlRW1haWwoKSB7XHJcbiAgaWYgKGNoZWNrSWZFbXB0eShlbWFpbCkpIHJldHVybjtcclxuICBpZiAoIWNvbnRhaW5zQ2hhcmFjdGVycyhlbWFpbCwgNSkpIHJldHVybjtcclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5mdW5jdGlvbiB2YWxpZGF0ZU1lc3NhZ2UoKSB7XHJcbiAgaWYgKGNoZWNrSWZFbXB0eShtZXNzYWdlKSkgcmV0dXJuO1xyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcbi8vIFV0aWxpdHkgZnVuY3Rpb25zXHJcbmZ1bmN0aW9uIGNoZWNrSWZFbXB0eShmaWVsZCkge1xyXG4gIGlmIChpc0VtcHR5KGZpZWxkLnZhbHVlLnRyaW0oKSkpIHtcclxuICAgIC8vIHNldCBmaWVsZCBpbnZhbGlkXHJcbiAgICBzZXRJbnZhbGlkKGZpZWxkLCBgJHtmaWVsZC5uYW1lfSBtdXN0IG5vdCBiZSBlbXB0eWApO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIHNldCBmaWVsZCB2YWxpZFxyXG4gICAgc2V0VmFsaWQoZmllbGQpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5mdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XHJcbiAgaWYgKHZhbHVlID09PSBcIlwiKSByZXR1cm4gdHJ1ZTtcclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuZnVuY3Rpb24gc2V0SW52YWxpZChmaWVsZCwgbWVzc2FnZSkge1xyXG4gIGZpZWxkLm5leHRFbGVtZW50U2libGluZy5pbm5lckhUTUwgPSBtZXNzYWdlO1xyXG4gIGZpZWxkLm5leHRFbGVtZW50U2libGluZy5zdHlsZS5jb2xvciA9IHJlZDtcclxufVxyXG5mdW5jdGlvbiBzZXRWYWxpZChmaWVsZCkge1xyXG4gIGZpZWxkLm5leHRFbGVtZW50U2libGluZy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIC8vZmllbGQubmV4dEVsZW1lbnRTaWJsaW5nLnN0eWxlLmNvbG9yID0gZ3JlZW47XHJcbn1cclxuZnVuY3Rpb24gY2hlY2tJZk9ubHlMZXR0ZXJzKGZpZWxkKSB7XHJcbiAgaWYgKC9eW2EtekEtWiBdKyQvLnRlc3QoZmllbGQudmFsdWUpKSB7XHJcbiAgICBzZXRWYWxpZChmaWVsZCk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2Uge1xyXG4gICAgc2V0SW52YWxpZChmaWVsZCwgYCR7ZmllbGQubmFtZX0gbXVzdCBjb250YWluIG9ubHkgbGV0dGVyc2ApO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY29udGFpbnNDaGFyYWN0ZXJzKGZpZWxkLCBjb2RlKSB7XHJcbiAgbGV0IHJlZ0V4O1xyXG4gIHN3aXRjaCAoY29kZSkge1xyXG4gICAgY2FzZSAxOlxyXG4gICAgICAvLyBsZXR0ZXJzXHJcbiAgICAgIHJlZ0V4ID0gLyg/PS4qW2EtekEtWl0pLztcclxuICAgICAgcmV0dXJuIG1hdGNoV2l0aFJlZ0V4KHJlZ0V4LCBmaWVsZCwgXCJNdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lIGxldHRlclwiKTtcclxuICAgIGNhc2UgMjpcclxuICAgICAgLy8gbGV0dGVyIGFuZCBudW1iZXJzXHJcbiAgICAgIHJlZ0V4ID0gLyg/PS4qXFxkKSg/PS4qW2EtekEtWl0pLztcclxuICAgICAgcmV0dXJuIG1hdGNoV2l0aFJlZ0V4KFxyXG4gICAgICAgIHJlZ0V4LFxyXG4gICAgICAgIGZpZWxkLFxyXG4gICAgICAgIFwiTXVzdCBjb250YWluIGF0IGxlYXN0IG9uZSBsZXR0ZXIgYW5kIG9uZSBudW1iZXJcIlxyXG4gICAgICApO1xyXG4gICAgY2FzZSAzOlxyXG4gICAgICAvLyB1cHBlcmNhc2UsIGxvd2VyY2FzZSBhbmQgbnVtYmVyXHJcbiAgICAgIHJlZ0V4ID0gLyg/PS4qXFxkKSg/PS4qW2Etel0pKD89LipbQS1aXSkvO1xyXG4gICAgICByZXR1cm4gbWF0Y2hXaXRoUmVnRXgoXHJcbiAgICAgICAgcmVnRXgsXHJcbiAgICAgICAgZmllbGQsXHJcbiAgICAgICAgXCJNdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lIHVwcGVyY2FzZSwgb25lIGxvd2VyY2FzZSBsZXR0ZXIgYW5kIG9uZSBudW1iZXJcIlxyXG4gICAgICApO1xyXG4gICAgY2FzZSA0OlxyXG4gICAgICAvLyB1cHBlcmNhc2UsIGxvd2VyY2FzZSwgbnVtYmVyIGFuZCBzcGVjaWFsIGNoYXJcclxuICAgICAgcmVnRXggPSAvKD89LipcXGQpKD89LipbYS16XSkoPz0uKltBLVpdKSg/PS4qXFxXKS87XHJcbiAgICAgIHJldHVybiBtYXRjaFdpdGhSZWdFeChcclxuICAgICAgICByZWdFeCxcclxuICAgICAgICBmaWVsZCxcclxuICAgICAgICBcIk11c3QgY29udGFpbiBhdCBsZWFzdCBvbmUgdXBwZXJjYXNlLCBvbmUgbG93ZXJjYXNlIGxldHRlciwgb25lIG51bWJlciBhbmQgb25lIHNwZWNpYWwgY2hhcmFjdGVyXCJcclxuICAgICAgKTtcclxuICAgIGNhc2UgNTpcclxuICAgICAgLy8gRW1haWwgcGF0dGVyblxyXG4gICAgICByZWdFeCA9IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcbiAgICAgIHJldHVybiBtYXRjaFdpdGhSZWdFeChyZWdFeCwgZmllbGQsIFwiTXVzdCBiZSBhIHZhbGlkIGVtYWlsIGFkZHJlc3NcIik7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIG1hdGNoV2l0aFJlZ0V4KHJlZ0V4LCBmaWVsZCwgbWVzc2FnZSkge1xyXG4gIGlmIChmaWVsZC52YWx1ZS5tYXRjaChyZWdFeCkpIHtcclxuICAgIHNldFZhbGlkKGZpZWxkKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzZXRJbnZhbGlkKGZpZWxkLCBtZXNzYWdlKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19
