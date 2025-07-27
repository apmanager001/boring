"use client";
import React from "react";
import useStore from "../../app/store/store";

const StoreDebugger = () => {
  const { user, loading, error, initialized } = useStore();

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-xs z-50">
      <h3 className="font-bold mb-2">Store Debug Info:</h3>
      <div className="space-y-1">
        <div>
          User: {user ? `Logged in (${user.username})` : "Not logged in"}
        </div>
        <div>Loading: {loading ? "Yes" : "No"}</div>
        <div>Initialized: {initialized ? "Yes" : "No"}</div>
        <div>Error: {error || "None"}</div>
      </div>
    </div>
  );
};

export default StoreDebugger;
