window.addEventListener('nxreg_custom_request', function (event) {
  // console.log("nxreg_custom_request", event.detail);

  let submitButton = document.querySelector('.nxreg button[type="submit"]');
  submitButtonDisable(submitButton);

  const loader = document.querySelector('.nxreg-loader');
  if (loader) loader.style.display = 'block';

  const userData = event.detail.storage;

  // Build the body using the same structure as trackbox()
  const body = {
    firstname: userData.fullName.split(' ')[0],
    lastname: userData.fullName.split(' ')[1] || '',
    email: userData.email,
    password: userData.password,
    phone: userData.phoneNumber,
    lg: userData.countryCode || "EN",
  };

  fetch('./send.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(data => {

      // console.log('send.php response:', data);

      if (data.status === false) {

        if (loader) loader.style.display = 'none';

        let error = JSON.parse(data.error.data);
        let errorMessage = data?.error_message;
        let lang = document.documentElement.lang || "en";

        console.log('error:', error);
        console.log(window.nxReg_i18n["en"]["nxReg_i18n_SignUp_EmailAlreadyExistsError"])

        switch (error.error_code) {
          case 24:
            errorMessage = window.nxReg_i18n[lang]["nxReg_i18n_SignUp_EmailAlreadyExistsError"];
            errorMessage = errorMessage.replace("<a href=\"%%SignInUrl%%\">", '');
            errorMessage = errorMessage.replace('</a>', '');
            errorMessage = errorMessage.replace("</a>", '');
            break;
          default:
            errorMessage = data?.error_message;
        }

        if (Swal) {
          Swal.fire({
            toast: true,
            position: 'top',
            icon: 'error',
            title: errorMessage,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        }

        /*
        setTimeout(() => {
          alert(errorMessage);
        }, 300);
        */

        submitButtonEnable(submitButton);

        return;
      }

      /*
      if (data.addonData.errorMessage && data.addonData.errorMessage != "") {
        setTimeout(() => {
          alert(data.addonData.errorMessage);
        }, 300);
        return;
      }
        */

      if (data.addonData.data.loginURL) {
        window.location.href = data.addonData.data.loginURL;
      }

      // console.log(data);
      if (loader) loader.style.display = 'none';

    })
    .catch(error => {
      console.error('send.php error:', error);
      submitButtonEnable(submitButton);
    });
});

function submitButtonDisable(submitButton) {
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.classList.add('disabled');
    submitButton.style.backgroundColor = "#ccc";
    submitButton.style.color = "#222";
  }
}

function submitButtonEnable(submitButton) {
  setTimeout(() => {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.classList.remove('disabled');
      submitButton.style.backgroundColor = "";
      submitButton.style.color = "";
    }
  }, 3000);
}