"use client";
import React, { useState } from "react";
import {
  Users,
  ArrowLeftToLine,
  ArrowRightToLine,
  Gamepad2,
  Mails,
} from "lucide-react";
import Admin from "./admin";
import NewsletterAdmin from "./newsletterAdmin";
import UsersAdmin from "./usersAdmin";



const AdminParent = () => {
  const [activeTab, setActiveTab] = useState("Independent Games");
  const [collapsed, setCollapsed] = useState(false);

  const tabs = [
    { name: "Independent Games", icon: <Gamepad2 size={20} /> },
    { name: "Newsletter", icon: <Mails size={20} /> },
    { name: "Users", icon: <Users size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Independent Games":
        return <Admin />;
      case "Newsletter":
        return <NewsletterAdmin />;
      case "Users":
        return <UsersAdmin />;
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      <div
        className={`bg-base-300 transition-all duration-300 ease-in-out overflow-hidden ${
          collapsed ? "w-14" : "w-44"
        } flex flex-col items-center py-4 shadow-md`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-6 hover:bg-base-300 rounded p-2 transition cursor-pointer"
          title="Toggle Sidebar"
        >
          {collapsed ? <ArrowRightToLine /> : <ArrowLeftToLine />}
        </button>

        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center w-full px-4 py-2 text-left hover:bg-base-300 transition cursor-pointer ${
              activeTab === tab.name ? "bg-base-300 font-bold" : ""
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {!collapsed && <span>{tab.name}</span>}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex justify-center px-6 py-8 w-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminParent;
