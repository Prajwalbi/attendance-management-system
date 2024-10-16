import { db } from "@/utils";  // Import the database instance for querying.
import { ATTENDANCE, STUDENTS } from "@/utils/schema";  // Import schema definitions for attendance and students.
import { and, desc, eq, sql } from "drizzle-orm";  // Import SQL query helpers from Drizzle ORM.
import { NextResponse } from "next/server";  // Import Next.js response utility for sending JSON responses.

export async function GET(req) {
    // Extract search parameters (date and grade) from the request URL.
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get('date');  // The date for which attendance is being queried.
    const grade = searchParams.get('grade');  // The grade of students for which attendance data is requested.

    /*
    // Commented out query (can be removed or kept for reference)
    // Example: Selecting day and count of present students grouped by day.
    const result = await db.select({
        day: ATTENDANCE.day,  // Select the day of attendance.
        presentCount: sql`count(${ATTENDANCE.day})`  // Count the number of attendance records for each day.
    }).from(ATTENDANCE)
    .innerJoin(STUDENTS, eq(ATTENDANCE.studentId, STUDENTS.id))  // Join with the STUDENTS table on student ID.
    .groupBy(ATTENDANCE.day)  // Group results by day.
    .where( and( eq(ATTENDANCE.date, date)), eq(STUDENTS.grade, grade) )  // Filter by date and grade.
    .orderBy(desc(ATTENDANCE.day))  // Order by descending day.
    .limit(9);  // Limit the results to the last 9 days.
    */

    // Query to fetch attendance count, grouped by day, for the specified date and grade.
    const result = await db.select({
        day: ATTENDANCE.day,  // Select the day for the attendance record.
        presentCount: sql`COUNT(DISTINCT ${ATTENDANCE.studentId})`  // Count distinct student IDs for each day (to get the number of present students).
    })
    .from(ATTENDANCE)  // From the ATTENDANCE table.
    .innerJoin(STUDENTS, eq(ATTENDANCE.studentId, STUDENTS.id))  // Inner join with STUDENTS to match attendance with students.
    .groupBy(ATTENDANCE.day)  // Group results by day.
    .where(
        and(
            eq(ATTENDANCE.date, date),  // Filter records by the specified date.
            eq(STUDENTS.grade, grade)  // Filter records by the specified grade.
        )
    )
    .orderBy(desc(sql`${ATTENDANCE.day}`))  // Order results by day in descending order.
    .limit(9);  // Limit the number of results to the last 9 days.

    // Return the result as a JSON response.
    return NextResponse.json(result);
}
