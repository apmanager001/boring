'use client'
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../components/utility/axios";
import Link from "next/link";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="font-semibold mb-4 badge badge-outline p-4">Users:<p>{users.length}</p></h2>
      
      <div className="flex flex-wrap gap-4">
        {users.map((user) => (
          <Link
            href={`/profile/${user.id}`} 
            key={user.id}
            className="border border-gray-300 p-4 rounded shadow-sm w-full sm:w-1/2 md:w-1/3"
          >
            <p>
            <strong>ID:</strong> {user.id}
            </p>
            <p>
            <strong>Username:</strong> {user.username}
            </p>
            <p>
            <strong>Bio:</strong> {user.bio}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UsersAdmin;
