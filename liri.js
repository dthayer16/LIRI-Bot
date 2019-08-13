require("dotenv").config();

const axios = require("axios");

const keys = require("./keys.js");

const Spotify = require("node-spotify-api");

const spotify = new Spotify(keys.spotify);

const fs = require("fs");

const userRequest = process.argv[2];

const requestDetails = process.argv.splice(3).join(" ");

liri(userRequest, requestDetails);

function liri(userRequest, requestDetails) {

    switch (userRequest) {
        case "concert":
            concertRequest(requestDetails);
            break;
        case "spotify":
            spotifyRequest(requestDetails);
            break;
        case "movie":
            movieRequest(requestDetails);
            break;
        case "do":
            doIt();
            break;
        default:
            console.log("That is not a valid request.")
    };
}

function concertRequest(requestDetails) {
    axios.get("https://rest.bandsintown.com/artists/" + requestDetails + "/events?app_id=codingbootcamp")

        .then(function (response) {
            const concerts = response.data;
            concerts.forEach(concert => {
                console.log("Venue: " + concert.venue.name +
                    "\nLocation: " + concert.venue.city + ", " + concert.venue.region + " " + concert.venue.country +
                    "\nDate " + concert.datetime +
                    "\n======================" +
                    "\n======================\n");
            });
        })
};

function spotifyRequest(requestDetails) {
    spotify.search({ type: 'track', query: requestDetails, limit: 10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        const track = data.tracks.items

        for (i = 0; i < track.length; i++) {
            console.log("Artist Name: " + track[i].album.artists[0].name +
                "\nSong Name: " + JSON.stringify(track[i].name) +
                "\nPreview Link: " + JSON.stringify(track[i].album.artists[0].external_urls.spotify) +
                "\nAlbum Name: " + JSON.stringify(track[i].album.name) +
                "\n======================" +
                "\n======================\n");
        }
    });
};

function movieRequest(requestDetails) {
    axios.get("http://www.omdbapi.com/?t=" + requestDetails + "&y=&plot=short&apikey=trilogy")

        .then(function (response) {
            const movie = response.data;

            console.log("The movie your searched was: " + movie.Title +
                "\nThis movie came out in: " + movie.Year +
                "\nIMDB rated this movie: " + movie.Ratings[0].Value +
                "\nRotten Tomatoes rated this movie: " + movie.Ratings[1].Value +
                "\nThis movie was produced in: " + movie.Country +
                "\nThe primary language of this movie is: " + movie.Language +
                "\nPlot Summary: " + movie.Plot +
                "\nActors: " + movie.Actors);
        })
};

function doIt(userRequest) {
    fs.readFile("./random.txt","utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        
        const userRequest = data.split(",")[0];

        const requestDetails = data.split(",")[1];

        liri(userRequest, requestDetails);

    })
};
