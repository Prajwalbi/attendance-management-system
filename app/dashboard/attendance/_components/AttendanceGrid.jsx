"use client"
import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { getUniqueRecord } from '@/app/_services/service';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

function AttendanceGrid({attendanceList, selectedMonth, selectedGrade}) {

    const [rowData, setRowData ] = useState([]);
    const [colDefs, setColDefs ] = useState([
        { field: 'studentId'},
        {field: 'name'}
    ])

    const daysInMonth = (year, month) => new Date(year, month+1,0).getDate()
    const numberOfDays = daysInMonth(
    parseInt(moment(selectedMonth).format('YYYY')), 
    parseInt(moment(selectedMonth).format("MM")) - 1 );
    const daysArray = Array.from({length:numberOfDays}, (_,i) => i+1) //no. of days in a given month

    useEffect(() => {
        if(attendanceList){
            const userList = getUniqueRecord(attendanceList);
            // console.log("The user list is ", userList);
            setRowData(userList);

            const newColDefs = [ 
                { field: 'studentId', filter: true},
                {field: 'name', filter:true}
            ];
            daysArray.forEach(date => {
                // setColDefs(prevData => [...prevData, {
                //     field: date.toString(), width:50, editable:true
                // }])
                newColDefs.push({
                    field: date.toString(), width:50, editable:true
                })

                userList.forEach(obj => {
                    obj[date] = isPresent(obj.studentId, date)
                })
            });

            setColDefs(newColDefs);

        }
    }, [attendanceList])
    console.log("Attendance list ia ", attendanceList);
    
    /*
    Used to check if user is present or not 
    */
    const isPresent = (studentId, day) =>{
        const result = attendanceList.find(item => item.day == day && item.studentId == studentId)
        return result?true:false

    }

  
    
    /*
      Marking presnt and absent into the database
    */
    const onMarkAttendance = (day, studentId, presentStatus) => {
        const date = moment(selectedMonth).format("MM/yyyy");
        if(presentStatus){
            const data = {
                studentId,
                present: presentStatus,
                day,
                date: date
            }

    GlobalApi.MarkAttendance(data)
    .then(resp => {
        console.log("The resultant post attendance response is ", resp);
        toast(`Student id : ${studentId} is marked as present!`);
    })
    .catch(err => {
        console.log("error while post attendance api call ", err);
        
    });

    }else{
        GlobalApi.MarkAbsent(studentId,date,day)
        .then(resp => {
            console.log("The resultant delete attendance response is ", resp);
            toast(`Student id : ${studentId} is marked as absent!`);
        })
        .catch(err => {
            console.log("error while delete attendance api call ", err);
            
        });
    }
    }

  return (
    <div>
        <h1>Attendance grid</h1>
        <div
            className="ag-theme-quartz" // applying the Data Grid theme
            style={{ height: 500 }} // the Data Grid will fill the size of the parent container
            >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                onCellValueChanged={(e) => onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue) }
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
            />
 </div>

    </div>
  )
}

export default AttendanceGrid