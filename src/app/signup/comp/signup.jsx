"use client";
import React, { useState } from "react";
import axiosInstance from "../../../components/utility/axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Eye } from "lucide-react";
import Google from "../../login/comp/google";
import { useGoogleAuth } from "../../../hooks/useAuth";

const Signup = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword2, setHidePassword2] = useState(true);
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
    <section className="md:py-24 flex box-border justify-center items-center bg-base-100 md:bg-base-200">
      <div className="bg-base-100 md:shadow-lg md:rounded-lg md:p-6 md:border border-1px border-neutral flex max-w-4xl items-center">
        <div className="md:w-1/2 p-8">
          <h2 className="font-bold text-3xl text-gray-500">Register</h2>

          <form onSubmit={registerUser} className="flex flex-col gap-4 mt-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="input input-bordered w-full"
                placeholder="Username"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                required
                autoComplete="username"
                minLength={3}
                maxLength={20}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={hidePassword ? "password" : "text"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full pr-10"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={handleHidePassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Eye className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="password2"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={hidePassword2 ? "password" : "text"}
                  id="password2"
                  name="password2"
                  placeholder="Confirm Password"
                  className="input input-bordered w-full pr-10"
                  value={data.password2}
                  onChange={(e) =>
                    setData({ ...data, password2: e.target.value })
                  }
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={handleHidePassword2}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Eye className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            <button className="btn btn-primary w-full" type="submit">
              Register
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-base-100 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Google context="signup" />
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-800">
                Login
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2 p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold  mb-4">
              Join Boring Squirrel!
            </h3>
            <p className="text-gray-600 mb-6">
              Create an account to start playing games, track your progress, and
              compete with friends.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Free access to all games
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Save your progress
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Compete on leaderboards
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
