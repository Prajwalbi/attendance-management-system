import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { eq, isNull, or, and  } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) { 
    try {
        const searchParams = req.nextUrl.searchParams;
        const grade = searchParams.get('grade');
        const month = searchParams.get('month');

        // console.log("Selected Grade:", grade);
        // console.log("Selected Month:", month);

        const result = await db.select({
            name: STUDENTS.name,
            present: ATTENDANCE.present,
            day: ATTENDANCE.day,
            date: ATTENDANCE.date,
            grade: STUDENTS.grade,
            studentId: STUDENTS.id,
            attendanceId: ATTENDANCE.id
        })
        .from(STUDENTS)
        .leftJoin(ATTENDANCE, and(
            eq(STUDENTS.id, ATTENDANCE.studentId),
            or(
                eq(ATTENDANCE.date, month),
                isNull(ATTENDANCE.date)
            )
        ))
        .where(eq(STUDENTS.grade, grade));
        // .from(STUDENTS)
        // .leftJoin(ATTENDANCE, eq(STUDENTS.id, ATTENDANCE.studentId)) // Match on the correct field
        // .where(
        //     and(
        //         eq(STUDENTS.grade, grade),
        //         or(
        //             eq(ATTENDANCE.date, month),
        //             isNull(ATTENDANCE.date)
        //         )
        //     )
        // );
        // .from(STUDENTS)
        // .leftJoin(ATTENDANCE, and(eq(STUDENTS.id, ATTENDANCE.studentId),eq(ATTENDANCE.date, month) ))
        // .where(STUDENTS.grade, grade)
        return NextResponse.json(result);

    } catch (error) {
        console.error("Error in GET /api/attendance:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req, res) {
    const data = await req.json();
    const result = await db.insert(ATTENDANCE)
    .values({
        studentId: data.studentId,
        present: data.present,
        day: data.day,
        date: data.date
    })

    return NextResponse.json(result);
    
}

export async function DELETE(req){
    try{
        const searchParams = req.nextUrl.searchParams;
        const studentId = searchParams.get("studentId");
        const date = searchParams.get("date");
        const day = searchParams.get("day");

        const result = await db.delete(ATTENDANCE)
        .where(
            and(
                eq(ATTENDANCE.studentId, studentId),
                eq(ATTENDANCE.date , date),
                eq(ATTENDANCE.day, day)
            )
        )

        return NextResponse.json(result);
    }catch (error) {
        console.error("Error in DELETE /api/attendance:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

   
}
