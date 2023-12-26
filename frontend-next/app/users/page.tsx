"use client"

import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { UserRegister } from "@/types/user";
import API_URL from "../config/api.ts"


const UserPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>()

  const onSubmit: SubmitHandler<UserRegister> = async(data: UserRegister) => {
      console.log(data);
      let headers = {}
      var response = await axios.post(
            `${API_URL}/register/`,
            data,
            {headers: headers}
      )

      if(response.status == 201){
        toast.success("User added", {
            position: toast.POSITION.TOP_RIGHT
          });
      }else{
        toast.error(response.data, {
            position: toast.POSITION.TOP_RIGHT
          });
      }
      console.log(response);
      console.log(response.data);

  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="text-2xl font-bold mb-4">User Registration</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 text-sm font-semibold mb-2">
            Email:
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600 text-sm font-semibold mb-2">
            Password:
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="first_name" className="block text-gray-600 text-sm font-semibold mb-2">
            First Name:
          </label>
          <input
            {...register("first_name")}
            type="text"
            id="first_name"
            name="first_name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="last_name" className="block text-gray-600 text-sm font-semibold mb-2">
            Last Name:
          </label>
          <input
            {...register("last_name")}
            type="text"
            id="last_name"
            name="last_name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default UserPage;
