const URL = 'http://localhost:3000/';

var user;

var token;
$(document).ready(function () {
  // Cibles du DOM
  const $loginForm = $('#loginForm');
  const $pwdInput = $('#pwd');
  const $loginInput = $('#login');
  const $loginDiv = $('#loginDiv');
  const $h1 = $('h1');

  // Gestion du login
  $loginForm.submit(function (even) {
    even.preventDefault();

    const credentials = {
      login: $loginInput.val(),
      pwd: $pwdInput.val(),
    };

    $.post(URL + 'login', credentials)
      .done(function (response) {
        console.log(response);
        user = response.user;
        token = response.token;
        $loginDiv.hide();
        $h1.text('Bienvenue ' + user.username);
      })
      .fail(function (err) {
        console.log(err);
      });
  });
});
