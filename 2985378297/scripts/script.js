(function ($) {
    "use strict";

    $(window).on("load", function () {
        const language = document.querySelector('html').getAttribute('lang');

        $.getJSON("/assets/BrainTrade/" + language + "/LP.json", function (json) {
            PlexopAPI.setAdvertiser(json["_PAdvertiser"]);
            PlexopAPI.setUnknown(json["_PUnknown"]);
            PlexopAPI.setBdomain(json["_PBDomain"]);
            PlexopAPI.setA(json["_PA"]);
            PlexopAPI.sendVisit();

            // json.nxReg_IsPageWhiteLabeled = "true";
            json.nxReg_redirectType = "thank_you_page";
            json.nxReg_CreativeSummary = "The lead is interested in learning trading fundamentals through a structured online course - and is looking for a beginner-friendly academy with practical guides, checklists, and a free eBook to get started.";
            window.nxRegSignUp = new nxReg(json);
            nxRegSignUp.initSignUp();

        });

        $(document).bind("initSignUp_finished", function () {
            var ld = new LegalData('BrainTrade', language);

            var inputs = document.getElementsByTagName('input');
            var _clean_val_arr = [];
            // var select_inp = document.getElementById('country');

            // select_inp.parentNode.classList.add('active')

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
            // select_inp.addEventListener('change', check_is_fill);

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

            $(".lp-action").click(function (event) {
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

            // Thank you message with download ebook and progress bar
            $(document).bind("thankYouPageShown", function () {
                let downloadBtn = document.querySelector('.download-btn');
                let progress = document.querySelector('.progress .progress-bar');
                let progressCtr = document.querySelector('.progress');
                if (null !== downloadBtn) {
                    // Download file
                    downloadBtn.addEventListener('click', downloadFile);
                } else {
                    console.log('Download button not found!');
                }

                function downloadFile(e) {
                    e.preventDefault();


                    let thisButton = e.target;
                    progressCtr.classList.remove('d-none');
                    thisButton.setAttribute('disabled', true);
                    thisButton.style.cursor = 'progress';
                    thisButton.innerHTML = 'Loading.......'; //Loading.......
                    let xhr = new XMLHttpRequest();
                    let postData = new FormData();
                    const downloadUrl = './resources/e-book.pdf';
                    xhr.open('GET', downloadUrl, true);
                    xhr.responseType = 'blob';

                    xhr.onload = function (e) {
                        let blob = xhr.response;
                        saveOrOpenBlob(blob);
                        // Return download button to initial
                        thisButton.removeAttribute('disabled');
                        thisButton.innerHTML = 'Download the e-book'; //Download the e-book now
                        thisButton.style.cursor = 'pointer';
                        // Hide progrebar
                        progressCtr.classList.add('d-none');
                        // Return progressbar to initial
                        progress.innerHTML = "0%";
                        progress.setAttribute('aria-valuenow', 0);
                        progress.style.width = "0%";
                    };

                    xhr.onprogress = function (e) {
                        let percent = (e.loaded / e.total) * 100;
                        percent = Math.floor(percent);

                        progress.innerHTML = percent + "%";
                        progress.setAttribute('aria-valuenow', percent);
                        progress.style.width = percent + "%";
                    };

                    xhr.send(postData);
                }

                function saveOrOpenBlob(blob) {
                    let url = window.URL.createObjectURL(blob);
                    let tempEl = document.createElement("a");
                    tempEl.style = "display: none";
                    // File name
                    tempEl.setAttribute('download', 'e-book');
                    tempEl.href = url;
                    document.body.appendChild(tempEl);
                    tempEl.click();
                    // If you want to open file in the current window, can use row below
                    // window.URL.revokeObjectURL(url);
                }
            });
            // Thank you message with download ebook and progress bar END

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