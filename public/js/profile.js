// window.onload = function() {
    document.getElementById('logout-button').addEventListener('click', logOut, false);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          document.getElementById('email').textContent = "Welcome " + user.email + "!";
        } 
    });
//   });

function logOut() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
        
        var redirect = function(url, method) {
            var form = document.createElement('form');
            document.body.appendChild(form);
            form.method = method;
            form.action = url;
            form.submit();
        };
        
        redirect('/logout', 'get');
    }
}


