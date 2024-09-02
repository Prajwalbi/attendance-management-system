"use client"
import React, {useState, useEffect } from 'react'
import GlobalApi from '../_services/GlobalApi';


function GradeSelect({selectedGrade}) {


    useEffect(() => {
        GetAllGradesList();
        },  [])
    const [grades, setGrades] = useState([])
    const GetAllGradesList = () => {
        GlobalApi.GetAllGrades().then(resp => {
          const gradesData = resp.data.result;
          setGrades(Array.isArray(gradesData) ? gradesData : []);
         
        }).then(() => {
          console.log("the api response grades " , grades)
        }).catch(error => {
          console.error("Failed to fetch grades", error);
          setGrades([]); // Set grades to an empty array on error to prevent the error
        });
    }

  return (
    <div className='flex flex-col py-2'>
    <select className='p-3 border rounded-lg' 
    onChange={(e) => selectedGrade(e.target.value)}
    >
      {grades.map((item) => 
        (<option key={item.id} value={item.grade} >{item.grade}</option>) )}
    </select>

  </div>
  )
}

export default GradeSelect;