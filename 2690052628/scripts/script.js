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
      //   var ld = new LegalData("Spearhead", language);

      var inputs = document.getElementsByTagName("input");
      var _clean_val_arr = [];
      // var select_inp = document.getElementById("country");

      // select_inp.parentNode.classList.add("active");

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
      // select_inp.addEventListener("change", check_is_fill);

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

    const investmentInput = document.getElementById("investment");
    const amountText = document.getElementById("amount");
    const yearSelect = document.getElementById("year");
    const resultText = document.getElementById("result");

    // Mock multipliers (replace with real data later)
    const multipliers = {
      2015: 10,
      2018: 70,
      2020: 5,
      2022: 3
    };

    function animateValue(element, start, end, duration = 800) {
      let startTimestamp = null;

      function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = `$${value.toLocaleString()}`;

        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }

    function updateResult() {
      const investment = Number(investmentInput.value);
      const year = yearSelect.value;
      const multiplier = multipliers[year];
      const result = investment * multiplier;

      animateValue(resultText, 0, result);
    }

    // Live updates
    investmentInput.addEventListener("input", () => {
      amountText.textContent = investmentInput.value;
      updateResult();
    });

    yearSelect.addEventListener("change", updateResult);

    // Initial calculation
    updateResult();

    const range = document.getElementById("investment");
    const updateRange = () => {
      const value = (range.value - range.min) / (range.max - range.min) * 100;
      range.style.setProperty("--range-progress", `${value}%`);
    };
    range.addEventListener("input", updateRange);
    updateRange();


    // TIMER
    // Helper to pad minutes and seconds
    function pad(num) {
      return num < 10 ? '0' + num : num;
    }

    // Countdown function
    function Countdown(days, hours, minutes, seconds) {
      let totalSeconds = days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;

      function updateTimer() {
        if (totalSeconds <= 0) {
          document.getElementById('days').innerText = 0;
          document.getElementById('hours').innerText = 0;
          document.getElementById('minutes').innerText = '00';
          document.getElementById('seconds').innerText = '00';
          clearInterval(timer);
          return;
        }

        let d = Math.floor(totalSeconds / (24 * 60 * 60));
        let h = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
        let m = Math.floor((totalSeconds % 3600) / 60);
        let s = totalSeconds % 60;

        document.getElementById('days').innerText = d;
        document.getElementById('hours').innerText = h; // no leading zero
        document.getElementById('minutes').innerText = pad(m);
        document.getElementById('seconds').innerText = pad(s);

        totalSeconds--;
      }

      updateTimer();
      let timer = setInterval(updateTimer, 1000);

      return {
        stop: () => clearInterval(timer)
      };
    }

    // Start countdown from 350 days, 1 hour, 59 minutes, 59 seconds
    let countdown = new Countdown(350, 1, 59, 59);


  });
})(jQuery);
