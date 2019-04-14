var apiCall = 'http://www.omdbapi.com/?t=Jaws&apikey=782669d9' //should be modified a bit
var request = new XMLHttpRequest()
console.log('Test 1')
request.open('GET', 'http://www.omdbapi.com/?t=Jaws&apikey=782669d9', true)
request.onload = function () {
    var data = JSON.parse(this.response)
    if(request.status >= 200 && request.status < 400) {
        console.log(data.Title)
        console.log(this.response)
    } else {
        console.log('Error')
    }
}

request.send()