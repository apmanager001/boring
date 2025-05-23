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
    <div className="md:p-20 bg-base-100 md:bg-base-200 min-h-screen">
      <div className=" flex flex-col md:flex-row w-full max-w-[900px] h-full md:h-[500px]  mx-auto bg-base-100 md:shadow-lg md:rounded-lg md:border border-1px border-neutral">
        <div className="flex flex-col items-center text-center md:w-1/3 p-6">
          <UserCircle className="w-24 h-24 mx-auto text-primary" />
          <h1 className="text-2xl font-bold mt-4">{username}</h1>
          <p className="text-sm text-gray-500">Member Since: {memberSince}</p>
          <p className="text-2xl font-bold pt-6">Badges</p>
        </div>
        <div className="divider md:divider-horizontal"></div>
        <div className="flex flex-col items-start md:w-2/3 p-6">
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Bio:</h2>
            <p className="text-gray-500">{bio}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Games Played:</h2>
            <p className="text-gray-500">Acorn Sweeper, Tik Tak Toe</p>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Stats:</h2>
            <ul className="list-none text-gray-500">
              <li>
                <span className="font-semibold">Games Played:</span>{" "}
                {gamesPlayed}
              </li>
              <li>
                <span className="font-semibold">Highest Rank:</span>{" "}
                {highestRank}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
