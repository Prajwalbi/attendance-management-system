import { int, mysqlTable, varchar , boolean} from "drizzle-orm/mysql-core";

export const GRADES = mysqlTable("grades", {
  id: int("id", {length: 15}).primaryKey(), // Primary key with integer type
  grade: varchar("grade", { length: 10 }).notNull(), // VARCHAR column with length 10, cannot be NULL
});


export const STUDENTS = mysqlTable("students", {
  id: int("id", {length: 15}).primaryKey(),
  name: varchar("name", {length: 100}).notNull(), 
  grade: varchar("grade", { length: 10 }).notNull(), // Corresponding grade, cannot be NULL
  contactNo: varchar("contactNo", { length: 15 }).notNull(), // Adjusted length for contact number
  email: varchar("email", { length: 254 }).notNull()
})

export const ATTENDANCE =  mysqlTable('attendance', {
  id: int('id', {length: 11}).autoincrement().primaryKey(),
  studentId: int('studentId', {length: 11}).notNull(),
  present: boolean('present').default(false), 
  day: int('day', {length: 11}).notNull(), //22
  date: varchar('date', {length :20}).notNull() //05/2024 (month and year)
});