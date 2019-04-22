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
  document.getElementById('searchbar').value = ""
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
        var check = doc.data().check;
        if(doc.id != "testshow"){
          addShow(title, released, genre, plot, check);
        }
    });
});
}

function addShow(title, released, genre, plot, check){

  console.log("adding " + title);

  var li = document.createElement("li");

  //check for checked
  if(check==true){
    li.classList.toggle('checked');
  }
  
  var titleElement = document.createElement("b")
  titleElement.textContent = title;

  li.appendChild(titleElement);

  li.appendChild(document.createElement("br"));
  li.appendChild(document.createTextNode("Released: " + released));
  li.appendChild(document.createElement("br"));
  li.appendChild(document.createTextNode("Genre: " + genre));
  li.appendChild(document.createElement("br"));
  li.appendChild(document.createTextNode("Plot: " + plot));

  li.onclick = function(ev){
    ev.target.classList.toggle('checked');
    var check = ev.target.classList.contains("checked");
    updateDatabase(title, check);

  }

  document.getElementById("myUL").appendChild(li);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  span.onclick = function(){
      deletefromDatabase(title);
      var div = this.parentElement;
      div.style.display = "none";
  }
  
}

function addtoDatabase(title, released, genre, plot){
  var db = firebase.firestore();

  db.collection("users").doc(currentUserID).collection('showlist')
  .doc(title).set({
  title: title,
  released: released,
  genre: genre,
  plot: plot,
  check: false
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

  db.collection("users").doc(currentUserID).collection('showlist')
  .doc(title).delete()
  .then(function() {
    console.log(title + " successfully deleted!");
  })
  .catch(function(error) {
    console.error("Error removing document: ", error);
  });
}

function updateDatabase(title, check){
  var db = firebase.firestore();
  db.collection("users").doc(currentUserID).collection('showlist')
  .doc(title).update({
    check: check
    })
  .then(function() {
    console.log(title + " successfully updated!");
  })
  .catch(function(error) {
    console.error("Error updating document: ", error);
  });

}
