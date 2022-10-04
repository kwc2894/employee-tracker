const express = require('express');
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const iamTable = require('console.table'); 

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'rootroot',
    database: 'employee_track'
  },
  console.log(`Connected to the employee_track database.`)
);
db.connect(err =>{
  if(err){
    console.log('you got a connection error bucko');
  }
});
// Query database

db.query('SELECT * FROM employees', function (err, results) {
  console.log(results);
});
db.query('SELECT * FROM rrole', function (err, results) {
  console.log(results);
});
db.query('SELECT * FROM department', function (err, results) {
  console.log(results);
});
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    }
])
.then((answers) =>{
  const { choice } = answers; 
  if(choice === 'Add Employee'){
    addEmp();
  }
  if(choice === 'Update Employee Role'){
    updateEmp();
  }
  if(choice === 'View All Roles'){
    viewRoles();
  }
  if(choice === 'Add Role'){
    addRole();
  }
  if(choice === 'View All Departments'){
    viewDepartments();
  }
  if(choice === 'Add Department'){
    addDepartment();
  }
  if(choice === 'Quit'){
    db.end();
  }
}) 
}
const addEmp = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: "What is the id of this employee"
    },
    {
      type: 'input',
      name: 'firstName',
      message: "What is the first name of this employee"
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the last name of this employee"
    },
    {
      type: 'input',
      name: 'role_id',
      message: "What is the role Id of this employee"
    },
    {
      type: 'input',
      name: 'manager_id',
      message: "What is the manager ID that this employee has"
    },
    {
      type: 'input',
      name: 'review',
      message: "What can be said about this employee has"
    },
  ])
  .then(employeedata =>{
    const {id, firstName, lastName, role_id, manager_id, review} = employeedata
      db.query('INSERT INTO employees (id, firstName, lastName, role_id, manager_id, review VALUES(?, ?, ?, ?, ?, ?)',
      [employeedata],
      (err, results) => {
        if (err) throw err;
        console.log('data recieved')
        console.table(results);
      }
      );
      // const params = [id, firstName, lastName, role_id, manager_id, review];
  //    db.query((err, result) => {
  //   if (err) {
  //     res.status(400).json({ error: err.message });
  //     return;
  //   }
  //   res.json({
  //     message: 'success',
  //     data: body
  //   });
  // });
});
}

const updateEmp = () => {
// app.put('/api/employee/:id', (req, res) => {
//   const sql = `UPDATE Role SET Role = ? WHERE id = ?`;
//   const params = [req.body.role_id, req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'Employee Not Found'
//       });
//     } else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.affectedRows
//       });
//     }
//   });
// });x
promptUser();
}
//  const viewRoles = () => {
//   app.get('/api/rroles', (req, res) => {
//   const sql = `SELECT id, rroles_title AS title FROM rroles`;
  
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//        return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });
promptUser();
// }
 const addRole = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'role',
      message: "What role do you want to add?",
    },
    {
      type: 'input', 
      name: 'salary',
      message: "What is the salary of this role?",
    }
  ])
    .then(answer => {
      const params = [answer.role, answer.salary];
      const {role, salary} = roledata;
      //const {id, firstName, lastName, role_id, manager_id, review} = employeedata

      // grab dept from department table
      const roleSELECT = 'SELECT name, id FROM department';

      db.promise().query(roleSELECT, (err, data) => {
        if (err) throw err; 
    
        const dept = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
        {
          type: 'list', 
          name: 'dept',
          message: "What department is this role in?",
          choices: dept
        }
        ])
          .then(deptData => {
            const dept = deptData.dept;
            params.push(dept);
            const sql = `INSERT INTO role (title, salary, department_id)
                        VALUES (?, ?, ?)`;

                        db.query(sql, params, (err, result) => {
                          if (err) {
                            res.status(400).json({ error: err.message });
                            return;
                          }
                          res.json({
                            message: 'Added' + answer.role + " to roles!",
                            data: body
                            // showRoles();
                          });
                        });
       });
     });
   });
 };
 function viewDepartments() {
   console.log("IN THE METHOD");
   console.log("VIEWING DEPARTMENTS");
  db.query('SELECT * FROM department', function (err, results) {
    console.log("ERROR:");
    console.log(err);
    console.log("RESULTS =");
    console.table(results);
    console.log(results);
  })
   promptUser();
}

const addDepartment = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'department_name',
      message: "What is the name of this department"
    }
  ])
  .then(departmentdata =>{
//     const {department_name} = departmentdata 
//     app.post('/api/new-department', ({ body }, res) =>{
//       const sql = 'INSERT INTO department (deaprtment_name, review VALUES(?)';
//       const params = [departmentdata];
//      db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body
//     });
//   });
// });
});
}

 
promptUser();
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });


