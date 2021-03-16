const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '',
  database: 'greatBayDB',
});


function answers() {
inquirer
  .prompt([
    {
      type: "list",
      message: "Would you like to bid or post?",
      choices:["Bid,", "Post"],
      name: "bidOrPost"
    }

  ])
  .then((answer) => {
      if (answer.bidOrPost=== "Post") {
        console.log(answer.bidOrPost);
        inquirer
          .prompt([
            {
              type: "input",
              message: "What would you like to post on?",
              name: "item"
            },
            {
              type: "input",
              message: "What category?",
              name: "category"
            },
            {
              type: "input",
              message: "What is your starting bid?",
              name: "startingBid",
              validate(value) {
                if(isNaN (value) === false) {
                  return true
                } 
                return false
              } 
              
            }
        
            
          ])
          .then ((answer ) => {
            // read/ to create/ 
            connection.query('INSERT INTO marketPlace SET ?',
            {
              item: answer.item,
              bidamount: answer.startingBid,
              category: answer.category
            }, (err,res) => {
              if (err) throw err;
              // Log all results of the SELECT statement
              console.log(res);
              answers();
            });

          })
          // const createItem = () = > {

          

      } else if (answer.bidOrPost === "Bid"){
        inquirer
          .prompt([
            {
              type: "list",
              message: "How much would you like to bid?",
              choices:["Car", "Motorcycle", "Skateboard"],
              name: "item"
            }  
          ]).then(answers => {

          })

      }
     
    })
  .catch(error => {
    if(error.isTtyError) {

      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
};  


  // Connect to the DB
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  answers();
});