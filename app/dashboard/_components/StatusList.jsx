import { getUniqueRecord } from '@/app/_services/service';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';
import GlobalApi from '@/app/_services/GlobalApi';

function StatusList({ attendanceList , selectedGrade, selectedMonth}) {
    // const [totalStudent, setTotalStudent] = useState(0);
    // const [presentPerc, setPresentPerc ] = useState(0);

    // useEffect(() => {
    //     if(attendanceList){
    //       const  totalSt = getUniqueRecord(attendanceList);
    //       setTotalStudent(totalSt.length);

    //       const today = moment().format('D');
    //       console.log("The today is ", today);
    //       const presentPerc = (attendanceList.length / ( totalSt.length * Number(today) )  * 100);
    //       setPresentPerc(presentPerc);
    //       console.log("Present percentage is ", presentPerc);
          
    //     }
    // }, [attendanceList])

    // const [selectedMonth, setSelectedMonth] = useState('09/2024');
    // const [selectedGrade, setSelectedGrade] = useState("1st");
    const [attendanceOverview, setAttendanceOverview] = useState({
        totalStudents: 0,
        totalPresent: 0,
        totalAbsent: 0,
        overallAttendancePercentage: 0
    });

    useEffect(() => {
        if(selectedGrade){
            GlobalApi.AttendanceOverview(selectedGrade, moment(selectedMonth).format("MM/yyyy"), attendanceList)
            .then(resp => {
                console.log("Response from attendance overview" + moment(selectedMonth).format("MM/yyyy") + " grade is " + selectedGrade+ " ",resp.data);
                setAttendanceOverview(resp.data)
                
            })
        }
    }, [selectedMonth, selectedGrade]);

    // const result = GlobalApi.AttendanceOverview(selectedGrade, selectedMonth)
    // .then(resp => {
    //     console.log(resp);
        
    // })
    const fetchAttendanceOverview = async () => {
        try {
            const response = await axios.get('/api/attendance-overview', {
                params: {
                    grade: selectedGrade,
                    month: selectedMonth
                }
            });
            setAttendanceOverview(response.data);
        } catch (error) {
            console.error("Error fetching attendance overview:", error);
        }
    };
    
  return (
    <div className='grid grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3 gap-5 my-6
    '>
      <Card icon={<GraduationCap/>} title='Total Student' value={attendanceOverview.totalStudents} />
      <Card icon={<TrendingUp/>} title='Total % Present' value={attendanceOverview.overallAttendancePercentage+"%"} />
      <Card icon={<TrendingDown/>} title='Total % Absent' value={(100 - attendanceOverview.overallAttendancePercentage).toFixed(2)+"%"} />

    </div>
  )
}

export default StatusList