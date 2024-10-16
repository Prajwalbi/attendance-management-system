import { getUniqueRecord } from '@/app/_services/service'; // Import a utility function to get unique student records
import React, { useEffect, useState } from 'react'; // Import React and hooks for state and lifecycle management
import { BarChart, Bar, CartesianGrid, YAxis, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Import chart components from Recharts

function BarChartComponent({ attendanceList, totalPresentData }) { // Define the component and accept props
  const [data, setData] = useState([]); // State to hold formatted data for the chart

  useEffect(() => {
    // Effect hook that runs when attendanceList or totalPresentData changes
    formatAttendanceListCount(); // Call the function to format data for the chart
  }, [attendanceList, totalPresentData]); // Dependencies: runs effect when these values change

  const formatAttendanceListCount = () => {
    // Function to format attendance data for the bar chart
    const totalStudent = getUniqueRecord(attendanceList); // Get unique students from attendance list
    const result = totalPresentData.map(item => ({
      // Map over totalPresentData to create a new array for the chart
      day: item.day, // Day of attendance
      presentCount: item.presentCount, // Count of students present
      absentCount: Number(totalStudent?.length) - Number(item.presentCount), // Calculate absent count
    }));

    console.log("The bardata is ", data); // Log the current data state (may not reflect the new value immediately)

    setData(result); // Update the data state with the formatted result
  };

  return (
    <div className='p-5 border rounded-lg shadow-sm'> {/* Container for the chart */}
      <h2 className='my-2 font-bold text-lg'>Attendance</h2> {/* Title for the chart */}
      <ResponsiveContainer width={'100%'} height={300}> {/* Responsive container for chart */}
        <BarChart data={data}> {/* Bar chart component with formatted data */}
          <CartesianGrid strokeDasharray="3 3" /> {/* Grid lines for better visibility */}
          <XAxis dataKey="day" /> {/* X-axis displaying days */}
          <YAxis /> {/* Y-axis for counts */}
          <Tooltip /> {/* Tooltip to show data on hover */}
          <Legend /> {/* Legend to identify bars */}
          <Bar dataKey="presentCount" name="Total students Present" fill="#8884d8" /> {/* Bar for present count */}
          <Bar dataKey="absentCount" name="Total students Absent" fill="#82ca9d" /> {/* Bar for absent count */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartComponent; // Export the component for use in other parts of the application
