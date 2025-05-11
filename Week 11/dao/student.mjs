export default class StudentDao {
    // Constructor: eqivalent of the __init__() initialiser in Python
    // db is our sqlite database connection
    // table is the table storing the students

    constructor(db, table) {
        this.db = db;
        this.table = table;
    }
    
    // method to find a student with a given ID
    // Returns the row containing that student, or null if it cannot be found

    findStudentById(id) {
        
        const stmt = this.db.prepare(`SELECT * FROM ${this.table} WHERE id=?`);
        const rows = stmt.all(id);
        if (rows.length == 0) {
            // return null if no results
            return null;
        } else {
            // only one student will be found but "results" will still be an array with one member. 
            // To simplify code which makes use of the DAO, extract the one and only row from the array 
            // and return that.
            return rows[0];
        }
    }

    // find all students on a given course

    findStudentByCourse(course) {
        const stmt = this.db.prepare(`SELECT * FROM ${this.table} WHERE course=?`);
        const rows = stmt.all(course);
        return rows; // will be an empty array if there are no results
    }

    // add a new student 
    // returns the allocated ID (primary key)

    addStudent(name, course) {
        const stmt = this.db.prepare(`INSERT INTO ${this.table} (name,course) VALUES (?,?)`);
        const info = stmt.run(name, course);
        return info.lastInsertRowid;
    }

    // update a student - takes student ID, name, and course as parameters and 
    // updates the name and the course of the record with that ID
    // Not given to you, to make the exercise more challenging

    updateStudent(id, name, course) {
    }


    // delete a student - takes a student ID as a parameter
    // and deletes the record with that ID.
    // Not given to you, to make the exercise more challenging 

    deleteStudent(id) {
    }
}
