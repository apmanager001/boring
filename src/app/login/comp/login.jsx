'use client'
import React from 'react'
import Google from './google';
import { Eye } from 'lucide-react';

const Login = () => {
  return (
    <section className="my-28 flex box-border justify-center items-center">
      <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-primary">Login</h2>
          <p className="text-sm mt-4 text-primary">Easily log in now.</p>

          <form action="" className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="relative">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <a
                  href="/forgotpassword"
                  className="text-xs font-bold text-accent hover:text-secondary"
                >
                  Forget Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
                />
                <Eye
                  size={24}
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
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
          <div className="mt-6  items-center text-gray-100">
            <hr className="border-gray-300" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-300" />
          </div>
          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-gray-200 font-medium">
            <Google />
            Login with Google
          </button>

          <div className="mt-4 text-sm text-white flex justify-between items-center ">
            <p className="mr-3 md:mr-0 ">If you don't have an account..</p>
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