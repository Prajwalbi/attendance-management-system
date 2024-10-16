import { date } from "drizzle-orm/mysql-core";  // Importing 'date' from the ORM for database operations (unused in this code).

const { default: axios } = require("axios");  // Import axios for making HTTP requests.

// API Endpoints

// Fetch all grades from the system.
const GetAllGrades = () => axios.get("/api/grade");

// Create a new student record by sending the student data to the API.
const createNewStudent = (data) => axios.post("/api/student", data);

// Fetch the list of all students from the system.
const GetAllStudents = () => axios.get("/api/student");

// Delete a specific student record by their ID.
const DeleteStudentRecord = (id) => axios.delete("/api/student?id=" + id);

// Fetch attendance list based on grade and month parameters.
const GetAttendanceList = (grade, month) => axios.get("/api/attendance?grade=" + grade + "&month=" + month);

// Mark student attendance by sending attendance data to the API.
const MarkAttendance = (data) => axios.post("/api/attendance", data);

// Mark a student as absent by their student ID, date, and day. This uses a DELETE request to update attendance.
const MarkAbsent = (studentId, date, day) => axios.delete("/api/attendance?studentId=" + studentId + "&date=" + date + "&day=" + day);

// Get the total count of students present on a specific day for a given grade.
const TotalPresentCountByDay = (date, grade) => axios.get("/api/dashboard?date=" + date + "&grade=" + grade);

// Post an overview of attendance data, including grade, month, and a list of attendance details.
// This could be used for bulk operations or attendance reports.
const AttendanceOverview = (grade, month, attendanceList) => 
  axios.post("/api/attendance-overview", {
    grade,
    month,
    attendanceList
  });

// Export all the API functions so they can be imported and used in other parts of the application.
export default {
  GetAllGrades,
  createNewStudent,
  GetAllStudents,
  DeleteStudentRecord,
  GetAttendanceList,
  MarkAttendance,
  MarkAbsent,
  TotalPresentCountByDay,
  AttendanceOverview
};
