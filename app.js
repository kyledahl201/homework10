const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
​
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
​
const render = require("./lib/htmlRenderer");


init();

async function init() {


        try {
                //this create a new array for employees
                const employees = [];

                        //begins prompt for manager
                const { name, id, email, imageUrl, officeNumber } = await promptManager();
                        //places manager into array
                employees.push(new Manager*(name, id, email, imageUrl, officeNumber));

                //prmot team members

                const response = await promptTeamMembers();
                employees.push(...response);



                //this is for the render function 

                const team = await render(employees);
                

                console.log(team);

                //create html file


                fs.writeFile(outputPath, team, function(err) {

                        if (err) {

                                console.log(err);

                        }

                            console.log("html file made")

                });


        } catch (err) {
            console.log(err);
        }











}
​
//this is to get information from the user about the managers 


function promptManager() {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "Enter manager's name:",
                name: "name"
            },
            {
                type: "number",
                message: "Enter manager's ID bumber :",
                name: "id"
            },
            {
                type: "input",
                message: "Enter manager's email:",
                name: "email"
            },
            {
                type: "number",
                message: "Enter manager's office:",
                name: "officeNumber"
            },
            {
                type: "input",
                message: "Upload an image:",
                name: "imageUrl"
            }

















        ])
}



// this is for the team member


const teamMembers = [];

async function promptTeamMembers() {


try {
    const { role } = await promptMemberRole();
    if (role === "Engineer") {

                return inquirer
                    .prompt([

                        {
                            type: "input",
                            message: "Enter engineer name:",
                            name: "name"
                        },
                        {
                            type: "number",
                            message: "Enter engineer ID number:",
                            name: "id"
                        },
                        {
                            type: "input",
                            message: "Enter engineer email:",
                            name: "email"
                        },
                        {
                            type: "input",
                            message: "Enter the github username:",
                            name: "github"
                        },
                        {
                            type: "input",
                            message: "Upload an image:",
                            name: "imageUrl"
                        }







                    ]).then(function ({ name, id, email, imageUrl, github }) {


                            teamMembers.push(new Engineer(name, id, email, imageUrl, github));
                            return promptTeamMembers();

                    })











    } else if (role === "Intern") {


        return inquirer 
            .prompt([


                {
                    type: "input",
                    message: "Enter intern name:",
                    name: "name"
                },
                {
                    type: "number",
                    message: "Enter intern ID:",
                    name: "id"
                },
                {
                    type: "input",
                    message: "Enter intern email:",
                    name: "email"
                },
                {
                    type: "input",
                    message: "Enter intern school:",
                    name: "school"
                },
                {
                    type: "input",
                    message: "upload an image:",
                    name: "imageUrl"
                }









            ]).then(function ({ name, id, email, imageUrl, school }) {

                        teamMembers.push(new Intern(name, id, email, imageUrl, school));
                        return promptTeamMembers();


            })







    } else {
        return teamMembers;
    }
} catch (err)
 {
     console.log(err);
 }





















}



//to get member roll

function promptMemberRole() {

            return inquirer
                .prompt({
                    type: "list",
                    message: "Which occupation are you adding?"
                    name: "role",
                    choices: [
                            "Engineer",
                            "Intern",
                            "End of option"

                    ]
                })



}

​
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
​
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
​
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
