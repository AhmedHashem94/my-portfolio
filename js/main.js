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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJ2YWxpZGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGpzaGludCBlc3ZlcnNpb24gOiA2ICovXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgLy9wcmVsb2FkZXJcbiAgJChcIi5zcGlubmVyXCIpLmZhZGVPdXQoZnVuY3Rpb24oKSB7XG4gICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgfSk7XG4gIC8vbmF2YmFyXG4gICQoXCIubWFpbi1uYXYgdWwgbGlcIikuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAkKHRoaXMpXG4gICAgICAuYWRkQ2xhc3MoXCJhY3RpdmVcIilcbiAgICAgIC5zaWJsaW5ncygpXG4gICAgICAucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZShcbiAgICAgIHtcbiAgICAgICAgc2Nyb2xsVG9wOiAkKFxuICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5maW5kKFwiYVwiKVxuICAgICAgICAgICAgLmF0dHIoXCJocmVmXCIpXG4gICAgICAgICkub2Zmc2V0KCkudG9wXG4gICAgICB9LFxuICAgICAgODAwXG4gICAgKTtcbiAgfSk7XG4gICQoXCIuaGFtYnVyZ2VyXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoXCJpcy1hY3RpdmVcIik7XG4gIH0pO1xuICAkKFwiaGVhZGVyIC5jb250ZW50IGFcIikuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAkKFwiYm9keSwgaHRtbFwiKS5hbmltYXRlKFxuICAgICAge1xuICAgICAgICBzY3JvbGxUb3A6ICQoJCh0aGlzKS5hdHRyKFwiaHJlZlwiKSkub2Zmc2V0KCkudG9wIC0gNzBcbiAgICAgIH0sXG4gICAgICAxMDAwXG4gICAgKTtcbiAgfSk7XG4gICQod2luZG93KS5vbihcInNjcm9sbFwiLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gJCh3aW5kb3cpLmlubmVySGVpZ2h0KCkpIHtcbiAgICAgICQoXCJoZWFkZXIgLm1haW4tbmF2XCIpLmFkZENsYXNzKFwiZml4ZWQtdG9wXCIpO1xuICAgICAgJChcImhlYWRlciAubWFpbi1uYXZcIikuYWRkQ2xhc3MoXCJhbmltYXRlZCBmYWRlSW5Eb3duIGZhc3RlclwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcImhlYWRlciAubWFpbi1uYXZcIikucmVtb3ZlQ2xhc3MoXCJmaXhlZC10b3BcIik7XG4gICAgICAkKFwiaGVhZGVyIC5tYWluLW5hdlwiKS5yZW1vdmVDbGFzcyhcImZpeGVkLXRvcCBhbmltYXRlZCBmYWRlSW5Eb3duIGZhc3RlclwiKTtcbiAgICB9XG4gICAgJChcIi5ibG9ja1wiKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+ICQodGhpcykub2Zmc2V0KCkudG9wIC0gMTAwKSB7XG4gICAgICAgICQoXG4gICAgICAgICAgXCJoZWFkZXIgbmF2Lm1haW4tbmF2IHVsIGxpIGFbaHJlZj0nXCIgKyBcIiNcIiArICQodGhpcykuYXR0cihcImlkXCIpICsgXCInXVwiXG4gICAgICAgIClcbiAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAuYWRkQ2xhc3MoXCJhY3RpdmVcIilcbiAgICAgICAgICAuc2libGluZ3MoKVxuICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDEwMjQpIHtcbiAgICAkKFwiKlwiKS5yZW1vdmVDbGFzcyhcIndvd1wiKTtcbiAgfVxuICAvLyBicm9ncmVzc2VzXG5cbiAgdmFyICRtZXRlcnMgPSAkKFwiLmFib3V0IC5za2lsbHMgLnByb2dyZXNzIC5wcm9ncmVzcy1iYXJcIik7XG4gIHZhciAkc2VjdGlvbiA9ICQoXCIuYWJvdXRcIik7XG4gIHZhciAkcXVldWUgPSAkKHt9KTtcblxuICBmdW5jdGlvbiBsb2FkRGFCYXJzKCkge1xuICAgICRtZXRlcnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkZWwgPSAkKHRoaXMpO1xuICAgICAgdmFyIG9yaWdXaWR0aCA9ICRlbC5kYXRhKFwid2lkdGhcIik7XG4gICAgICAkZWwud2lkdGgoMCk7XG4gICAgICAkcXVldWUucXVldWUoZnVuY3Rpb24obmV4dCkge1xuICAgICAgICAkZWwuYW5pbWF0ZSh7IHdpZHRoOiBvcmlnV2lkdGggfSwgMjAwLCBuZXh0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgJChkb2N1bWVudCkuYmluZChcInNjcm9sbFwiLCBmdW5jdGlvbihldikge1xuICAgIHZhciBzY3JvbGxPZmZzZXQgPSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcbiAgICB2YXIgY29udGFpbmVyT2Zmc2V0ID0gJHNlY3Rpb24ub2Zmc2V0KCkudG9wICsgMTAwO1xuICAgIGlmIChzY3JvbGxPZmZzZXQgPiBjb250YWluZXJPZmZzZXQpIHtcbiAgICAgIGxvYWREYUJhcnMoKTtcbiAgICAgIC8vIHVuYmluZCBldmVudCBub3QgdG8gbG9hZCBzY3JvbHNsIGFnYWluXG4gICAgICAkKGRvY3VtZW50KS51bmJpbmQoXCJzY3JvbGxcIik7XG4gICAgfVxuICB9KTtcbiAgLy8gbWl4aXR1cCBwbHVnaW5cbiAgdmFyIG1peGVyID0gbWl4aXR1cChcIi5taXhpdHVwLWNvbnRhaW5lclwiLCB7XG4gICAgc2VsZWN0b3JzOiB7XG4gICAgICBjb250cm9sOiBcIltkYXRhLW1peGl0dXAtY29udHJvbF1cIlxuICAgIH1cbiAgfSk7XG4gIC8vIHNjcm9sbFRvcCBidXR0b25cbiAgJChcIi5zY3JvbGwtdG9wIC5pY29uXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoXG4gICAgICB7XG4gICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgfSxcbiAgICAgIDEwMDBcbiAgICApO1xuICB9KTtcbiAgLy8gd293IGpzXG4gIG5ldyBXT1coKS5pbml0KCk7XG59KTtcbiIsIi8vIGlucHV0c1xyXG5jb25zdCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYW1lXCIpO1xyXG5jb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIik7XHJcbmNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lc3NhZ2VcIik7XHJcbi8vIEZvcm1cclxuY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtXCIpO1xyXG4vLyBWYWxpZGF0aW9uIGNvbG9yc1xyXG5jb25zdCBncmVlbiA9IFwiIzRDQUY1MFwiO1xyXG5jb25zdCByZWQgPSBcIiNGNDQzMzZcIjtcclxuLy8gSGFuZGxlIGZvcm1cclxuZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgLy8gUHJldmVudCBkZWZhdWx0IGJlaGF2aW91clxyXG4gIGlmICh2YWxpZGF0ZU5hbWUoKSAmJiB2YWxpZGF0ZUVtYWlsKCkgJiYgdmFsaWRhdGVNZXNzYWdlKCkpIHtcclxuICAgIGZvcm0uc2V0QXR0cmlidXRlKFxyXG4gICAgICBcImFjdGlvblwiLFxyXG4gICAgICBcImh0dHBzOi8vZm9ybXNwcmVlLmlvL2FobWVkaGFzaGVtNDQ3MDBAZ21haWwuY29tXCJcclxuICAgICk7XHJcbiAgICBmb3JtLnNldEF0dHJpYnV0ZShcIm1ldGhvZFwiLCBcIlBPU1RcIik7XHJcbiAgICBmb3JtLnN1Ym1pdCgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyBWYWxpZGF0b3JzXHJcbmZ1bmN0aW9uIHZhbGlkYXRlTmFtZSgpIHtcclxuICAvLyBjaGVjayBpZiBpcyBlbXB0eVxyXG4gIGlmIChjaGVja0lmRW1wdHkobmFtZSkpIHJldHVybjtcclxuICAvLyBpcyBpZiBpdCBoYXMgb25seSBsZXR0ZXJzXHJcbiAgaWYgKCFjaGVja0lmT25seUxldHRlcnMobmFtZSkpIHJldHVybjtcclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5mdW5jdGlvbiB2YWxpZGF0ZUVtYWlsKCkge1xyXG4gIGlmIChjaGVja0lmRW1wdHkoZW1haWwpKSByZXR1cm47XHJcbiAgaWYgKCFjb250YWluc0NoYXJhY3RlcnMoZW1haWwsIDUpKSByZXR1cm47XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuZnVuY3Rpb24gdmFsaWRhdGVNZXNzYWdlKCkge1xyXG4gIGlmIChjaGVja0lmRW1wdHkobWVzc2FnZSkpIHJldHVybjtcclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG4vLyBVdGlsaXR5IGZ1bmN0aW9uc1xyXG5mdW5jdGlvbiBjaGVja0lmRW1wdHkoZmllbGQpIHtcclxuICBpZiAoaXNFbXB0eShmaWVsZC52YWx1ZS50cmltKCkpKSB7XHJcbiAgICAvLyBzZXQgZmllbGQgaW52YWxpZFxyXG4gICAgc2V0SW52YWxpZChmaWVsZCwgYCR7ZmllbGQubmFtZX0gbXVzdCBub3QgYmUgZW1wdHlgKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBzZXQgZmllbGQgdmFsaWRcclxuICAgIHNldFZhbGlkKGZpZWxkKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xyXG4gIGlmICh2YWx1ZSA9PT0gXCJcIikgcmV0dXJuIHRydWU7XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmZ1bmN0aW9uIHNldEludmFsaWQoZmllbGQsIG1lc3NhZ2UpIHtcclxuICBmaWVsZC5uZXh0RWxlbWVudFNpYmxpbmcuaW5uZXJIVE1MID0gbWVzc2FnZTtcclxuICBmaWVsZC5uZXh0RWxlbWVudFNpYmxpbmcuc3R5bGUuY29sb3IgPSByZWQ7XHJcbn1cclxuZnVuY3Rpb24gc2V0VmFsaWQoZmllbGQpIHtcclxuICBmaWVsZC5uZXh0RWxlbWVudFNpYmxpbmcuaW5uZXJIVE1MID0gXCJcIjtcclxuICAvL2ZpZWxkLm5leHRFbGVtZW50U2libGluZy5zdHlsZS5jb2xvciA9IGdyZWVuO1xyXG59XHJcbmZ1bmN0aW9uIGNoZWNrSWZPbmx5TGV0dGVycyhmaWVsZCkge1xyXG4gIGlmICgvXlthLXpBLVogXSskLy50ZXN0KGZpZWxkLnZhbHVlKSkge1xyXG4gICAgc2V0VmFsaWQoZmllbGQpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIHNldEludmFsaWQoZmllbGQsIGAke2ZpZWxkLm5hbWV9IG11c3QgY29udGFpbiBvbmx5IGxldHRlcnNgKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbnRhaW5zQ2hhcmFjdGVycyhmaWVsZCwgY29kZSkge1xyXG4gIGxldCByZWdFeDtcclxuICBzd2l0Y2ggKGNvZGUpIHtcclxuICAgIGNhc2UgMTpcclxuICAgICAgLy8gbGV0dGVyc1xyXG4gICAgICByZWdFeCA9IC8oPz0uKlthLXpBLVpdKS87XHJcbiAgICAgIHJldHVybiBtYXRjaFdpdGhSZWdFeChyZWdFeCwgZmllbGQsIFwiTXVzdCBjb250YWluIGF0IGxlYXN0IG9uZSBsZXR0ZXJcIik7XHJcbiAgICBjYXNlIDI6XHJcbiAgICAgIC8vIGxldHRlciBhbmQgbnVtYmVyc1xyXG4gICAgICByZWdFeCA9IC8oPz0uKlxcZCkoPz0uKlthLXpBLVpdKS87XHJcbiAgICAgIHJldHVybiBtYXRjaFdpdGhSZWdFeChcclxuICAgICAgICByZWdFeCxcclxuICAgICAgICBmaWVsZCxcclxuICAgICAgICBcIk11c3QgY29udGFpbiBhdCBsZWFzdCBvbmUgbGV0dGVyIGFuZCBvbmUgbnVtYmVyXCJcclxuICAgICAgKTtcclxuICAgIGNhc2UgMzpcclxuICAgICAgLy8gdXBwZXJjYXNlLCBsb3dlcmNhc2UgYW5kIG51bWJlclxyXG4gICAgICByZWdFeCA9IC8oPz0uKlxcZCkoPz0uKlthLXpdKSg/PS4qW0EtWl0pLztcclxuICAgICAgcmV0dXJuIG1hdGNoV2l0aFJlZ0V4KFxyXG4gICAgICAgIHJlZ0V4LFxyXG4gICAgICAgIGZpZWxkLFxyXG4gICAgICAgIFwiTXVzdCBjb250YWluIGF0IGxlYXN0IG9uZSB1cHBlcmNhc2UsIG9uZSBsb3dlcmNhc2UgbGV0dGVyIGFuZCBvbmUgbnVtYmVyXCJcclxuICAgICAgKTtcclxuICAgIGNhc2UgNDpcclxuICAgICAgLy8gdXBwZXJjYXNlLCBsb3dlcmNhc2UsIG51bWJlciBhbmQgc3BlY2lhbCBjaGFyXHJcbiAgICAgIHJlZ0V4ID0gLyg/PS4qXFxkKSg/PS4qW2Etel0pKD89LipbQS1aXSkoPz0uKlxcVykvO1xyXG4gICAgICByZXR1cm4gbWF0Y2hXaXRoUmVnRXgoXHJcbiAgICAgICAgcmVnRXgsXHJcbiAgICAgICAgZmllbGQsXHJcbiAgICAgICAgXCJNdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lIHVwcGVyY2FzZSwgb25lIGxvd2VyY2FzZSBsZXR0ZXIsIG9uZSBudW1iZXIgYW5kIG9uZSBzcGVjaWFsIGNoYXJhY3RlclwiXHJcbiAgICAgICk7XHJcbiAgICBjYXNlIDU6XHJcbiAgICAgIC8vIEVtYWlsIHBhdHRlcm5cclxuICAgICAgcmVnRXggPSAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xyXG4gICAgICByZXR1cm4gbWF0Y2hXaXRoUmVnRXgocmVnRXgsIGZpZWxkLCBcIk11c3QgYmUgYSB2YWxpZCBlbWFpbCBhZGRyZXNzXCIpO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5mdW5jdGlvbiBtYXRjaFdpdGhSZWdFeChyZWdFeCwgZmllbGQsIG1lc3NhZ2UpIHtcclxuICBpZiAoZmllbGQudmFsdWUubWF0Y2gocmVnRXgpKSB7XHJcbiAgICBzZXRWYWxpZChmaWVsZCk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2Uge1xyXG4gICAgc2V0SW52YWxpZChmaWVsZCwgbWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==
