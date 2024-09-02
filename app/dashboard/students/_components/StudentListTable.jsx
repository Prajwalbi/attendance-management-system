"use client";
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";



function StudentListTable({ studentList , refreshData}) {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [25, 50, 100];
  useEffect(() => {
    if (studentList && studentList.length > 0) {
      setRowData(studentList);
      const result = Object.keys(studentList[0])
        .filter((key) => key !== "id")
        .map((x) => ({ field: x, filter: true }));

      const resultCol = [
        ...result,
        { field: "action", cellRenderer: CustomButtons },
      ];
      setColDefs(resultCol); // Set colDefs here, outside of the render cycle
      setTotalStudents(studentList.length);
      console.log("Tital number of students is ", totalStudents);
    }
  }, [studentList]);


  const CustomButtons = (props) => {
    const DeleteRecord = (id) => {
      GlobalApi.DeleteStudentRecord(id)
      .then(resp => {
        console.log("The response from the deleted record " , resp);
        if(resp){
          toast("Record deleted successfully!");
          refreshData();
        }
        
      })
    }
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive" className="h-7">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              delete your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={ () => DeleteRecord(props?.data?.id) } >Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };


  return (
    <div className="my-7">
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <div
          className="p-2 rounded-lg border 
            shadow-sm flex gap-2 mb-4 max-w-sm"
        >
          <Search />
          <input
            type="text"
            placeholder="Search Anything..."
            className="outline-none w-full"
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
        <div
          className="px-2 py-5 mb-3 rounded-lg border 
            shadow-sm flex flex-col gap-2 items-center max-w-40"
        >
          <h1 className="font-bold">Total Students</h1>
          <h1 className="font-bold">{totalStudents}</h1>
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          quickFilterText={searchInput}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}

export default StudentListTable;
