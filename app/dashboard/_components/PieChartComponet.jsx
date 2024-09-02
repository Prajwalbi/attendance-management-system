import { getUniqueRecord } from '@/app/_services/service';
import moment from 'moment';
import React, { useState , useEffect} from 'react'
import { PieChart, Pie, ResponsiveContainer } from 'recharts'

function PieChartComponet({attendanceList}) {
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
        

        const [data, setData] = useState([]);
        useEffect(() => {
            if(attendanceList){
              const  totalSt = getUniqueRecord(attendanceList);
              const today = moment().format('D');
            //   console.log("The tiday is ", today);
              const presentPerc = (attendanceList.length / (totalSt.length * Number(today))  * 100);
              console.log("Present percentage is pie chart is ", presentPerc);
             setData([ 
            {
                name: 'Total Present',
                value: presentPerc.toFixed(1)
            },
            {
                name: 'Total Absent',
                value: 100 - presentPerc.toFixed(1)
            },
             ]) 
            }
        }, [attendanceList])
      
  return (
    <div className='border p-5 rounded-lg'>
        <h2 className='font-bold text-lg'>Monthly Attendance</h2>
        <ResponsiveContainer width={'100%'} height={300}>
            {/* <PieChart width={730} height={250}> */}
            <PieChart >
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
            </PieChart>
        </ResponsiveContainer>
    </div>
  )
}

export default PieChartComponet