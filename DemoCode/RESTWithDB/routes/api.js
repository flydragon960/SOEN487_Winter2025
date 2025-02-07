import express from 'express';
import { Department, Course, Student } from '../models/index.js';

const router = express.Router();

// Routes for Departments
router.get('/departments', async (req, res) => {
  try {
    const departments = await Department.findAll(); // Query all departments
  
    // Log the retrieved departments to the console
    //console.log('Fetched Departments:', JSON.stringify(departments, null, 2));
  
    res.status(200).json(departments); // Send the result as JSON
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Failed to fetch departments', error: error.message });
  }
});

// Get a specific department by ID
router.get('/departments/:id', async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (department) {
      res.json(department);
    } else {
      res.status(404).json({ message: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving department', error: error.message });
  }
});

// Routes for Courses
router.get('/courses', async (req, res) => {
  try{
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
  }
});



// Get a specific course by ID
router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course', error: error.message });
  }
});

// Routes for Students
router.get('/students', async (req, res) => {
  try{
  const students = await Student.findAll();
  res.json(students);
  }catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Failed to fetch students', error: error.message });
  }
});

// Get a specific student by ID
router.get('/students/:id', async (req, res) => {
  try {
    console.log('in students/:id Full URL:', req.originalUrl);
    console.log('in students/:id Query Parameters:', req.query);
    const student = await Student.findByPk(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving student', error: error.message });
  }
});

// Query students by first name and last name
router.get('/students_query_firstName', async (req, res) => {
  try {
    console.log('in students/query, Query Full URL:', req.originalUrl);
    console.log('in students/query, Query Parameters:', req.query);
    const firstName = req.query.firstName;
    const students = await Student.findAll({
      where: {
        first_name: firstName,
      },
  });
  console.log('Found students:', students);
  res.json(students);
} catch (error) {
  res.status(500).json({ message: 'Error querying students', error: error.message });
}
});

// Query students by first name and last name
router.get('/students_query_first_last', async (req, res) => {
  try {
    console.log('in students/query, Query Full URL:', req.originalUrl);
    console.log('in students/query, Query Parameters:', req.query);
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const students = await Student.findAll({
      where: {
        first_name: firstName,
        last_name: lastName,        
      },
  });
  console.log('Found students:', students);
  res.json(students);
} catch (error) {
  res.status(500).json({ message: 'Error querying students', error: error.message });
}
});


export default router;
