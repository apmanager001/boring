'use client'
import React, {useEffect, useState} from 'react'

import Link from "next/link";
import axiosInstance from '../../../components/utility/axios';
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';

import Google from './google';
import { Eye } from 'lucide-react';

const Login = () => {
  const [name, setName] = useState("");
  const [hidePassword, setHidePassword] = useState(true)
  const [data, setData] = useState({
    name: "",
    password: "",
  });
  const handleGoogleLogin =()=>{
    const url = process.env.NEXT_PUBLIC_API_URL
    window.location.href = `${url}/google`;
  }
  const loginUser = async (e) => {
    e.preventDefault();
    const { name, password } = data;
    try {
      const response = await axiosInstance.post("/login", { username:name, password });

      if (response.data.error) {
        console.error(response.data.error);
        toast.error(response.data.error);
      } else {
        setData({});
        toast.success("Login Successful");
        window.location.href = "/account";
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Incorrect username/email or password");
      } else {
        toast.error("Login failed");
      }
    }
  };

  const handleChangePassword = () => {
    axiosInstance
      .post("/resetpassword", {
        name,
      })
      .then((response) => {
        toast.success(
          "An email has been sent, click the link in the email to reset your password"
        );
        setName("");
      })
      .catch((error) => {
        console.error("There was an error changing the password", error);
        if (error.response && error.response.status === 403) {
          toast.error(
            "Your email hasnt been verified yet, reach out to us by the contact form on the home page to reset your password."
          );
        } else if (error.response && error.response.status === 404) {
          toast.error("We havent found an account with that email or username");
        } else {
          toast.error("Unable to send a reset password email");
        }
      });
  };

  const handleHidePassword =()=> {
    setHidePassword(!hidePassword)
  }
  return (
    <section className="my-28 flex box-border justify-center items-center">
      <div className="bg-base-300 rounded-2xl flex max-w-3xl p-5 items-center hover:shadow-2xl">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-primary">Login</h2>

          <form onSubmit={loginUser} className="flex flex-col gap-4 mt-4">
            <div className="relative">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Username
                </label>
              </div>
              <input
                type="text"
                id="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Username"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
                autoComplete="false"
              />
            </div>
            <div className="relative">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs font-bold link text-accent hover:text-secondary"
                  onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                  }
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={hidePassword ? "password" : "text"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  required
                />
                <Eye
                  size={24}
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
                  onClick={handleHidePassword}
                />
              </div>
            </div>
            <button
              className="btn btn-primary py-2 rounded-xl hover:scale-105 duration-300 text-lg"
              type="submit"
            >
              Login
            </button>
          </form>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box flex flex-col gap-6 rounded-box bg-base-200 p-6 max-w-md text-center">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h1 className="text-2xl font-bold">Forgot password?</h1>

              <span className="flex flex-col"></span>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  className="input input-bordered"
                  type="text"
                  value={name}
                  name="name"
                  placeholder="Email or Username"
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="false"
                />
              </label>
              <input
                type="submit"
                className="btn btn-primary ml-4"
                value="Send Email"
                onClick={handleChangePassword}
              />
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <div className="mt-6  items-center text-gray-100">
            <div className="divider">OR</div>
          </div>
          <button
            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-gray-200 font-medium"
            // onClick={() => signIn("google")}
            onClick={handleGoogleLogin}
          >
            <Google />
            Login with Google
          </button>
          <div className="mt-4 text-sm text-white flex justify-between items-center ">
            <p className="mr-3 md:mr-0 ">If you don't have an account yet..</p>
            <a href="/signup">
              <button className=" btn btn-primary btn-sm rounded-xl py-2 px-5 hover:scale-110 font-semibold duration-300">
                Register
              </button>
            </a>
          </div>
        </div>
        <div className="md:block hidden w-1/2 h-80 mx-auto overflow-hidden rounded-2xl">
          <img
            className=" max-h-[1600px] object-cover transform scale-175 "
            loading="lazy"
            src="https://images.unsplash.com/photo-1518770352423-dce09a3d3307?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="login form image"
          />
        </div>
      </div>
    </section>
  );
}

export default Login