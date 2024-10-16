import { db } from "@/utils";  // Import the database instance for querying.
import { NextResponse } from "next/server";  // Import Next.js response utility to send JSON responses.
import { GRADES } from "@/utils/schema";  // Import schema definition for the GRADES table.

export async function GET(req) {
    // Fetch all records from the GRADES table.
    const result = await db.select().from(GRADES);
    
    // Return the fetched result as a JSON response.
    return NextResponse.json({ result });
}
