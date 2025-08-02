"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Google from "./google";
import { Eye } from "lucide-react";
import { useLogin } from "../../../hooks/useAuth";

const Login = () => {
  const [name, setName] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [data, setData] = useState({
    name: "",
    password: "",
  });

  const loginMutation = useLogin();

  const loginUser = async (e) => {
    e.preventDefault();
    const { name, password } = data;

    try {
      console.log("Login attempt with username:", name);
      const result = await loginMutation.mutateAsync({
        username: name,
        password,
      });

      if (result.user) {
        setData({});
        toast.success("Login Successful");
        console.log("Login successful, redirecting to account page");
        window.location.href = "/account";
      } else {
        toast.error("Login failed - no user data received");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  const handleChangePassword = () => {
    // This would need to be updated to use the store as well
    // For now, keeping the original implementation
    const axiosInstance = require("../../../components/utility/axios").default;

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

  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <section className="md:py-28 flex box-border justify-center items-center bg-base-100 md:bg-base-200">
      <div className="bg-base-100 md:shadow-lg md:rounded-lg p-6 md:border border-1px border-neutral flex max-w-3xl items-center">
        <div className="md:w-1/2 p-8">
          <h2 className="font-bold text-3xl text-gray-500">Login</h2>

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
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
              />
            </div>

            <div className="relative">
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
                  className="input input-bordered w-full pr-10"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  required
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

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-4">
            <button
              onClick={handleChangePassword}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot Password?
            </button>
          </div>

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
              <Google />
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2 p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Welcome Back!
            </h3>
            <p className="text-gray-600 mb-6">
              Sign in to your account to continue playing your favorite games
              and track your progress.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Access to all games
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Track your scores</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Compete with friends
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
