import express from 'express';
const studentRouter = express.Router();
import Database from 'better-sqlite3';
const db = new Database("students.db");

// Initialise database, not shown

// assume the StudentController is inside a 'student.mjs' file within the 
// 'controllers' folder of the project, as described above
import StudentController from '../controllers/student.mjs';

// Create the controller object, and pass in the database connection as an argument
// Note the use of "new" to create a new object of the StudentController class
// StudentController is covered below
const sController = new StudentController(db);

// handle get requests to route /id/:id using the controller's findStudentById() method
studentRouter.get('/id/:id', sController.findStudentById.bind(sController));

// handle get requests to route /course/:course using the controller's findStudentByCourse() method
studentRouter.get('/course/:course', sController.findStudentByCourse.bind(sController));

// handle post requests to /create using the controller's addStudent() method
studentRouter.post('/create', sController.addStudent.bind(sController));

export default studentRouter; // so that main application can use it