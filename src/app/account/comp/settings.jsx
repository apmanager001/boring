'use client'
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from '../../../components/utility/axios'

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [memberSince, setMemberSince] = useState("");
  const [theme, setTheme] = useState("");

  useEffect(()=>{
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/profile");
        setUsername(response.data.username);
        setEmail(response.data.email);
        setBio(response.data.bio || "")
        setMemberSince(response.data.createdAt);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  },[])

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put("/profile", {
        username,
        email,
        password,
        bio
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-base-200 min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="md:p-6 bg-base-100 md:bg-base-200 min-h-screen">
      <form
        onSubmit={handleUpdate}
        className="max-w-lg mx-auto bg-base-100 md:shadow-lg md:rounded-lg p-6 md:border border-1px border-gray-500"
      >
        <div className="form-control mb-4">
          <h1 className="text-3xl font-bold text-center">Settings</h1>
          {memberSince ? (
            <label className="label flex justify-center w-full">
              <span className="label-text text-slate-600">
                Member Since: {memberSince}
              </span>
            </label>
          ) : (
            ""
          )}
        </div>
        <div className="mx-10 flex flex-col items-center">
          <div className="form-control mb-4 flex flex-col w-72">
            <label className="label">
              <span className="label-text">Username:</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-4 flex flex-col w-72">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-4 flex flex-col w-72">
            <label className="label">
              <span className="label-text">Password:</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-4 flex flex-col w-72">
            <label className="label">
              <span className="label-text">Bio:</span>
            </label>
            <textarea
              placeholder={bio || "Tell us about yourself..."}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="textarea textarea-bordered"
            />
          </div>
          <div className=" flex items-center mb-4">
            <label className="label">
              <span className="label-text">Dark Mode:</span>
            </label>
            <input
              type="checkbox"
              defaultChecked
              className="toggle toggle-lg ml-4"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-soft btn-primary w-full mt-4">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Settings;
