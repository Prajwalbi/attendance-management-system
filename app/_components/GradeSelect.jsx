"use client"  // This tells Next.js to treat this component as a Client Component, allowing the use of hooks like useState and useEffect.

import React, {useState, useEffect } from 'react'
import GlobalApi from '../_services/GlobalApi';  // Import the GlobalApi service which handles API requests.

function GradeSelect({selectedGrade}) {
    // 'selectedGrade' is a prop passed from the parent component, used to send the selected grade back.

    // useState hook to manage the list of grades.
    const [grades, setGrades] = useState([])

    // useEffect hook to call the API when the component mounts (empty dependency array means it runs only once).
    useEffect(() => {
        GetAllGradesList();
    }, [])

    // Function to fetch all grades from the API.
    const GetAllGradesList = () => {
        GlobalApi.GetAllGrades()
        .then(resp => {
            const gradesData = resp.data.result;  // Extracts grades data from API response.
            setGrades(Array.isArray(gradesData) ? gradesData : []);  // Ensure 'gradesData' is an array, or fallback to an empty array.
        })
        .then(() => {
            console.log("The API response grades: ", grades)  // Log the grades to the console (for debugging purposes).
        })
        .catch(error => {
            console.error("Failed to fetch grades", error);  // Log the error if the API call fails.
            setGrades([]);  // If there's an error, reset grades to an empty array to avoid potential issues.
        });
    }

    return (
        <div className='flex flex-col py-2'>
            {/* Dropdown (select) to choose a grade */}
            <select className='p-3 border rounded-lg' 
                onChange={(e) => selectedGrade(e.target.value)}  // Calls the parent function with the selected grade.
            >
                {/* Loop through the 'grades' array and create an option for each grade. */}
                {grades.map((item) => 
                    (<option key={item.id} value={item.grade}>{item.grade}</option>)  // Use 'id' as the key for better performance.
                )}
            </select>
        </div>
    )
}

export default GradeSelect;
