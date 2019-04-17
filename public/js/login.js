  function checkInvalid(){
    var forms = document.getElementsByClassName('login-form');
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        //get email and password
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      });
    }, false);
  }
  checkInvalid();
  
  function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and password
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    }

    function SignIn() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and password
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle errors here
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    }

    function initApp() {
      // Listening for auth state changes
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var redirect = function(url, method) {
            var form = document.createElement('form');
            document.body.appendChild(form);
            form.method = method;
            form.action = url;
            form.submit();
            };
            // location = '/temp.html';
            redirect('/profile', 'post');
        } 
        
      });

      document.getElementById('register-button').addEventListener('click', handleSignUp, false);
      document.getElementById('login-button').addEventListener('click', SignIn, false);
     
    }

    window.onload = function() {
      initApp();
    };