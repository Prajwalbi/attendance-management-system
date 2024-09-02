"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import GlobalApi from '@/app/_services/GlobalApi'
import { toast } from "sonner"
import { LoaderIcon } from 'lucide-react'





function AddNewStudent({refreshData}) {
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const newStudentHandler = () => {
    setOpen(true);
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const  onSubmit =  async (data) =>{
    setLoading(true);
     console.log(data);
     try{
      const response = await GlobalApi.createNewStudent(data);
      console.log("Create new Student response ", response);
      if(response.data){
        reset();
        setOpen(false);
        toast("New student record added!");
        refreshData();
      }
     }catch(error){
        console.error("Failed to create student: ", error );
        if(error.response &&  error.response.data && error.response.data.error){
            if(error.response.data.error.includes("Duplicate entry")){
              toast("The ID you entered already exists. Please enter a different ID.");
            }else{
              toast("An error occurred while adding the student. Please try again.");
            }
        }else{
          toast("An unexpected error occurred. Please try again.")
        }
     }finally{
      setLoading(false);
     }
    //  GlobalApi.createNewStudent(data)
    //  .then(resp => {
    //     console.log("Create new Student response ", resp);
    //     if(resp.data){
    //         reset();
    //         setOpen(false);
    //         toast("New student record added!  ")
    //         refreshData();
    //     }
    //     setLoading(false);
        
    //  })
  }

  useEffect(() => {
    GetAllGradesList();
  },  [])
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
    <div>
        <Button onClick={ newStudentHandler }>+ Add New Student</Button>
        <Dialog open={open}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className='py-3'>
                      <label className={errors.name ? "text-red-500" : ""} >Id</label>
                      <Input type="number" {...register("id", {required:true})} 
                      className={errors.name ? "border-red-500": ""}
                      />
                      {errors.name && <span className='text-red-500'>This field is required</span>}
                </div>

                <div className='py-3'>
                    <label className={errors.name ? "text-red-500" : ""} >Full Name</label>
                    <Input type="text" {...register("name",  { required: true })}
                    className={errors.name ? "border-red-500" : ""}  />
                    {errors.name && <span className='text-red-500'>This field is required</span>}

                </div>
                <div className='py-3'>
                    <label>Email id:</label>
                    <Input type="email"  {...register("email", { required: true })} />
                </div>
                <div className='flex flex-col py-3'>
                  <label>Select Grade</label>
                  <select className='p-3 border rounded-lg' {...register("grade" ,  { required: true })} >
                    {grades.map((item) => 
                      (<option key={item.id} value={item.grade} >{item.grade}</option>) )}
                  </select>
    
                </div>
                <div className='py-3'>
                    <label>Contact Number</label>
                    <Input type="number" {...register("contactNo", {required: true})} />
                </div>
                <div className='flex gap-3 items-center justify-end mt-5'>
                  <Button type="button" onClick={() => setOpen(false)} variant="ghost">Cancel</Button>
                  <Button 
                  type="submit" 
                  disabled={loading} 
                  >
                    {loading ? <LoaderIcon className='animate-spin' /> : "Save"}
                    </Button>
                </div>

                </form>
                
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddNewStudent