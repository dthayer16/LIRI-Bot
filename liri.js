require("dotenv").config();

const keys = require("./keys.js");

const userRequest = process.argv[2];

const requestDetails = process.argv.splice(3).join(" ");

switch(userRequest) {
    case "concert":
        //execute function
        break;
    case "spotify":
        //execute function
        break;
    case "movie":
        //execute function
        break;
    case "do":
        //execute function
        break;
    default:
        console.log("That is not a valid request.")
};

function concertRequest (userRequest) {

};

function spotifyRequest (userRequest) {

};

function movieRequest (userRequest) {

};

function doIt (userRequest) {

};
