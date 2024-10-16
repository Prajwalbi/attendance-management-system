import { getUniqueRecord } from '@/app/_services/service'; // Import a utility function for getting unique records
import moment from 'moment'; // Import moment.js for date manipulation
import React, { useState, useEffect } from 'react'; // Import React and hooks
import { PieChart, Pie, ResponsiveContainer } from 'recharts'; // Import components from recharts

function PieChartComponent({ attendanceList }) { // Define the PieChartComponent and destructure props
    // Sample data for demonstration purposes (can be removed later)
    const data02 = [
        {
          "name": "Group A",
          "value": 2400
        },
        {
          "name": "Group B",
          "value": 4567
        },
    ];
        
    const [data, setData] = useState([]); // State to hold processed data for the pie chart

    useEffect(() => {
        // Effect that runs when attendanceList changes
        if (attendanceList) {
            const totalSt = getUniqueRecord(attendanceList); // Get unique records from attendanceList
            const today = moment().format('D'); // Get today's date
            // Calculate present percentage based on total students and today's date
            const presentPerc = (attendanceList.length / (totalSt.length * Number(today)) * 100);
            console.log("Present percentage is pie chart is ", presentPerc); // Log the present percentage
            // Set the data for the pie chart
            setData([ 
                {
                    name: 'Total Present', // Name for present slice
                    value: presentPerc.toFixed(1) // Present percentage formatted to one decimal place
                },
                {
                    name: 'Total Absent', // Name for absent slice
                    value: 100 - presentPerc.toFixed(1) // Absent percentage calculated
                },
            ]); 
        }
    }, [attendanceList]); // Dependency array, effect runs when attendanceList changes
      
    return (
        <div className='border p-5 rounded-lg'> {/* Container for the pie chart with styling */}
            <h2 className='font-bold text-lg'>Monthly Attendance</h2> {/* Title for the chart */}
            <ResponsiveContainer width={'100%'} height={300}> {/* Responsive container for the pie chart */}
                {/* <PieChart width={730} height={250}> */} {/* Commented out default size */}
                <PieChart> {/* Pie chart component */}
                    <Pie 
                        data={data} // Data for the pie chart
                        dataKey="value" // Key for value in data
                        nameKey="name" // Key for name in data
                        cx="50%" // Center x position of the pie chart
                        cy="50%" // Center y position of the pie chart
                        innerRadius={60} // Inner radius for donut effect
                        outerRadius={80} // Outer radius of the pie
                        fill="#82ca9d" // Fill color for the pie slices
                        label // Show labels on pie slices
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PieChartComponent; // Export the PieChartComponent for use in other parts of the application
