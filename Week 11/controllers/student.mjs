// assume the DAO is in a 'student.mjs' file within the 
//'dao' folder of the project, as described above
import StudentDao from '../dao/student.mjs';

export default class StudentController {
    constructor(db) {
        // Create a DAO for communicating with the database
        // Note the use of "new" to create a new DAO object
        this.dao = new StudentDao(db, "students");
    }

    // findStudentById()
    // calls the DAO's findStudentById() method, passing the ID parameter to
    // it, and formats the JSON returned.
    findStudentById(req, res) {
        try {
            const student = this.dao.findStudentById(req.params.id);
            // Remember from the DAO that the method returns null if there are no results
            if(student == null) {
                res.status(404).json({error: "No student with that ID"});
            } else {
                res.json(student);    
            }
        } catch(e) {
            res.status(500).json({error: e});
        }
    }

    // findStudentByCourse()
    // calls the DAO's findStudentByCourse() method, passing the course parameter to
    // it, and formats the JSON returned.
    findStudentByCourse(req, res) {
        try {
            const students = this.dao.findStudentByCourse(req.params.course);
            res.json(students);    
        } catch(e) {
            res.status(500).json({error: e});
        }
    }

    // addStudent()
    // calls the DAO's addStudent() method, passing in the 'name' and 'course'
    // POST data to it, and formats the allocated ID as JSON to send back to the client.
    addStudent(req, res) {
        try {
            const studentId = this.dao.addStudent(req.body.name, req.body.course);
            res.json({id: studentId});
        } catch(e) {
            res.status(500).json({error: e});
        }
    }
}