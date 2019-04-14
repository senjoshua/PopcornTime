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

// Below here is the full javascript and html with form elements

/*
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Testing JS</title>
    </head>
    <body>
        <script>
            function testFunction(){

                var test = '' //the variable that we use to get the textfield contents
                test = test + document.getElementById('thisisatest').value //concatenate the string
                console.log(test) //test output
                test = test.replace(' ', '-') //making it api friendly
                console.log(test) 
                //var apiCall = 'http://www.omdbapi.com/?t=Jaws&apikey=782669d9' //should be modified a bit
                var apicall = 'http://www.omdbapi.com/?t=' //prefix
                apicall = apicall + test 
                apicall = apicall + '&apikey=782669d9' //finished version
                console.log(apicall)
                //any spaces should be formatted with dashes
                var request = new XMLHttpRequest()
                request.open('GET', apicall, true)
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
            }    
        </script>
        <form>
            Enter The Title:
                <input type="text" name="title" id="thisisatest">
                <!-- <input type="submit" value="Submit" onclick="testFunction()"> -->
        </form>
            <button type="button" onclick="testFunction()">Click Me Hoe</button>
        <!-- <script src="test.js"></script> -->
    </body>
</html>
*/