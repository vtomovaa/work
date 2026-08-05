(function ($) {
    "use strict";
    $(window).on("load", function () {
        const language = document.querySelector('html').getAttribute('lang');

        $.getJSON("/assets/TradeApp_Prop/" + language + "/LP.json", function (json) {
            PlexopAPI.setAdvertiser(json["_PAdvertiser"]);
            PlexopAPI.setUnknown(json["_PUnknown"]);
            PlexopAPI.setBdomain(json["_PBDomain"]);
            PlexopAPI.setA(json["_PA"]);
            PlexopAPI.sendVisit();
            var ld = new LegalData('TradeApp_Prop', language);
        });

        $(document).bind("initSignUp_finished", function () {

            


            // //event when you click submit on reg form to send data from questions to LM
            // $('#submit_button').click(function () {
            //     const cmt = Object.values(answers).join(';');
            //     PlexopAPI.setPlexopField('cmt', cmt);
            // })

            //event when you click submit first question to handle form and change question with next one




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

        document.querySelector(".reg-btn").addEventListener('click', function (event) {

            event.preventDefault();
            event.stopPropagation();

            getDataFromFirstQuestion(event);
        })

        //event when you change values in first question dropdowns to check is first one has value different than default  
        $("#goals").change(function (event) {
            if (event.target.value === 'Select an option') {
                document.getElementsByClassName('select-error')[0].classList.remove('d-none');
                document.getElementsByClassName('select-error')[0].classList.add('d-block');
                return;
            }
            else {
                document.getElementsByClassName('select-error')[0].classList.remove('d-block');
                document.getElementsByClassName('select-error')[0].classList.add('d-none');
            }
        });

        const answers = {}
        let questionNumber = 0;

        //get data from first question
        function getDataFromFirstQuestion(event) {
            document.getElementsByClassName('select-error')[0].classList.remove('d-block');
            document.getElementsByClassName('select-error')[0].classList.add('d-none');
            const question1 = []
            const elementsNodes = event.target.parentNode.parentNode.parentNode.querySelectorAll('select');
            //check if first select is default retutn error if there is nothing selected
            for (let i = 0; i < elementsNodes.length; i++) {
                if (elementsNodes[i].value === 'Select an option') {
                    document.getElementsByClassName('select-error')[0].classList.remove('d-none');
                    document.getElementsByClassName('select-error')[0].classList.add('d-block');
                    return;
                }
                else {
                    question1.push(elementsNodes[i].value)
                }
            }
            window.location = "https://signup.tradeapp.com/"

        }

        //get witch button is click if its not on 5 question reset selected questions and the clicked one
        //on 5 question you can select more than one 
       

        $(document).bind("thankYouPageShown", function () {
            document.querySelector('#formImg').classList.add('d-none');
            const backBtns = document.querySelectorAll('.back');
            backBtns[backBtns.length - 1].classList.add('d-none');
        })
    });
}(jQuery));