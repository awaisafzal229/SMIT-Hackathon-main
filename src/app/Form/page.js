"use client"
import React from 'react';
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from 'next/link';

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // Your form submission logic here
    try {
      // Add data to Firestore or perform any other actions
      await addDoc(collection(db, "students"), data);
      console.log("Form submitted successfully!");

      // Clear the form or show a success message
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error submitting form:", error);
    }
  };

  return (
<>
    <nav className="bg-blue-500 p-4">
  <div className="container mx-auto flex justify-between items-center">
    <Link  href="/">
    <h1 className="text-2xl text-white font-bold">Student Management System</h1>
    </Link>
    
    <div className="space-x-4 flex">
      <Link href="/StudentsData">
        <p className="text-white hover:text-blue-200">Students Data</p>
      </Link>
      <Link href="/CourseData">
        <p className="text-white hover:text-blue-200">Courses Data</p>
      </Link>
      <Link href="/StudentRegistration">
        <p className="text-white hover:text-blue-200">Students Registration</p>
      </Link>
      <Link href="/CourseRegistration">
        <p className="text-white hover:text-blue-200">Course   Registration</p>
      </Link>
    </div>
  </div>
</nav>


    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Student Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-600">Name</label>
          <input
            type="text"
            id="name"
            {...register("name", )}
            className="border border-gray-300 rounded p-2"
          />
          {errors.name && <span className="text-red-500">Name is required</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", )}
            className="border border-gray-300 rounded p-2"
          />
          {errors.email && <span className="text-red-500">Email is required</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="course" className="text-gray-600">Course</label>
          <input
            type="text"
            id="course"
            {...register("course", )}
            className="border border-gray-300 rounded p-2"
          />
          {errors.course && <span className="text-red-500">Course is required</span>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button><br /><hr />
      </form>
    </div>
    </>
  );
}

export default Form;
