const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const questions = [

];

// function writeToFile(fileName, data) {

// };

function init() {
  // make inquirer function and axios function to have in here
  inquirer
    .prompt([
      { type:"input",
        message: "Enter your GitHub username",
        name: "username"
      },
      { type:"list",
        message: "chose a color",
        name: "color",
        choices:["green", "blue", "pink", "red"]
      }
    ])
    .then(function (userResponses) {
      console.log(userResponses); // {username: 'atoci', color: 'blue'}
      let { username, color } = userResponses;

      const queryUrl = `https://api.github.com/users/${username}`;

      //  axios get call
      axios
        .get(queryUrl)
        // wait for response
        .then(function (res) {

          //  logs data from call
          // runs a for each for each object/repo 

          // link these to the other factors and not to repos
          // res.data.forEach(repo => {
           
          questions.push(res.data.name, res.data.location, res.data.bio); //pushes specific name to names array that i made in global variables


            // need response link to - res.data.location - res.data.html_url - res.data.blog /  res.data.avatar_url  res.data.name res.data.public_repos res.data.followers res.data.following 
          // });
          data = questions.join("\n"); //turn the array names into a string named nameJSON
          // writes files to new JSONfile named nameJSON and console logs if you did it right
          console.log(data);

          fs.writeFile("names.txt", data, err => {
            if (err) {
              throw err;
            }
            // check to see if there were errors on writing
            console.log("Successfully wrote to names.txt file");
          });

        });
    });

};

init();

// call generate html after axios call has gotten a response
// TODO: create body in html
//  pass data from axios call and color from inquirer to generateHTML call
