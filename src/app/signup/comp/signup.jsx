import React from 'react'
import { Eye } from 'lucide-react';
import Google from '../../login/comp/google';

const Signup = () => {
  return (
    <section className="my-24 flex box-border justify-center items-center">
      <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-primary">Register</h2>
          <p className="text-sm mt-4 text-primary">Easily register now.</p>

          <form action="" className="flex flex-col gap-1">
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
                name="email"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
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
                type="username"
                name="username"
                placeholder="Username"
                className="input input-bordered w-full max-w-xs"
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
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold "
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                    type="password"
                    name="password2"
                    placeholder="Repeat Password"
                    className="input input-bordered w-full max-w-xs"
                />
                <Eye
                    size={24}
                    className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
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
            <hr className="border-gray-300" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-300" />
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