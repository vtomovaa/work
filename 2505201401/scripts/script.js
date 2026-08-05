(function ($) {
  "use strict";

  $(window).on("load", function () {
    const language = document.querySelector("html").getAttribute("lang");

    $.getJSON("./scripts/LP.json", function (json) {
      PlexopAPI.setAdvertiser(json["_PAdvertiser"]);
      PlexopAPI.setUnknown(json["_PUnknown"]);
      PlexopAPI.setBdomain(json["_PBDomain"]);
      PlexopAPI.setA(json["_PA"]);
      PlexopAPI.sendVisit();

      // json.nxReg_IsPageWhiteLabeled = "true";
      json.nxReg_noRestrictions = "true";
      json.nxReg_CustomRequest = "true";
      json.nxReg_AutoPassword = "true";

      window.nxRegSignUp = new nxReg(json);
      nxRegSignUp.initSignUp();
    });

    $(document).bind("initSignUp_finished", function () {

      var inputs = document.getElementsByTagName("input");
      var _clean_val_arr = [];
      // var select_inp = document.getElementById('country');

      // select_inp.parentNode.classList.add('active')

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
      // select_inp.addEventListener('change', check_is_fill);

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

      $(".lp-action").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        document.getElementById("desktopForm").scrollIntoView({
          behavior: "smooth",
        });
        document.querySelector("#desktopForm").classList.add("focusForm");
        document
          .querySelector("#desktopForm")
          .addEventListener("animationend", function () {
            this.classList.remove("focusForm");
          });
      });

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
  });
})(jQuery);

UIkit.util.on("#slider", "itemshow", function (el) {
  let arr = el.detail[0];
  document.getElementById("slider-nav-text").innerText = `${arr.index + 1} / ${
    arr.length
  }`;
});

UIkit.util.on("#slider-reviews", "itemshow", function (el) {
  let arr = el.detail[0];
  document.getElementById("slider-nav-text-2").innerText = `${
    arr.index + 1
  } / ${arr.length}`;
});
