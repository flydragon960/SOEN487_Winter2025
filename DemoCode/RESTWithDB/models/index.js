import sequelize from '../database/database.js';
import Department from './Department.js';
import Course from './Course.js';
import Student from './Student.js';

// Define associations
Department.hasMany(Course, { foreignKey: 'department_id' });
Course.belongsTo(Department, { foreignKey: 'department_id' });

Department.hasMany(Student, { foreignKey: 'department_id' });
Student.belongsTo(Department, { foreignKey: 'department_id' });

Student.belongsToMany(Course, { through: 'student_courses' });
Course.belongsToMany(Student, { through: 'student_courses' });

export { sequelize, Department, Course, Student };
