const express = require('express');
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const iamTable = require('console.table'); 

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'employee_track'
  },
  console.log(`Connected to the employee_track database.`)
);
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
    },
])
.then((answers) =>{
  const { decision } = answers; 
  if(decision === "Add Employee"){
    addEmp();
  }
  if(decision === "Update Employee Role"){
    updateEmp();
  }
  if(decision === "View All Roles"){
    viewRoles();
  }
  if(decision === "Add Role"){
    addRole();
  }
  if(decision === "View All Departments"){
    viewDepartments();
  }
  if(decision === "Add Department"){
    addDepartment();
  }
  if(decision === "Quit"){
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
    app.post('/api/new-employee', ({ body }, res) =>{
      const sql = 'INSERT INTO employees (id, firstName, lastName, role_id, manager_id, review VALUES(?, ?, ?, ?, ?, ?)';
      const params = [id, firstName, lastName, role_id, manager_id, review];
     db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});
});
}

const updateEmp = () => {
// BONUS: Update review name
app.put('/api/employee/:id', (req, res) => {
  const sql = `UPDATE Role SET Role = ? WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee Not Found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});
}
 const viewRoles = () => {
  app.get('/api/rroles', (req, res) => {
  const sql = `SELECT id, rroles_title AS title FROM rroles`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});
}
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
 const viewDepartments = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'department_name',
      message: "What department do you want to add?",
    }
  ])
    .then(answer => {
      const params = [answer.department_name];
      const {department_name} = roledata;
      //const {id, firstName, lastName, role_id, manager_id, review} = employeedata

      // grab dept from department table
      const departmentselect = 'SELECT name, id FROM department';

      db.promise().query(departmentselect, (err, data) => {
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
    const {department_name} = departmentdata 
    app.post('/api/new-department', ({ body }, res) =>{
      const sql = 'INSERT INTO department (deaprtment_name, review VALUES(?)';
      const params = [departmentdata];
     db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});
});
}

 

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});





// // Create a movie
// app.post('/api/new-movie', ({ body }, res) => {
//   const sql = `INSERT INTO movies (movie_name)
//     VALUES (?)`;
//   const params = [body.movie_name];
  
//   db.query(sql, params, (err, result) => {
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

// // Read all movies
// app.get('/api/movies', (req, res) => {
//   const sql = `SELECT id, movie_name AS title FROM movies`;
  
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

// // Delete a movie
// app.delete('/api/movie/:id', (req, res) => {
//   const sql = `DELETE FROM movies WHERE id = ?`;
//   const params = [req.params.id];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//       message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.affectedRows,
//         id: req.params.id
//       });
//     }
//   });
// });

// // Read list of all reviews and associated movie name using LEFT JOIN
// app.get('/api/movie-reviews', (req, res) => {
//   const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // BONUS: Update review name
// app.put('/api/review/:id', (req, res) => {
//   const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
//   const params = [req.body.review, req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.affectedRows
//       });
//     }
//   });
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });


promptUser();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});