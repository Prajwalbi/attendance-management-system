import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req){
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get('date');
    const grade = searchParams.get('grade');

    // const result = await db.select({
    //     day: ATTENDANCE.day,
    //     presentCount: sql`count(${ATTENDANCE.day})`
    // }).from(ATTENDANCE)
    // .innerJoin(STUDENTS, eq(ATTENDANCE.studentId, STUDENTS.id))
    // .groupBy(ATTENDANCE.day)
    // .where( and( eq(ATTENDANCE.date, date)),
    //              eq(STUDENTS.grade, grade) )
    // .orderBy(desc(ATTENDANCE.day))
    // .limit(9)

    const result = await db.select({
        day: ATTENDANCE.day,
        presentCount: sql`COUNT(DISTINCT ${ATTENDANCE.studentId})`  // Counting distinct student IDs
    })
    .from(ATTENDANCE)
    .innerJoin(STUDENTS, eq(ATTENDANCE.studentId, STUDENTS.id))
    .groupBy(ATTENDANCE.day)
    .where(
        and(
            eq(ATTENDANCE.date, date),
            eq(STUDENTS.grade, grade)
        )
    )
    .orderBy(desc(sql`${ATTENDANCE.day}`))  // Ensure ordering by day
    .limit(9);

    return NextResponse.json(result);
}
    
