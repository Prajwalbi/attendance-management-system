import { db } from "@/utils";  // Import the database utility to interact with the DB.
import { NextResponse } from "next/server";  // Import Next.js's response utility for API routes.
import { STUDENTS } from "@/utils/schema";  // Import the STUDENTS schema to define the structure of the table.
import { eq } from 'drizzle-orm';  // Import 'eq' to handle equality conditions in the database queries.

// Handler for creating a new student record (POST request).
export async function POST(req, res) {
    try {
        // Parse the incoming JSON request to get the student data.
        const data = await req.json();

        // Insert the new student record into the STUDENTS table.
        const result = await db.insert(STUDENTS)
        .values({
            id: data?.id,  // Insert student ID.
            name: data?.name,  // Insert student name.
            grade: data?.grade,  // Insert student grade.
            email: data?.email,  // Insert student email.
            contactNo: data?.contactNo  // Insert student's contact number.
        });

        // Return the inserted record in the response.
        return NextResponse.json(result);
    } catch (error) {
        // If an error occurs, log it and return a failure response.
        console.error("Failed to save student data:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

// Handler for fetching all student records (GET request).
export async function GET(req) {
    try {
        // Fetch all student records from the STUDENTS table.
        const result = await db.select().from(STUDENTS);

        // Return the fetched records in the response.
        return NextResponse.json(result);
    } catch (error) {
        // If an error occurs, log it and return a failure response.
        console.error("Failed to retrieve the student data ", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

// Handler for deleting a student record by ID (DELETE request).
export async function DELETE(req) {
    try {
        // Extract the student ID from the query parameters.
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get('id');

        // Delete the student record with the given ID from the STUDENTS table.
        const result = await db.delete(STUDENTS)
            .where(eq(STUDENTS.id, id));

        // Return the result of the delete operation.
        return NextResponse.json(result, { status: 200 }); // Return 200 OK if successful.
    } catch (error) {
        // If an error occurs, log it and return a failure response.
        console.error("Failed to delete student data:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
