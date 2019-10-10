const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const questions = [
  
];

function writeToFile(fileName, data) {
 
};

function init() {
// make inquirer function and axios function to have in here
inquirer
  .prompt(
    {
    message: "Enter your GitHub username",
    name: "username"
  },
  {
    message: "chose a color",
    name: "color"
  }
  )
  .then(function (userResponses) {
    console.log(userResponses); // {username: 'atoci', color: 'blue'}
    let {username, color} = userResponses;

    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
  
   //  axios get call
    axios
      .get(queryUrl)
      // wait for response
      .then(function (res) {
        // console.log(res.data);
        //  logs data from call
        // runs a for each for each object/repo 
        res.data.forEach(repo => {
          names.push(repo.name); //pushes specific name to names array that i made in global variables

        });
                                          // what does this 2 dooo? it formats based off of tabs
        repoNames = JSON.stringify(names, `\n`, 2); //turn the array names into a string named nameJSON
        // writes files to new JSONfile named nameJSON and console logs if you did it right
       console.log(repoNames);
        
       fs.writeFile("names.json", repoNames, err => {
          if (err) {
            throw err;
          }
          // check to see if there were errors on writing
          console.log("Successfully wrote to names.json file");
        });

      });
  });

};

init(); 

// call generate html after axios call has gotten a response
// TODO: create body in html
//  pass data from axios call and color from inquirer to generateHTML call
