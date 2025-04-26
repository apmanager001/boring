import React from "react";
import { UserCircle } from "lucide-react";

const Profile = ({
  username = "Placeholder User",
  memberSince = "January 2020",
  bio = "This is a sample bio about the user.",
  gamesPlayed = 0,
  highestRank = "Unranked",
}) => {
  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="max-w-lg mx-auto bg-base-100 shadow-xl rounded-lg p-6">
        <div className="text-center">
          <UserCircle className="w-24 h-24 mx-auto text-primary" />
          <h1 className="text-2xl font-bold mt-4">{username}</h1>
          <p className="text-sm text-gray-500">Member Since: {memberSince}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Bio:</h2>
          <p className="text-gray-700">{bio}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Stats:</h2>
          <ul className="list-none">
            <li>
              <span className="font-semibold">Games Played:</span> {gamesPlayed}
            </li>
            <li>
              <span className="font-semibold">Highest Rank:</span> {highestRank}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
