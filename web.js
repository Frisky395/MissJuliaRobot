//    MissJuliaRobot (A Telegram Bot Project)
//    Copyright (C) 2019-Present Anonymous (https://t.me/MissJulia_Robot)

//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU Affero General Public License as published by
//    the Free Software Foundation, in version 3 of the License.

//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU Affero General Public License for more details.

//    You should have received a copy of the GNU Affero General Public License
//    along with this program.  If not, see < https://www.gnu.org/licenses/agpl-3.0.en.html >


var express = require('express'); //importing express

var http = require('http'); //importing http

var app = express();

var newBaseURL = process.env.WEBSITE_URL || 'http://missjuliarobot.unaux.com';

var redirectStatus = parseInt(302);

var port = process.env.PORT;

app.get('*', function(request, response) {

  response.redirect(redirectStatus, newBaseURL + request.url);

});

app.listen(port, function() {

  console.log("\n" + "Listening on " + newBaseURL + " at port " + port + "\n");

});


// Function to prevent heroku dynos from idling
// This may not be needed if your application has a good traffic

// Fetching environment variables
var HEROKU_APP_NAME = process.env.HEROKU_APP_NAME;
var HEROKU_APP_URL = 'https://' + HEROKU_APP_NAME + '.herokuapp.com';


function startKeepAlive() {

    setInterval(function() {

        var options = {

            host: HEROKU_APP_URL,

            port: port,

            path: '/'

        };

        http.get(options, function(res) {

            res.on('data', function(chunk) {

                try {

                    // optional logging... disable after it's working
                    console.log("HEROKU RESPONSE: " + chunk);

                } catch (err) {

                    console.log(err.message);

                }

            });

        }).on('error', function(err) {

            console.log("Error: " + err.message);

        });

    }, 20 * 60 * 1000); // load every 20 minutes

}

// ends 


startKeepAlive();
