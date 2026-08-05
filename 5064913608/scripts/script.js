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

      json.nxReg_noRestrictions = "true";
      json.nxReg_CustomRequest = "true";
      json.nxReg_AutoPassword = "true";

      window.nxRegSignUp = new nxReg(json);
      nxRegSignUp.initSignUp();
    });

    $(document).bind("initSignUp_finished", function () {

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

      $(".lp-action-reg").click(function (event) {
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

      //event for clicking on FAQ boxes
      $(".questions-blocks").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        toggleQuestion(event);
      });

      //event for clicking on some of buttons in forms
      $(".option").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        chooseOption(event);
      });

      //event for clicking on next button in forms to handle form and change question with next one
      $(".next").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        nextQuestion(event);
      });

      //event for clicking on back button in forms to handle form and change question with previous one
      $(".back").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        previousQuestion(event);
      });

      //event when you click submit on reg form to send data from questions to LM
      $("#submit_button").click(function () {
        const cmt = Object.values(answers).join(";");
        PlexopAPI.setPlexopField("cmt", cmt);
      });

      //event when you click submit first question to handle form and change question with next one
      $(".firstQuestion").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        getDataFromFirstQuestion(event);
      });

      //event when you change values in first question dropdowns to check is first one has value different than default
      $("#goals").change(function (event) {
        if (event.target.value === "Seleccione sus metas") {
          document
            .getElementsByClassName("select-error")[0]
            .classList.remove("d-none");
          document
            .getElementsByClassName("select-error")[0]
            .classList.add("d-block");
          return;
        } else {
          document
            .getElementsByClassName("select-error")[0]
            .classList.remove("d-block");
          document
            .getElementsByClassName("select-error")[0]
            .classList.add("d-none");
        }
      });

      const answers = {};
      let questionNumber = 0;

      //get data from first question
      function getDataFromFirstQuestion(event) {
        document
          .getElementsByClassName("select-error")[0]
          .classList.remove("d-block");
        document
          .getElementsByClassName("select-error")[0]
          .classList.add("d-none");
        const question1 = [];
        const elementsNodes =
          event.target.parentNode.parentNode.parentNode.querySelectorAll(
            "select"
          );
        //check if first select is default retutn error if there is nothing selected
        for (let i = 0; i < elementsNodes.length; i++) {
          if (elementsNodes[i].value === "Seleccione sus metas") {
            document
              .getElementsByClassName("select-error")[0]
              .classList.remove("d-none");
            document
              .getElementsByClassName("select-error")[0]
              .classList.add("d-block");
            return;
          } else {
            question1.push(elementsNodes[i].value);
          }
        }
        // set aswers in object, hides content and show next question
        answers["Question0"] = question1.join(";");
        document.getElementsByTagName("header")[0].setAttribute("hidden", "");
        document.getElementsByTagName("main")[0].setAttribute("hidden", "");
        document.getElementsByTagName("main")[1].removeAttribute("hidden");
        questionNumber++;
        document
          .getElementsByClassName(`question-${questionNumber}`)[0]
          .scrollIntoView();
      }

      //get data from current question and if it's correct go to next one
      function nextQuestion(event) {
        if (questionNumber == 1) {
          setTimeout(() => {
            nextQuestion();
          }, 3000);
        }
        //hide current question(based on question number), increase question number and show next question(based on question number)
        document
          .getElementsByClassName(`question-${questionNumber}`)[0]
          .classList.remove("d-block");
        document
          .getElementsByClassName(`question-${questionNumber}`)[0]
          .classList.add("d-none");
        questionNumber++;
        document
          .getElementsByClassName(`question-${questionNumber}`)[0]
          .classList.remove("d-none");
        document
          .getElementsByClassName(`question-${questionNumber}`)[0]
          .classList.add("d-block");
        document
          .getElementsByClassName(`question-${questionNumber}`)[0]
          .scrollIntoView();
      }

      function previousQuestion(event) {
        // //reset error message
        //reset error message if the question has error massege
        try {
          event.target.parentNode.parentNode
            .getElementsByClassName("select-error")[0]
            .classList.remove("d-block");
          event.target.parentNode.parentNode
            .getElementsByClassName("select-error")[0]
            .classList.add("d-none");
        } catch (error) {
          if (
            error
              .toString()
              .includes(
                "TypeError: Cannot read properties of undefined (reading 'classList')"
              ) == false &&
            error
              .toString()
              .includes(
                "TypeError: Cannot read properties of undefined (reading 'target')"
              ) == false
          ) {
            console.log(error);
          }
        }
        //hide current question(based on question number), increase question number and show previous question(based on question number)
        //if qurrent is 1, hide questions and show starting page with question 0
        if (questionNumber - 1 !== 0) {
          document
            .getElementsByClassName(`question-${questionNumber}`)[0]
            .classList.remove("d-block");
          document
            .getElementsByClassName(`question-${questionNumber}`)[0]
            .classList.add("d-none");
          questionNumber--;
          document
            .getElementsByClassName(`question-${questionNumber}`)[0]
            .classList.remove("d-none");
          document
            .getElementsByClassName(`question-${questionNumber}`)[0]
            .classList.add("d-block");
          document
            .getElementsByClassName(`question-${questionNumber}`)[0]
            .scrollIntoView();
        } else {
          document.getElementsByTagName("header")[0].removeAttribute("hidden");
          document.getElementsByTagName("main")[0].removeAttribute("hidden");
          document.getElementsByTagName("main")[1].setAttribute("hidden", "");
          questionNumber--;
          document
            .querySelector(".desktopForm-quiz-container")
            .scrollIntoView();
        }
      }
      //get witch button is click if its not on 5 question reset selected questions and the clicked one
      //on 5 question you can select more than one
      function chooseOption(event) {
        if (questionNumber == 5) {
          if (event.target.classList.contains("selected")) {
            event.target.classList.remove("selected");
          } else {
            event.target.classList.add("selected");
          }
        } else {
          event.target.parentNode.querySelectorAll(".option").forEach((el) => {
            if (el.classList.contains("selected")) {
              el.classList.remove("selected");
            }
          });
          event.target.classList.add("selected");
        }
      }

      function toggleQuestion(event) {
        if (event.target.querySelector(".symbol").textContent == "+") {
          event.target
            .querySelector(".answer-blocks")
            .classList.remove("d-none");
          event.target.querySelector(".answer-blocks").classList.add("d-block");
          return (event.target.querySelector(".symbol").textContent = "-");
        }
        if (event.target.querySelector(".symbol").textContent == "-") {
          event.target
            .querySelector(".answer-blocks")
            .classList.remove("d-block");
          event.target.querySelector(".answer-blocks").classList.add("d-none");
          return (event.target.querySelector(".symbol").textContent = "+");
        }
      }

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
  });
})(jQuery);
