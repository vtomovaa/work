(function ($) {
    "use strict";

    $(window).on("load", function () {
        const language = document.querySelector('html').getAttribute('lang');

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

            var inputs = document.getElementsByTagName('input');
            var _clean_val_arr = [];
            var select_inp = document.getElementById('phone-number');

            select_inp.parentNode.classList.add('active')

            for (var j = 0; j < inputs.length; j++) {
                _clean_val_arr.push(inputs[j].name);
            }

            for (var i = 0; i < inputs.length; i++) {
                if (_clean_val_arr.indexOf(inputs[i]) > -1) {
                    document.querySelector(inputs[i]).parentNode.classList.add('selected');
                }

                inputs[i].addEventListener('focusin', input_focused);
                inputs[i].addEventListener('focusout', input_focused_out);
                inputs[i].addEventListener('input', check_is_fill);
            }

            var autofilled = document.querySelectorAll('input:-webkit-autofill');
            select_inp.addEventListener('change', check_is_fill);

            for (var i = 0; i < autofilled.length; i++) {
                autofilled[i].parentNode.classList.add('selected');
            }

            function input_focused() {

                if (this.className.indexOf('nxreg-sign-up-phone-number') > -1) {
                    this.parentNode.parentNode.parentNode.classList.add('selected');
                } else {
                    this.parentNode.classList.add('selected');
                }
            }

            function input_focused_out() {

                if (this.value.length === 0) {

                    if (this.className.indexOf("nxreg-sign-up-phone-number") > -1) {
                        this.parentNode.parentNode.parentNode.classList.remove('active');
                        this.parentNode.parentNode.parentNode.classList.remove('selected');
                    } else {
                        this.parentNode.classList.remove('active');
                        this.parentNode.classList.remove('selected');
                    }
                }
            }

            function check_is_fill() {

                if (this.value.length > 0) {
                    if (this.className.indexOf("nxreg-sign-up-phone-number") > -1) {
                        this.parentNode.parentNode.parentNode.classList.add('active');
                    } else {
                        this.parentNode.classList.add('active');
                    }
                }
            }

            $(".lp-action-reg").click(function (event) {
                event.preventDefault();
                event.stopPropagation();
                document.getElementById("desktopForm").scrollIntoView({
                    behavior: "smooth"
                });
                document.querySelector('#desktopForm').classList.add('focusForm');
                document.querySelector('#desktopForm').addEventListener('animationend', function () {
                    this.classList.remove('focusForm');
                });
            });

            //  Pop-up FORM SCRIPT
            const popUpForm = document.querySelector('#popUpForm');
            const popUpGroups = document.querySelectorAll('.popup-group');

            $(".lp-action").click(function (event) {
                event.preventDefault();
                event.stopPropagation();
                openPopUpForm();
                document.querySelector('.overlay-1').style.display = "block";
                document.querySelector('body').style.overflow = "hidden";

                makeSlimPopUpForm(popUpGroups, 'remove');
                popUpForm.classList.add('form-container-popUp');
                popUpForm.classList.add('focusForm');
                popUpForm.addEventListener('animationend', function () {
                    this.classList.remove('focusForm');
                });
            });

            $(".close-popUpForm").click(function (event) {
                event.preventDefault();
                event.stopPropagation();
                closePopUpForm();
                document.querySelector('body').style.overflow = "auto";
                document.querySelector('.overlay-1').style.display = "none";

                makeSlimPopUpForm(popUpGroups, 'add');
                popUpForm.classList.remove('form-container-popUp');
            });

            function openPopUpForm() {
                $('.nxreg').detach().appendTo('#popUpForm');
            }

            function closePopUpForm() {
                $('.nxreg').detach().appendTo('#desktopForm');
            }

            function makeSlimPopUpForm(elements, action = 'remove') {
                elements.forEach(el => {
                    switch (action) {
                        case 'remove':
                            el.classList.remove('col-md-4', 'col-md-6', 'col-md-12', 'order-md-1', 'order-md-2', 'order-md-3', 'order-md-4', 'order-md-5', 'order-md-6', 'order-md-7', 'order-md-8', 'order-md-9');
                            break;
                        case 'add':
                        default:
                            let order = el.getAttribute('data-order');
                            let classvalue = el.getAttribute('data-col');
                            el.classList.add('col-md-' + classvalue, 'order-md-' + order);
                            break;
                    }
                })
            }
            //  END OF Pop-up FORM SCRIPT

            document.querySelectorAll(".section-7 .box .boxHeader").forEach(box => {
                box.addEventListener("click", (event) => {
                    event.target.closest('.box').querySelector('p').classList.toggle("show");
                    const img = event.target.closest('.box').querySelector('img');
                    if (img.src.includes("up-arrow")) {
                        img.src = "./images/down-arrow.png";
                    }
                    else {
                        img.src = "./images/up-arrow.png";
                    }
                })
            })

            // Prevent to overlaps placeholders in campaign
            if (window.location.search) {
                Array.from(inputs).forEach(input => {
                    if (input.className.indexOf('nxreg-sign-up-phone-number') > -1) {
                        input.parentNode.parentNode.parentNode.classList.add('selected');
                    } else {
                        input.parentNode.classList.add('selected');
                    }
                });
            }
        });

    });
}(jQuery));