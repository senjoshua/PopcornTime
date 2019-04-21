// window.onload = function() {
    var currentUserID;
    document.getElementById('logout-button').addEventListener('click', logOut, false);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          document.getElementById('email').textContent = "Welcome " + user.email + "!";
          currentUserID = user.uid;
          getShows();
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

document.getElementById('search-button').addEventListener('click', apiCall, false);

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
    // var div = this.parentElement;
    // div.style.display = "none";
    // deletefromDatabase("Game of Thrones");
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


function apiCall(){

  var rand = Math.random()
  var apiKey = '782669d9'
  if(rand > .5){
      apiKey = 'af7a873c'
      console.log('Using Josh\'s key')
  } else {
      console.log('Using My Key')
  }
  var title = '' //the variable that we use to get the textfield contents
  title += document.getElementById('searchbar').value //concatenate the string
  console.log('title: ' + title) //test output
  title = title.replace(' ', '-') //making it api friendly
  console.log('title w/o spaces: ' + title) 
  //var apiCall = 'https://www.omdbapi.com/?t=Jaws&apikey=782669d9' //should be modified a bit
  var apicall = 'https://www.omdbapi.com/?t=' //prefix
  apicall += title 
  apicall += '&apikey='
  apicall += apiKey
  //Josh's key: af7a873c

  console.log(apicall)
  //any spaces should be formatted with dashes
  var request = new XMLHttpRequest()
  request.open('GET', apicall, true)
  request.onload = function () {
      var data = JSON.parse(this.response)
      if(request.status >= 200 && request.status < 400 && data.hasOwnProperty('Title')) {
        var title = data.Title;
        var released = data.Released;
        var genre = data.Genre;
        var plot = data.Plot;
        addShow(title, released, genre, plot);
        addtoDatabase(title, released, genre, plot);
      } else {
          console.log('Error')
      }
  }
request.send()
}  


function getShows(){
  var db = firebase.firestore();
  db.collection("users").doc(currentUserID).collection("showlist").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        var title = doc.data().title
        var released = doc.data().released;
        var genre = doc.data().genre;
        var plot = doc.data().plot;
        addShow(title, released, genre, plot);
    });
});
}

function addShow(title, released, genre, plot){

  console.log("adding shows....");

  var li = document.createElement("li");
  
  var titleElement = document.createElement("b")
  titleElement.textContent = title;

  li.appendChild(titleElement);

  li.appendChild(document.createElement("br"));
  li.appendChild(document.createTextNode("Released: " + released));
  li.appendChild(document.createElement("br"));
  li.appendChild(document.createTextNode("Genre: " + genre));
  li.appendChild(document.createElement("br"));
  li.appendChild(document.createTextNode("Plot: " + plot));

  document.getElementById("myUL").appendChild(li);

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

function addtoDatabase(title, released, genre, plot){
  var db = firebase.firestore();

  db.collection("users").doc(currentUserID).collection('showlist')
  .doc(title).set({
  title: title,
  released: released,
  genre: genre,
  plot: plot
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
}

function deletefromDatabase(title){

  var db = firebase.firestore();
  alert(title);
  db.collection("users").doc(currentUserID).collection('showlist')
  .doc(title).delete()
  .then(function() {
    console.log("Document successfully deleted!");
  })
  .catch(function(error) {
    console.error("Error removing document: ", error);
  });
}

