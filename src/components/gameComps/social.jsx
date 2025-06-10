'use client'
import React, {useEffect, useState} from "react";
import { Link, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { SocialIcon } from "react-social-icons";

const SharedButtons = ({ game }) => {
  const { id } = useParams();

  const [link, setLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLink(encodeURI(window.location.href));
    }
  }, []);

  const msg = encodeURIComponent("Check out this awesome game I played!");
  const shareTitle = encodeURIComponent(game);

  function copyURL() {
    if (typeof window !== "undefined" && navigator.clipboard) {
      const url = window.location.href;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast.success("URL Copied!");
        })
        .catch(() => {
          toast.error("Failed to copy the URL");
        });
    }
  }
  

  return (
    <div
      className="flex items-center justify-end w-full my-2 md:max-w-[90%] lg:max-w-[75%]"
    >
      {/* <Share2 /> */}
      <div
        className="tooltip tooltip-bottom rounded-full h-[35px] w-[35px] hover:bg-base-100 flex justify-center items-center cursor-pointer"
        data-tip="Click to Copy URL"
        onClick={copyURL}
      >
        <Link />
      </div>
      <div className="flex justify-between items-center gap-2 lg:gap-4 text-2xl p-2 bg-slate-600 rounded-xl">
        <div className="tooltip tooltip-bottom" data-tip="Share to Threads">
          <SocialIcon
            network="threads"
            style={{ height: 35, width: 35 }}
            url={`https://threads.net/intent/post?text=${msg}%20${link}`}
            target="_blank"
          />
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Share to Facebook">
          <SocialIcon
            network="facebook"
            style={{ height: 35, width: 35 }}
            url={`https://www.facebook.com/share.php?u=${link}`}
            target="_blank"
          />
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Share to Reddit">
          <SocialIcon
            network="reddit"
            style={{ height: 35, width: 35 }}
            url={`http://www.reddit.com/submit?url=${link}&title=${game}&text=${msg}`}
            target="_blank"
          />
        </div>
        {/* <div className="tooltip tooltip-bottom" data-tip="Share to BlueSky">
          <SocialIcon
            network="bsky.app"
            style={{ height: 35, width: 35 }}
            url={`https://bsky.app/intent/compose?text=${msg}%20${game}%20${link}`}
            target="_blank"
          />
        </div> */}
        <div className="tooltip tooltip-left" data-tip="Share to X">
          <SocialIcon
            network="x"
            style={{ height: 35, width: 35 }}
            url={`https://x.com/share?&text=${msg}&url=${link}`}
            target="_blank"
          />
        </div>
      </div>
    </div>
  );
};

export default SharedButtons;
