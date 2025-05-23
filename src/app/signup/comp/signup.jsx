'use client'
import React, {useState} from 'react'
import axiosInstance from '../../../components/utility/axios';
import Link from 'next/link';
import {toast} from 'react-hot-toast';
import { Eye } from 'lucide-react';
import Google from '../../login/comp/google';

const Signup = () => {
  const [hidePassword, setHidePassword] = useState(true)
  const [hidePassword2, setHidePassword2] = useState(true)
  const [data, setData] = useState({
    email: "",
    password: "",
    password2: "",
    username: "",
  });

  const [value, setValue] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    const { email, password, password2, username } = data;

    //check to make sure passwords match
    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axiosInstance.post("/register", {
        email,
        password,
        username,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        setValue({});
        toast.success("Register Successful. Welcome!");
        window.location.href = "/login";
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Username or email already exists");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  };
  const handleHidePassword2 = () => {
    setHidePassword2(!hidePassword2);
  };
  return (
    <section className="my-24 flex box-border justify-center items-center">
      <div className="bg-base-300 rounded-2xl flex max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-primary">Register</h2>

          <form onSubmit={registerUser} className="flex flex-col gap-1 mt-4">
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold"
                >
                  Email
                </label>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
                autoComplete="true"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold"
                >
                  Username
                </label>
              </div>
              <input
                type="text"
                id="username"
                name="username"
                className="input input-bordered w-full"
                placeholder="Username"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                required
                autoComplete="false"
                minLength={6}
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold"
                >
                  Password
                </label>
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
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer opacity-100"
                  onClick={handleHidePassword}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password2"
                  className="block text-gray-700 text-sm font-bold "
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={hidePassword2 ? "password" : "text"}
                  id="password2"
                  name="password2"
                  placeholder="Confirm Password"
                  className="input input-bordered w-full"
                  value={data.password2}
                  onChange={(e) =>
                    setData({ ...data, password2: e.target.value })
                  }
                  required
                />
                <Eye
                  size={24}
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer opacity-100"
                  onClick={handleHidePassword2}
                />
              </div>
            </div>
            <button
              className="btn btn-primary py-2 mt-2 rounded-xl hover:scale-105 duration-300 text-lg"
              type="submit"
            >
              Register
            </button>
          </form>
          <div className="mt-6  items-center text-gray-100">
            <div className="divider">OR</div>
          </div>
          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-gray-200 font-medium">
            <Google />
            Signup with Google
          </button>
          <div className="mt-4 text-sm flex justify-between items-center container-mr">
            <p className="mr-3 md:mr-0 text-white">
              If you already have an account..
            </p>
            <a href="/login">
              <button className=" btn btn-primary btn-sm rounded-xl py-2 px-5 hover:scale-110 font-semibold duration-300">
                Login
              </button>
            </a>
          </div>
        </div>
        <div className="md:block hidden w-1/2 h-80 mx-auto overflow-hidden rounded-2xl">
          <img
            className="rounded-2xl max-h-[1600px] object-cover transform scale-200 "
            loading="lazy"
            src="https://images.unsplash.com/photo-1504006833117-8886a355efbf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="login form image"
          />
        </div>
      </div>
    </section>
  );
}

export default Signup