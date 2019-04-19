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

document.getElementById('search-button').addEventListener('click', newElement, false);

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
      alert("checked");
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("searchbar").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("searchbar").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}


