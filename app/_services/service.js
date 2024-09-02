  /* ***
        Calaulate No of Days in searched month
        Store in Array
        @returns
        Dynamically we will set to ColDefs field
    */
        export  const getUniqueRecord = (attendanceList) => {
            const uniqueRecord = [];
            const existingUser = new Set();
            attendanceList?.forEach((record) => {
                if(!existingUser.has(record.studentId)){
                    existingUser.add(record.studentId);
                    uniqueRecord.push(record);
                    // uniqueRecord.push({studentId: record.studentId,
                    //     name: record.name
                    // })
                    // console.log("The resultant array is ", uniqueRecord); 
                }
            })
            return uniqueRecord;
          }