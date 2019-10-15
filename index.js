const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const { generateHTML } = require("./generateHTML")
const convertFactory = require('electron-html-to');




// function writeToFile(fileName, data) {
//   generateHTML(data);

//   fs.writeFile(fileName, data, err => {
//     if (err) {
//       throw err;
//     }
//     // check to see if there were errors on writing
//     console.log("Successfully wrote to names.txt file");
//   });
// };

function init() {
  // make inquirer function and axios function to have in here
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter your GitHub username",
        name: "username"
      },
      {
        type: "list",
        message: "chose a color",
        name: "color",
        choices: ["green", "blue", "pink", "red"]
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
        .then(function ({ data }) {

         

          axios // Requires a different axios call to get stars
          .get(`https://api.github.com/users/${username}/repos?per_page=100`)
          .then((res) => {
              // console.log(res)
              data.stars = 0;
              for (let i = 0; i < res.data.length; i++) { // Loop through each repository and count the number of stars
                  data.stars += res.data[i].stargazers_count;
              }
          var conversion = convertFactory({
           converterPath: convertFactory.converters.PDF
          });
          let html = generateHTML({ data, userResponses })
          conversion({html}, function (err, result) {
            if (err) {
              return console.error(err);
            }

            console.log(result.numberOfPages);
            console.log(result.logs);
            result.stream.pipe(fs.createWriteStream('github.pdf'));
            conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
          });

          });
        });

    });

};

init();

// call generate html after axios call has gotten a response
// TODO: create body in html
//  pass data from axios call and color from inquirer to generateHTML call
// function sumNumbers(data) {
//   return `<html>${data}</html>`
// }
// console.log(sumNumbers(1, 2));
// let sum = sumNumbers(1, 2);
// console.log(sum);