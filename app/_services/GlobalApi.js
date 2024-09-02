import { date } from "drizzle-orm/mysql-core";

const { default: axios } = require("axios");

//API endpoints
const GetAllGrades = () => axios.get("/api/grade");
const createNewStudent = (data) => axios.post("/api/student", data);
const GetAllStudents = () => axios.get("/api/student");
const DeleteStudentRecord = (id) => axios.delete("/api/student?id=" + id);
const GetAttendanceList = (grade, month) => axios.get("/api/attendance?grade="+grade+"&month="+month);
const MarkAttendance = (data) => axios.post("/api/attendance", data);
const MarkAbsent = (studentId, date, day) => axios.delete("/api/attendance?studentId="+studentId+"&date="+date+"&day="+day);
const TotalPresentCountByDay = (date,grade) => axios.get("/api/dashboard?date="+date+"&grade="+grade);
export default {
  GetAllGrades,
  createNewStudent,
  GetAllStudents,
  DeleteStudentRecord,
  GetAttendanceList,
  MarkAttendance,
  MarkAbsent,
  TotalPresentCountByDay
};
