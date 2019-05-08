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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJ2YWxpZGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoganNoaW50IGVzdmVyc2lvbiA6IDYgKi9cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAvL3ByZWxvYWRlclxuICAkKFwiLnNwaW5uZXJcIikuZmFkZU91dChmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICB9KTtcbiAgLy9uYXZiYXJcbiAgJChcIi5tYWluLW5hdiB1bCBsaVwiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQodGhpcylcbiAgICAgIC5hZGRDbGFzcyhcImFjdGl2ZVwiKVxuICAgICAgLnNpYmxpbmdzKClcbiAgICAgIC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKFxuICAgICAge1xuICAgICAgICBzY3JvbGxUb3A6ICQoXG4gICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmZpbmQoXCJhXCIpXG4gICAgICAgICAgICAuYXR0cihcImhyZWZcIilcbiAgICAgICAgKS5vZmZzZXQoKS50b3BcbiAgICAgIH0sXG4gICAgICA4MDBcbiAgICApO1xuICB9KTtcbiAgJChcIi5oYW1idXJnZXJcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcyhcImlzLWFjdGl2ZVwiKTtcbiAgfSk7XG4gICQoXCJoZWFkZXIgLmNvbnRlbnQgYVwiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoXCJib2R5LCBodG1sXCIpLmFuaW1hdGUoXG4gICAgICB7XG4gICAgICAgIHNjcm9sbFRvcDogJCgkKHRoaXMpLmF0dHIoXCJocmVmXCIpKS5vZmZzZXQoKS50b3AgLSA3MFxuICAgICAgfSxcbiAgICAgIDEwMDBcbiAgICApO1xuICB9KTtcbiAgJCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsIGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAkKHdpbmRvdykuaW5uZXJIZWlnaHQoKSkge1xuICAgICAgJChcImhlYWRlciAubWFpbi1uYXZcIikuYWRkQ2xhc3MoXCJmaXhlZC10b3BcIik7XG4gICAgICAkKFwiaGVhZGVyIC5tYWluLW5hdlwiKS5hZGRDbGFzcyhcImFuaW1hdGVkIGZhZGVJbkRvd24gZmFzdGVyXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiaGVhZGVyIC5tYWluLW5hdlwiKS5yZW1vdmVDbGFzcyhcImZpeGVkLXRvcFwiKTtcbiAgICAgICQoXCJoZWFkZXIgLm1haW4tbmF2XCIpLnJlbW92ZUNsYXNzKFwiZml4ZWQtdG9wIGFuaW1hdGVkIGZhZGVJbkRvd24gZmFzdGVyXCIpO1xuICAgIH1cbiAgICAkKFwiLmJsb2NrXCIpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gJCh0aGlzKS5vZmZzZXQoKS50b3AgLSAxMDApIHtcbiAgICAgICAgJChcbiAgICAgICAgICBcImhlYWRlciBuYXYubWFpbi1uYXYgdWwgbGkgYVtocmVmPSdcIiArIFwiI1wiICsgJCh0aGlzKS5hdHRyKFwiaWRcIikgKyBcIiddXCJcbiAgICAgICAgKVxuICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgIC5hZGRDbGFzcyhcImFjdGl2ZVwiKVxuICAgICAgICAgIC5zaWJsaW5ncygpXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgaWYgKCQod2luZG93KS53aWR0aCgpIDwgMTAyNCkge1xuICAgICQoXCIqXCIpLnJlbW92ZUNsYXNzKFwid293XCIpO1xuICB9XG5cbiAgLy8gYnJvZ3Jlc3Nlc1xuXG4gIHZhciAkbWV0ZXJzID0gJChcIi5hYm91dCAuc2tpbGxzIC5wcm9ncmVzcyAucHJvZ3Jlc3MtYmFyXCIpO1xuICB2YXIgJHNlY3Rpb24gPSAkKFwiLmFib3V0XCIpO1xuICB2YXIgJHF1ZXVlID0gJCh7fSk7XG5cbiAgZnVuY3Rpb24gbG9hZERhQmFycygpIHtcbiAgICAkbWV0ZXJzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgJGVsID0gJCh0aGlzKTtcbiAgICAgIHZhciBvcmlnV2lkdGggPSAkZWwuZGF0YShcIndpZHRoXCIpO1xuICAgICAgJGVsLndpZHRoKDApO1xuICAgICAgJHF1ZXVlLnF1ZXVlKGZ1bmN0aW9uKG5leHQpIHtcbiAgICAgICAgJGVsLmFuaW1hdGUoeyB3aWR0aDogb3JpZ1dpZHRoIH0sIDIwMCwgbmV4dCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gICQoZG9jdW1lbnQpLmJpbmQoXCJzY3JvbGxcIiwgZnVuY3Rpb24oZXYpIHtcbiAgICB2YXIgc2Nyb2xsT2Zmc2V0ID0gJChkb2N1bWVudCkuc2Nyb2xsVG9wKCk7XG4gICAgdmFyIGNvbnRhaW5lck9mZnNldCA9ICRzZWN0aW9uLm9mZnNldCgpLnRvcCArIDEwMDtcbiAgICBpZiAoc2Nyb2xsT2Zmc2V0ID4gY29udGFpbmVyT2Zmc2V0KSB7XG4gICAgICBsb2FkRGFCYXJzKCk7XG4gICAgICAvLyB1bmJpbmQgZXZlbnQgbm90IHRvIGxvYWQgc2Nyb2xzbCBhZ2FpblxuICAgICAgJChkb2N1bWVudCkudW5iaW5kKFwic2Nyb2xsXCIpO1xuICAgIH1cbiAgfSk7XG4gIC8vIG1peGl0dXAgcGx1Z2luXG4gIHZhciBtaXhlciA9IG1peGl0dXAoXCIubWl4aXR1cC1jb250YWluZXJcIiwge1xuICAgIHNlbGVjdG9yczoge1xuICAgICAgY29udHJvbDogXCJbZGF0YS1taXhpdHVwLWNvbnRyb2xdXCJcbiAgICB9XG4gIH0pO1xuICAvLyBzY3JvbGxUb3AgYnV0dG9uXG4gICQoXCIuc2Nyb2xsLXRvcCAuaWNvblwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKFxuICAgICAge1xuICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgIH0sXG4gICAgICAxMDAwXG4gICAgKTtcbiAgfSk7XG4gIC8vIHdvdyBqc1xuICBuZXcgV09XKCkuaW5pdCgpO1xufSk7XG4iLCIvLyBpbnB1dHNcclxuY29uc3QgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZVwiKTtcclxuY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpO1xyXG5jb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXNzYWdlXCIpO1xyXG4vLyBGb3JtXHJcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybVwiKTtcclxuLy8gVmFsaWRhdGlvbiBjb2xvcnNcclxuY29uc3QgZ3JlZW4gPSBcIiM0Q0FGNTBcIjtcclxuY29uc3QgcmVkID0gXCIjRjQ0MzM2XCI7XHJcbi8vIEhhbmRsZSBmb3JtXHJcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gIC8vIFByZXZlbnQgZGVmYXVsdCBiZWhhdmlvdXJcclxuICBpZiAodmFsaWRhdGVOYW1lKCkgJiYgdmFsaWRhdGVFbWFpbCgpICYmIHZhbGlkYXRlTWVzc2FnZSgpKSB7XHJcbiAgICBmb3JtLnNldEF0dHJpYnV0ZShcclxuICAgICAgXCJhY3Rpb25cIixcclxuICAgICAgXCJodHRwczovL2Zvcm1zcHJlZS5pby9haG1lZGhhc2hlbTQ0NzAwQGdtYWlsLmNvbVwiXHJcbiAgICApO1xyXG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoXCJtZXRob2RcIiwgXCJQT1NUXCIpO1xyXG4gICAgZm9ybS5zdWJtaXQoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn0pO1xyXG5cclxuLy8gVmFsaWRhdG9yc1xyXG5mdW5jdGlvbiB2YWxpZGF0ZU5hbWUoKSB7XHJcbiAgLy8gY2hlY2sgaWYgaXMgZW1wdHlcclxuICBpZiAoY2hlY2tJZkVtcHR5KG5hbWUpKSByZXR1cm47XHJcbiAgLy8gaXMgaWYgaXQgaGFzIG9ubHkgbGV0dGVyc1xyXG4gIGlmICghY2hlY2tJZk9ubHlMZXR0ZXJzKG5hbWUpKSByZXR1cm47XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuZnVuY3Rpb24gdmFsaWRhdGVFbWFpbCgpIHtcclxuICBpZiAoY2hlY2tJZkVtcHR5KGVtYWlsKSkgcmV0dXJuO1xyXG4gIGlmICghY29udGFpbnNDaGFyYWN0ZXJzKGVtYWlsLCA1KSkgcmV0dXJuO1xyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcbmZ1bmN0aW9uIHZhbGlkYXRlTWVzc2FnZSgpIHtcclxuICBpZiAoY2hlY2tJZkVtcHR5KG1lc3NhZ2UpKSByZXR1cm47XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuLy8gVXRpbGl0eSBmdW5jdGlvbnNcclxuZnVuY3Rpb24gY2hlY2tJZkVtcHR5KGZpZWxkKSB7XHJcbiAgaWYgKGlzRW1wdHkoZmllbGQudmFsdWUudHJpbSgpKSkge1xyXG4gICAgLy8gc2V0IGZpZWxkIGludmFsaWRcclxuICAgIHNldEludmFsaWQoZmllbGQsIGAke2ZpZWxkLm5hbWV9IG11c3Qgbm90IGJlIGVtcHR5YCk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gc2V0IGZpZWxkIHZhbGlkXHJcbiAgICBzZXRWYWxpZChmaWVsZCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcclxuICBpZiAodmFsdWUgPT09IFwiXCIpIHJldHVybiB0cnVlO1xyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5mdW5jdGlvbiBzZXRJbnZhbGlkKGZpZWxkLCBtZXNzYWdlKSB7XHJcbiAgZmllbGQubmV4dEVsZW1lbnRTaWJsaW5nLmlubmVySFRNTCA9IG1lc3NhZ2U7XHJcbiAgZmllbGQubmV4dEVsZW1lbnRTaWJsaW5nLnN0eWxlLmNvbG9yID0gcmVkO1xyXG59XHJcbmZ1bmN0aW9uIHNldFZhbGlkKGZpZWxkKSB7XHJcbiAgZmllbGQubmV4dEVsZW1lbnRTaWJsaW5nLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgLy9maWVsZC5uZXh0RWxlbWVudFNpYmxpbmcuc3R5bGUuY29sb3IgPSBncmVlbjtcclxufVxyXG5mdW5jdGlvbiBjaGVja0lmT25seUxldHRlcnMoZmllbGQpIHtcclxuICBpZiAoL15bYS16QS1aIF0rJC8udGVzdChmaWVsZC52YWx1ZSkpIHtcclxuICAgIHNldFZhbGlkKGZpZWxkKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzZXRJbnZhbGlkKGZpZWxkLCBgJHtmaWVsZC5uYW1lfSBtdXN0IGNvbnRhaW4gb25seSBsZXR0ZXJzYCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb250YWluc0NoYXJhY3RlcnMoZmllbGQsIGNvZGUpIHtcclxuICBsZXQgcmVnRXg7XHJcbiAgc3dpdGNoIChjb2RlKSB7XHJcbiAgICBjYXNlIDE6XHJcbiAgICAgIC8vIGxldHRlcnNcclxuICAgICAgcmVnRXggPSAvKD89LipbYS16QS1aXSkvO1xyXG4gICAgICByZXR1cm4gbWF0Y2hXaXRoUmVnRXgocmVnRXgsIGZpZWxkLCBcIk11c3QgY29udGFpbiBhdCBsZWFzdCBvbmUgbGV0dGVyXCIpO1xyXG4gICAgY2FzZSAyOlxyXG4gICAgICAvLyBsZXR0ZXIgYW5kIG51bWJlcnNcclxuICAgICAgcmVnRXggPSAvKD89LipcXGQpKD89LipbYS16QS1aXSkvO1xyXG4gICAgICByZXR1cm4gbWF0Y2hXaXRoUmVnRXgoXHJcbiAgICAgICAgcmVnRXgsXHJcbiAgICAgICAgZmllbGQsXHJcbiAgICAgICAgXCJNdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lIGxldHRlciBhbmQgb25lIG51bWJlclwiXHJcbiAgICAgICk7XHJcbiAgICBjYXNlIDM6XHJcbiAgICAgIC8vIHVwcGVyY2FzZSwgbG93ZXJjYXNlIGFuZCBudW1iZXJcclxuICAgICAgcmVnRXggPSAvKD89LipcXGQpKD89LipbYS16XSkoPz0uKltBLVpdKS87XHJcbiAgICAgIHJldHVybiBtYXRjaFdpdGhSZWdFeChcclxuICAgICAgICByZWdFeCxcclxuICAgICAgICBmaWVsZCxcclxuICAgICAgICBcIk11c3QgY29udGFpbiBhdCBsZWFzdCBvbmUgdXBwZXJjYXNlLCBvbmUgbG93ZXJjYXNlIGxldHRlciBhbmQgb25lIG51bWJlclwiXHJcbiAgICAgICk7XHJcbiAgICBjYXNlIDQ6XHJcbiAgICAgIC8vIHVwcGVyY2FzZSwgbG93ZXJjYXNlLCBudW1iZXIgYW5kIHNwZWNpYWwgY2hhclxyXG4gICAgICByZWdFeCA9IC8oPz0uKlxcZCkoPz0uKlthLXpdKSg/PS4qW0EtWl0pKD89LipcXFcpLztcclxuICAgICAgcmV0dXJuIG1hdGNoV2l0aFJlZ0V4KFxyXG4gICAgICAgIHJlZ0V4LFxyXG4gICAgICAgIGZpZWxkLFxyXG4gICAgICAgIFwiTXVzdCBjb250YWluIGF0IGxlYXN0IG9uZSB1cHBlcmNhc2UsIG9uZSBsb3dlcmNhc2UgbGV0dGVyLCBvbmUgbnVtYmVyIGFuZCBvbmUgc3BlY2lhbCBjaGFyYWN0ZXJcIlxyXG4gICAgICApO1xyXG4gICAgY2FzZSA1OlxyXG4gICAgICAvLyBFbWFpbCBwYXR0ZXJuXHJcbiAgICAgIHJlZ0V4ID0gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcclxuICAgICAgcmV0dXJuIG1hdGNoV2l0aFJlZ0V4KHJlZ0V4LCBmaWVsZCwgXCJNdXN0IGJlIGEgdmFsaWQgZW1haWwgYWRkcmVzc1wiKTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gbWF0Y2hXaXRoUmVnRXgocmVnRXgsIGZpZWxkLCBtZXNzYWdlKSB7XHJcbiAgaWYgKGZpZWxkLnZhbHVlLm1hdGNoKHJlZ0V4KSkge1xyXG4gICAgc2V0VmFsaWQoZmllbGQpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIHNldEludmFsaWQoZmllbGQsIG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=
