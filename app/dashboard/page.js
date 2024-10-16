"use client"
import React, { useEffect, useState } from 'react';
import { useTheme } from "next-themes"
import MonthSelection from '../_components/MonthSelection';
import GradeSelect from '../_components/GradeSelect';
import GlobalApi from '../_services/GlobalApi';
import moment from 'moment';
import StatusList from './_components/StatusList';
import BarChartComponent from './_components/BarChartComponent';
import PieChartComponet from './_components/PieChartComponet';

function Dashboard() {
    const date = new Date();
    const { setTheme } = useTheme()
    const [selectedMonth , setSelectedMonth ] = useState(date);
    const [selectedGrade, setSelectedGrade] = useState("1st");
    const [attendanceList , setAttendanceList ] = useState([]);
    const [totalPresentData, setTotalPresentData] = useState([]);
    useEffect(() => {
        // setTheme("light");
        getStudentAttendanceList();
        getTotalPresentCountByDay();
       
        
    }, [selectedMonth , selectedGrade])


    /*
      Used to get student attendance for given month and grade
      ****
    */
    const getStudentAttendanceList = () => {
      GlobalApi.GetAttendanceList(selectedGrade, moment(selectedMonth).format("MM/yyyy"))
      .then(resp => {
        console.log(resp.data);
        
        setAttendanceList(resp.data);
        // console.log(`Attendance list from month ${moment(selectedMonth).format("MM/yyyy")} and selected grade is ${selectedGrade} is `, resp);
      })
    }

    const getTotalPresentCountByDay = () =>{
        GlobalApi.TotalPresentCountByDay(moment(selectedMonth).format("MM/yyyy"), selectedGrade)
        .then(resp => {
          // console.log("The result of total student present ", resp);
          setTotalPresentData(resp.data);
        })
    }
   
  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
      <h2 className='font-bold text-2xl'>Dashboard</h2>
        
        <div className='flex items-center gap-4'>
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value) }></MonthSelection>
          <GradeSelect selectedGrade={(value) => setSelectedGrade(value)}/>
        </div>

      </div>

      <StatusList attendanceList={ attendanceList } selectedGrade={selectedGrade} selectedMonth={selectedMonth} />

      {/* <div className='grid grid-cols-1 md:grid-cols-2  gap-5'> */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <div className='md:col-span-2'>
          <BarChartComponent attendanceList={attendanceList} totalPresentData={totalPresentData} />
        </div>
        <div>
           <PieChartComponet attendanceList={attendanceList} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;