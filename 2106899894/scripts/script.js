(function ($) {
  "use strict";

  $(window).on("load", function () {
    const language = document.querySelector("html").getAttribute("lang");

    $.getJSON("https://breg.thebraintrade.com/assets/BrainTrade/" + language + "/LP.json", function (json) {
      PlexopAPI.setAdvertiser(json["_PAdvertiser"]);
      PlexopAPI.setUnknown(30350);
      PlexopAPI.setBdomain(json["_PBDomain"]);
      PlexopAPI.setA(json["_PA"]);
      PlexopAPI.sendVisit();

      // json.nxReg_IsPageWhiteLabeled = "true";
      json.nxReg_FunnelId = '30350';
      json._PUnknown = '30350';

      // json.nxReg_Platform = "EDUTRADING"; // Set field in Payload - (Platform=EDUTRADING)
      window.nxRegSignUp = new nxReg(json);
      nxRegSignUp.initSignUp();
    });

    $(document).bind("initSignUp_finished", function () {
      var ld = new LegalData("BrainTrade", language);

      var inputs = document.getElementsByTagName("input");
      var _clean_val_arr = [];
      var select_inp = document.getElementById("phone-number");

      select_inp.parentNode.classList.add("active");

      for (var j = 0; j < inputs.length; j++) {
        _clean_val_arr.push(inputs[j].name);
      }

      for (var i = 0; i < inputs.length; i++) {
        if (_clean_val_arr.indexOf(inputs[i]) > -1) {
          document
            .querySelector(inputs[i])
            .parentNode.classList.add("selected");
        }

        inputs[i].addEventListener("focusin", input_focused);
        inputs[i].addEventListener("focusout", input_focused_out);
        inputs[i].addEventListener("input", check_is_fill);
      }

      var autofilled = document.querySelectorAll("input:-webkit-autofill");
      select_inp.addEventListener("change", check_is_fill);

      for (var i = 0; i < autofilled.length; i++) {
        autofilled[i].parentNode.classList.add("selected");
      }

      function input_focused() {
        if (this.className.indexOf("nxreg-sign-up-phone-number") > -1) {
          this.parentNode.parentNode.parentNode.classList.add("selected");
        } else {
          this.parentNode.classList.add("selected");
        }
      }

      function input_focused_out() {
        if (this.value.length === 0) {
          if (this.className.indexOf("nxreg-sign-up-phone-number") > -1) {
            this.parentNode.parentNode.parentNode.classList.remove("active");
            this.parentNode.parentNode.parentNode.classList.remove("selected");
          } else {
            this.parentNode.classList.remove("active");
            this.parentNode.classList.remove("selected");
          }
        }
      }

      function check_is_fill() {
        if (this.value.length > 0) {
          if (this.className.indexOf("nxreg-sign-up-phone-number") > -1) {
            this.parentNode.parentNode.parentNode.classList.add("active");
          } else {
            this.parentNode.classList.add("active");
          }
        }
      }

      // $(".lp-action").click(function (event) {
      //     event.preventDefault();
      //     event.stopPropagation();
      //     document.getElementById("desktopForm").scrollIntoView({
      //         behavior: "smooth"
      //     });
      //     document.querySelector('#desktopForm').classList.add('focusForm');
      //     document.querySelector('#desktopForm').addEventListener('animationend', function () {
      //         this.classList.remove('focusForm');
      //     });
      // });

      //  Pop-up FORM SCRIPT
      const popUpForm = document.querySelector("#popUpForm");
      const popUpGroups = document.querySelectorAll(".popup-group");

      $(".lp-action").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        openPopUpForm();
        document.querySelector(".overlay-1").style.display = "block";
        document.querySelector("body").style.overflow = "hidden";

        makeSlimPopUpForm(popUpGroups, "remove");
        popUpForm.classList.add("form-container-popUp");
        popUpForm.classList.add("focusForm");
        popUpForm.addEventListener("animationend", function () {
          this.classList.remove("focusForm");
        });
      });

      $(".close-popUpForm").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        closePopUpForm();
        document.querySelector("body").style.overflow = "auto";
        document.querySelector(".overlay-1").style.display = "none";

        makeSlimPopUpForm(popUpGroups, "add");
        popUpForm.classList.remove("form-container-popUp");
      });

      function openPopUpForm() {
        $(".nxreg").detach().appendTo("#popUpForm");
      }

      function closePopUpForm() {
        $(".nxreg").detach().appendTo("#desktopForm");
      }

      function makeSlimPopUpForm(elements, action = "remove") {
        elements.forEach((el) => {
          switch (action) {
            case "remove":
              el.classList.remove(
                "col-md-4",
                "col-md-6",
                "col-md-12",
                "order-md-1",
                "order-md-2",
                "order-md-3",
                "order-md-4",
                "order-md-5",
                "order-md-6",
                "order-md-7",
                "order-md-8",
                "order-md-9"
              );
              break;
            case "add":
            default:
              let order = el.getAttribute("data-order");
              let classvalue = el.getAttribute("data-col");
              el.classList.add("col-md-" + classvalue, "order-md-" + order);
              break;
          }
        });
      }
      //  END OF Pop-up FORM SCRIPT

      // Prevent to overlaps placeholders in campaign
      if (window.location.search) {
        Array.from(inputs).forEach((input) => {
          if (input.className.indexOf("nxreg-sign-up-phone-number") > -1) {
            input.parentNode.parentNode.parentNode.classList.add("selected");
          } else {
            input.parentNode.classList.add("selected");
          }
        });
      }
    });

    $(document).bind("passwordScreenShown", function () {
      document.querySelector(".thank-you").classList.add("d-block");

      const respondCard = document.querySelector(".respond-card");
      const email = respondCard.querySelectorAll("ul.list-unstyled>li")[0]
        .textContent;
      const password = respondCard.querySelectorAll("ul.list-unstyled>li")[1]
        .textContent;
      const btnLink = respondCard.querySelector("a").href;

      document.querySelector(".th-pass").textContent = password;
      document.querySelector(".th-email").textContent = email;
      document.querySelector(".th-btn").href = btnLink;
    });

    // ========= TIMER COUNT DOWN ===============
    // var dateDisplay = document.getElementById('date');
    // var timeLeftDisplay = document.getElementById('timeLeft');

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    var today = dd + "/" + mm + "/" + yyyy;
    document.getElementById("date").innerHTML = today; // END OF DATE DISPLAY
    // TIMER

    function Countdown(elem, seconds) {
      var that = {};
      that.elem = elem;
      that.seconds = seconds;
      that.totalTime = seconds * 100;
      that.usedTime = 0;
      that.startTime = +new Date();
      that.timer = null;

      that.count = function () {
        that.usedTime = Math.floor((+new Date() - that.startTime) / 10);
        var tt = that.totalTime - that.usedTime;

        if (tt <= 0) {
          that.elem.innerHTML = "00:00:00";
          clearInterval(that.timer);
        } else {
          var hh = Math.floor(tt / (60 * 60 * 100)); // Изчисляване на часовете
          var mi = Math.floor((tt - hh * 60 * 60 * 100) / (60 * 100)); // Оставащи минути
          var ss = Math.floor((tt - hh * 60 * 60 * 100 - mi * 60 * 100) / 100); // Оставащи секунди

          // Промяна на реда: Часове → Минути → Секунди
          that.elem.innerHTML =
            that.fillZero(hh) +
            ":" +
            that.fillZero(mi) +
            ":" +
            that.fillZero(ss);
        }
      };

      that.init = function () {
        if (that.timer) {
          clearInterval(that.timer);
          that.elem.innerHTML = "00:00.00";
          that.totalTime = seconds * 100;
          that.usedTime = 0;
          that.startTime = +new Date();
          that.timer = null;
        }
      };

      that.start = function () {
        if (!that.timer) {
          that.timer = setInterval(that.count, 10);
        }
      };

      that.stop = function () {
        console.log("usedTime = " + countdown.usedTime);
        if (that.timer) clearInterval(that.timer);
      };

      that.fillZero = function (num) {
        return num < 10 ? "0" + num : num;
      };

      return that;
    }

    var span = document.getElementById("time");
    var countdown = new Countdown(span, 1200);
    setInterval(countdown.start(), countdown); //   END OF TIMER
  });
})(jQuery);
