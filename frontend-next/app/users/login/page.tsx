"use client"

import React from 'react';
import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { UserLogin } from "@/types/user";
import API_URL from "../../config/api.ts"


const UserLoginPage = () => {

  const toastId = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>()

  const onSubmit: SubmitHandler<UserLogin> = async(data: UserLogin) => {
      console.log(data);
      let headers = {}
      try{
        var response = await axios.post(
              `${API_URL}/token/`,
              data,
              {headers: headers}
        );

        toast.success("User Login", {
                position: toast.POSITION.TOP_RIGHT
              });
        alert(JSON.stringify(response.data))
      }catch(error){
        console.log("here")
        console.log(error)
        alert(JSON.stringify(error.response.data))
        toast("eioeoioei")
        
         toast.error(error, {
              position: toast.POSITION.TOP_RIGHT
            });
      }

      

  }

  return (
    <>
    <ToastContainer />

    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="text-2xl font-bold mb-4">User Login</h2>

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

       
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </button>
      </form>
    </div>
    </>
  );
};

export default UserLoginPage;
