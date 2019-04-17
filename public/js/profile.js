// indow.onload = function() {
    document.getElementById('logout-button').addEventListener('click', logOut, false);
//   };

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
