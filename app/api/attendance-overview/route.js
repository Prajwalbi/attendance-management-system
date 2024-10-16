import { db } from "@/utils";  // Import database instance for making database queries.
import { ATTENDANCE, STUDENTS } from "@/utils/schema";  // Import table schemas for attendance and students.
import { eq, and } from "drizzle-orm";  // Import query helpers for building queries.
import { NextResponse } from "next/server";  // Import Next.js response helper to send JSON responses.

// POST request to calculate and return attendance overview for a given grade and month.
export async function POST(req, resp) {
    // Extract data from the request body.
    const data = await req.json();
    const attendanceRecords = data.attendanceList;  // Extract attendance records list.

    // Calculate the total number of unique students.
    const totalStudents = (new Set(attendanceRecords.map(record => record.studentId)).size);

    // Calculate the total number of unique days in the month from the attendance records.
    const totalDays = new Set(attendanceRecords.map(record => record.day)).size;

    // Calculate the total number of present days from the attendance records.
    const totalPresent = attendanceRecords.filter(record => record.present).length;

    // Calculate the total number of absent days.
    // The total possible attendance entries (days * students) minus the present count gives the number of absentees.
    const totalAbsent = totalDays * totalStudents - totalPresent;

    // Calculate the overall attendance percentage.
    let overallAttendancePercentage;
    if (totalPresent + totalAbsent === 0) {
        overallAttendancePercentage = 0;  // If no records are found, set the percentage to 0.
    } else {
        overallAttendancePercentage = (totalPresent / (totalPresent + totalAbsent)) * 100;  // Formula to calculate percentage.
    }

    // Return the attendance overview data as a JSON response.
    return NextResponse.json({
        totalStudents,  // Total number of students in the grade.
        totalPresent,  // Total number of present records.
        totalAbsent,  // Total number of absent records.
        overallAttendancePercentage: overallAttendancePercentage.toFixed(2),  // Attendance percentage rounded to two decimal places.
    });
}
