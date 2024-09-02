import { db } from "@/utils";
import { NextResponse } from "next/server";
import { STUDENTS } from "@/utils/schema";
import { eq } from 'drizzle-orm';


export async function POST(req, res) {
    try{
        const data = await req.json();

        const result = await db.insert(STUDENTS)
        .values({
            id: data?.id,
            name: data?.name,
            grade: data?.grade,
            email: data?.email,
            contactNo: data?.contactNo
        })

        return NextResponse.json(result);
    }catch(error){
        console.error("Failed to save student data:", error);
        return NextResponse.json({
            success: false,
            error: error.message},
            { status: 500}
        );
    }
}

export async function GET(req){
    try{
        const result = await db.select().from(STUDENTS);
        return NextResponse.json(result);
    }catch(error){
        console.error("Failed to retrieve the student data ", error);
        return NextResponse.json({
            success: false,
            error: error.message},
            { status: 500 }
        )
    }
    
}

// export async function DELETE(req){
//     const searchParams = req.nextUrl.searchParams;
//     const id = searchParams.get('id');

//     const result = await db.delete(STUDENTS)
//     .where(eq(STUDENTS.id, id)); 

//     return NextResponse.json(result);
// }

export async function DELETE(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get('id');

        const result = await db.delete(STUDENTS)
            .where(eq(STUDENTS.id, id));

        return NextResponse.json(result, { status: 200 }); // 200 OK
    } catch (error) {
        console.error("Failed to delete student data:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
// import { dbQuery } from "@/utils/dbConnection";
// import { NextResponse } from "next/server";


// export async function POST(req) {
//     try {
//         const data = await req.json();

//         // Construct the SQL query and parameters
//         const query = `INSERT INTO STUDENTS (name, grade, email, contactNo) VALUES (?, ?, ?, ?)`;
//         const params = [data?.name, data?.grade, data?.email, data?.contactNo];

//         // Execute the query
//         const result = await dbQuery(query, params);

//         return NextResponse.json({
//             success: true,
//             result: result,
//         });
//     } catch (error) {
//         console.error("Failed to save student data:", error);
//         return NextResponse.json(
//             {
//                 success: false,
//                 error: error.message,
//             },
//             { status: 500 }
//         );
//     }
// }
