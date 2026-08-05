const metaData = {
  brand: "BrainTrade",
  targetBrand: "BrainTrade",
  language: "en",
  creativeSummary:
    "Lead explored Canadian corporate bonds to pursue steadier income and reduce equity volatility. Emphasize investment-grade issuers, coupon payments, maturity, credit risk, duration, and mentor support.",
  isWhiteLabeled: false,
  autoLogin: "false",
  redirectType: false,
  showCountrySelect: false,
  privacyNoticeCheckbox: true,
};

(function ($) {
  "use strict";

  $(window).on("load", function () {
    const {
      brand,
      targetBrand,
      language,
      creativeSummary,
      isWhiteLabeled,
      autoLogin,
      redirectType,
      showCountrySelect,
      privacyNoticeCheckbox,
    } = metaData;

    // const language = document.querySelector("html").getAttribute("lang");

    $.getJSON(
      "/assets/" + targetBrand + "/" + language + "/LP.json",
      function (json) {
        PlexopAPI.setAdvertiser(json["_PAdvertiser"]);
        PlexopAPI.setUnknown(json["_PUnknown"]);
        PlexopAPI.setBdomain(json["_PBDomain"]);
        PlexopAPI.setA(json["_PA"]);
        PlexopAPI.sendVisit();

        if (isWhiteLabeled) {
          json.nxReg_IsPageWhiteLabeled = "true";
        }
        if (redirectType) {
          json.nxReg_redirectType = redirectType;
        }
        if (autoLogin) {
          json.nxReg_AutoPassword = autoLogin;
        }

        if (!privacyNoticeCheckbox) {
          json.nxReg_PrivacyNoticeCheckbox = "false";
        }

        json.nxReg_CreativeSummary = creativeSummary;

        window.nxRegSignUp = new nxReg(json);
        nxRegSignUp.initSignUp();
      },
    );

    $(document).bind("initSignUp_finished", function () {
      var ld = new LegalData(brand, language);

      var inputs = document.getElementsByTagName("input");
      var _clean_val_arr = [];

      if (showCountrySelect) {
        var select_inp = document.getElementById("country");
        select_inp.parentNode.classList.add("active");
        select_inp.addEventListener("change", check_is_fill);
      }

      const countryWrapper = document.getElementById("country-wrapper");

      if (countryWrapper) {
        if (showCountrySelect) {
          countryWrapper.style.display = "block";
        } else {
          countryWrapper.style.display = "none";
        }
      }

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
