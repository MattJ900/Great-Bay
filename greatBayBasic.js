const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'yourRootPassword',
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

          

      } else if (answer.bidOrPost === "Bid"){
        connection.query('SELECT * FROM auctions', (err, results) => {
          if (err) throw err;
          // once you have the items, prompt the user for which they'd like to bid on
          inquirer
            .prompt([
              {
                name: 'choice',
                type: 'rawlist',
                choices() {
                  const choiceArray = [];
                  results.forEach(({ item_name }) => {
                    choiceArray.push(item_name);
                  });
                  return choiceArray;
                },
                message: 'What auction would you like to place a bid in?',
              },
              {
                name: 'bid',
                type: 'input',
                message: 'How much would you like to bid?',
              },
            ])
            .then((answer) => {
              // get the information of the chosen item
              let chosenItem;
              results.forEach((item) => {
                if (item.item_name === answer.choice) {
                  chosenItem = item;
                }
              });
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