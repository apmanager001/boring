'use client'
import React, { useState } from "react";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", { username, email, password });
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Profile Settings</h1>
      <form
        onSubmit={handleUpdate}
        className="max-w-lg mx-auto bg-base-100 shadow-xl rounded-lg p-6"
      >
        <div className="form-control mb-4">
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
        <div className="form-control mb-4">
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
        <div className="form-control mb-4">
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
        <button type="submit" className="btn btn-primary w-full mt-4">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Settings;
