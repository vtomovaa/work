(function ($) {
    "use strict";

    $(window).on("load", function () {

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
            var select_inp = document.getElementById('country');

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

        //get current date
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();


        const tableNames = ["M******", "D******", "G******", "A******", "L******", "M******", "P******", "J******", "O******", "I******", "F******", "J******", "J******", "J******", "L******", "L******", "L******", "A******", "H******", "J******", "N******", "L******", "E******", "L******", "L******", "H******", "G******", "E******", "L******", "C******", "J******", "E******", "T******", "W******", "H******", "O******", "A******", "I******", "I******", "D******", "S******", "M******", "L******", "L******", "L******", "J******", "S******", "F******", "S******", "O******", "J******", "C******", "H******", "O******", "T******", "J******", "C******", "H******", "S******", "E******", "L******"];
        const invest_times = [15, 30, 45, 60, 120, 300];
        function genereateRow() {
            const row = document.createElement('tr');
            //geenerate name
            const nameTd = document.createElement('td')
            const nameP = document.createElement('p');
            nameP.textContent = tableNames[Math.floor(Math.random() * tableNames.length)];
            nameTd.appendChild(nameP);
            row.appendChild(nameTd);
            //geenerate time
            let invest_time = invest_times[Math.floor(Math.random() * invest_times.length)];
            let invest_start_time = new Date((new Date()).getTime() - 300000);
            invest_start_time = new Date((invest_start_time.getTime() + invest_time * 1000));
            const timeTd = document.createElement('td');
            const timeP = document.createElement('p');
            timeP.textContent = `${('0' + invest_start_time.getHours()).slice(-2)}:${('0' + invest_start_time.getMinutes()).slice(-2)}:${('0' + invest_start_time.getSeconds()).slice(-2)} ${('0' + day).slice(-2)}/${('0' + month).slice(-2)}/${year}`;
            timeTd.appendChild(timeP);
            row.appendChild(timeTd);
            //generate img
            const imgTd = document.createElement('td');
            const img = document.createElement('img');
            img.src = './images/Icon.png';
            imgTd.appendChild(img);
            row.appendChild(imgTd);
            //append row
            const table = document.querySelector('table tbody');
            if (table.firstChild) {
                table.insertBefore(row, table.children[1]);
            }
            else {
                table.appendChild(row);
            }
        }
        //init first rows
        for (let i = 0; i < 10; i++) {
            genereateRow();
        }

        setInterval(() => {
            genereateRow();
            const table = document.querySelector('table tbody');
            table.removeChild(table.lastChild);
        }, 5000);

        document.querySelectorAll(".section-7 .box .boxHeader").forEach(box => {
            box.addEventListener("click", (event) => {
                event.target.closest('.box').querySelector('p').classList.toggle("show");
                const img = event.target.closest('.box').querySelector('img');
                if (img.src.includes("plus")) {
                    img.src = "./images/minus.png";
                }
                else {
                    img.src = "./images/plus.png";
                }
            })
        })
    });
}(jQuery));