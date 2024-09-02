"use client"
import MonthSelection from '@/app/_components/MonthSelection';
import React, { useState } from 'react'
import GradeSelect from '@/app/_components/GradeSelect';
import { Button } from '@/components/ui/button';
import GlobalApi from '@/app/_services/GlobalApi';
import moment from 'moment';
import AttendanceGrid from './_components/AttendanceGrid';
import AttendancePage from './_components/AttendancePage';

function Attendance() {
    const [selectedMonth , setSelectedMonth] = useState(new Date());
    const [selectedGrade, setSlectedGrade ] = useState("1st");
    const [attendanceList, setAttendanceList] = useState([]);
     
    /*
    * * * Used to fetch attendance list for given month and Grade
    *
    */
    const onSearchHandler = () =>{
            // console.log("the selected month and grade is " , selectedMonth , " " , selectedGrade);
            const month = moment(selectedMonth).format("MM/YYYY"); 
            // console.log("The month is " , month)
            GlobalApi.GetAttendanceList(selectedGrade, month)
            .then(resp => {
                console.log("Attendance list result ", resp);
                setAttendanceList(resp.data);
                
            })
            .catch(err => {
                console.log("The err encountered while fetching the attendance list is " , err);
            });
    }
  return (
    <div className='p-10' >
        <AttendancePage />
        <h2 className='text-2xl font-bold'>Attendance</h2>

        {/* Search option  */}
        <div className='flex gap-4 items-center my-5 p-3 border rounded-lg shadow-sm' >
            <div className='flex gap-2 items-center'>
                <label>Select Month</label>
                <MonthSelection selectedMonth={ (value) =>  setSelectedMonth(value)}/>
            </div>
            <div className='flex gap-2 items-center'>
                <label>Select Grade</label>
                <GradeSelect selectedGrade={ (value) => setSlectedGrade(value) } />
            </div>
            <Button
                onClick = { onSearchHandler }
            >Search</Button>
           
        </div>

        {/* Student attendance grid  */}
        <AttendanceGrid attendanceList={attendanceList}
        selectedMonth = {selectedMonth}
        selectedGrade={selectedGrade}
        />


    </div>
  )
}

export default Attendance;