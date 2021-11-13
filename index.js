// TODO: Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs')
// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        message: "What is the title of your project?",
        name: "title"
    },
    {
        type: "input",
        message: "What is the description of your project?",
        name: "description"
    },
    {
        type: "input",
        message: "What are the installation instructions for your project?",
        name: "install"
    },
    {
        type: "input",
        message: "What are the usage instructions for your project?",
        name: "usage"
    },
    {
        type: "checkbox",
        message: "Which license does your project operate under?",
        name: "license",
        choices: ["Apache 2.0", "Creative Commons (CC0)", "MIT", "Open Data Commons (BY)"]
    },
    {
        type: "input",
        message: "How can users make contributions to your project?",
        name: "contribute"
    },
    {
        type: "input",
        message: "How do users run tests for your application?",
        name: "tests"
    },
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "github"
    },
    {
        type: "input",
        message: "What is the your email address?",
        name: "email"
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, markdown(data), (err) => {
        console.log(err)
    })
}

function markdown(filler){
    let badgeLink, licenceLink
    switch(filler.license) {
        case "Apache 2.0":
            badgeLink = "https://img.shields.io/badge/License-Apache_2.0-blue.svg"
            licenceLink = "https://opensource.org/licenses/Apache-2.0"
            break
        case "Creative Commons (CC0)":
            badgeLink = "https://licensebuttons.net/l/zero/1.0/80x15.png"
            licenceLink = "http://creativecommons.org/publicdomain/zero/1.0/"
            break
        case "MIT":
            badgeLink = "https://img.shields.io/badge/License-MIT-yellow.svg"
            licenceLink = "https://opensource.org/licenses/MIT"
            break
        case "Open Data Commons (BY)":
            badgeLink = "https://img.shields.io/badge/License-ODC_BY-brightgreen.svg"
            licenceLink = "https://opendatacommons.org/licenses/by/"
            break
    }

    return `# ${filler.title} ![](${badgeLink})

    ## Description 
    ${filler.description}
    
    ## Table of Contents 
    - [Installation](#installation)
    - [Usage Instructions](#usage-instructions) 
    - [Contributing](#contributing)
    - [Tests](#tests)
    - [Questions](#questions)    
   
    
    ## Installation 
    ${filler.install}
    

    ## Usage Instructions
    ${filler.usage}
    
    ## Licence 
    This project is covered under the ${filler.license}. More information about this license can be found at ${licenceLink}
    
    ## Contributing 
    ${filler.contribute}
    
    ## Tests
    ${filler.tests}
    
    ## Questions
    - [${filler.github}](https://github.com/${filler.github})
    - ${filler.email}`
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions).then((answers) => {
        writeToFile("README.md", answers) 
    })
}

// Function call to initialize app
init();
