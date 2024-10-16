import { db } from "@/utils";  // Import database instance from utility functions.
import { ATTENDANCE, STUDENTS } from "@/utils/schema";  // Import database schema for attendance and students tables.
import { eq, isNull, or, and } from "drizzle-orm";  // Import query helpers for building database queries.
import { NextResponse } from "next/server";  // Import Next.js response helper for sending JSON responses.

export async function GET(req) { 
    // Handles GET requests to retrieve attendance data based on grade and month.
    try {
        const searchParams = req.nextUrl.searchParams;
        const grade = searchParams.get('grade');  // Extract grade from the query parameters.
        const month = searchParams.get('month');  // Extract month from the query parameters.

        // Fetch students' attendance based on the selected grade and month.
        const result = await db.select({
            name: STUDENTS.name,  // Student name.
            present: ATTENDANCE.present,  // Attendance status (present or absent).
            day: ATTENDANCE.day,  // Day of the attendance record.
            date: ATTENDANCE.date,  // Date of attendance.
            grade: STUDENTS.grade,  // Student's grade.
            studentId: STUDENTS.id,  // Student's unique ID.
            attendanceId: ATTENDANCE.id  // Attendance record ID.
        })
        .from(STUDENTS)
        .leftJoin(ATTENDANCE, and(
            eq(STUDENTS.id, ATTENDANCE.studentId),  // Match students with their attendance by student ID.
            or(
                eq(ATTENDANCE.date, month),  // Match records with the selected month.
                isNull(ATTENDANCE.date)  // Include students with no attendance records for the month.
            )
        ))
        .where(eq(STUDENTS.grade, grade));  // Filter by the selected grade.

        return NextResponse.json(result);  // Return the result as a JSON response.

    } catch (error) {
        console.error("Error in GET /api/attendance:", error);  // Log the error for debugging.
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });  // Return error response.
    }
}

export async function POST(req) {
    // Handles POST requests to mark attendance.
    try {
        const data = await req.json();  // Extract the request body data (studentId, present status, day, date).
        const result = await db.insert(ATTENDANCE)
            .values({
                studentId: data.studentId,  // Student's unique ID.
                present: data.present,  // Attendance status (present or absent).
                day: data.day,  // Day of the attendance record.
                date: data.date  // Date of attendance.
            });

        return NextResponse.json(result);  // Return the newly inserted attendance record as a JSON response.
    } catch (error) {
        console.error("Error in POST /api/attendance:", error);  // Log the error for debugging.
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });  // Return error response.
    }
}

export async function DELETE(req) {
    // Handles DELETE requests to remove attendance records based on studentId, date, and day.
    try {
        const searchParams = req.nextUrl.searchParams;
        const studentId = searchParams.get("studentId");  // Extract studentId from query parameters.
        const date = searchParams.get("date");  // Extract date from query parameters.
        const day = searchParams.get("day");  // Extract day from query parameters.

        // Delete the attendance record for the specific student on a given date and day.
        const result = await db.delete(ATTENDANCE)
            .where(
                and(
                    eq(ATTENDANCE.studentId, studentId),  // Match studentId.
                    eq(ATTENDANCE.date, date),  // Match date.
                    eq(ATTENDANCE.day, day)  // Match day.
                )
            );

        return NextResponse.json(result);  // Return the result of the delete operation as a JSON response.
    } catch (error) {
        console.error("Error in DELETE /api/attendance:", error);  // Log the error for debugging.
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });  // Return error response.
    }
}
