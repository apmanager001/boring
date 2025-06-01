import React from "react";
import { ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { SocialIcon } from "react-social-icons";

const WinAlert = ({ onCancel, score }) => {
  const playAgain = () => {
    window.location.reload();
  };

  const submitScore = async () => {
    // You'll need to implement your actual API call here
    try {
      // Example: await api.submitScore(score);
      toast.success("Score submitted to leaderboard!");
    } catch (error) {
      alert("Failed to submit score");
    }
  };

  const shareOnSocial = (platform) => {
    const message = `I just scored ${score} seconds in Acornsweeper! Can you beat my score?`;
    const url = window.location.href;

    switch (platform) {
      case "x":
        window.open(
          `https://x.com/intent/tweet?text=${encodeURIComponent(
            message
          )}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/share.php?u=${encodeURIComponent(
            url
          )}&quote=${encodeURIComponent(message)}`,
          "_blank"
        );
        break;
      case "threads":
        // Threads uses the Instagram domain for sharing
        window.open(
          `https://www.threads.net/intent/post?text=${encodeURIComponent(
            `${message} ${url}`
          )}`,
          "_blank"
        );
        break;
      case "bluesky":
        window.open(
          `https://bsky.app/intent/compose?text=${encodeURIComponent(
            `${message} ${url}`
          )}`,
          "_blank"
        );
        break;
      default:
        break;
    }
  };

  const copyToClipboard = () => {
    const text = `I scored ${score} in Acorn Finder! ${window.location.href}`;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div
      role="alert"
      className="alert fixed top-52 left-1/2 transform -translate-x-1/2 mt-4 w-3/4 max-w-md shadow-2xl p-6 rounded-2xl z-50 border border-red-200 bg-white dark:bg-gray-800"
    >
      <div className="w-full text-center">
        <ShieldCheck className="h-12 w-12 mx-auto text-green-500" />
        <h3 className="text-lg font-bold mt-2">Congratulations!</h3>
        <p className="py-2 flex flex-col">
          Your time: <span className="font-bold">{score} Seconds</span>
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <button className="btn btn-primary w-full" onClick={submitScore}>
          Submit to Leaderboard
        </button>

        <div className="divider">OR</div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-center mb-2">Share your score:</p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => shareOnSocial("x")}
              className="btn btn-circle btn-sm p-0 bg-transparent hover:bg-transparent border-none"
            >
              <SocialIcon
                network="x"
                style={{ height: 32, width: 32 }}
                target="_blank"
              />
            </button>
            <button
              onClick={() => shareOnSocial("facebook")}
              className="btn btn-circle btn-sm p-0 bg-transparent hover:bg-transparent border-none"
            >
              <SocialIcon
                network="facebook"
                style={{ height: 32, width: 32 }}
                target="_blank"
              />
            </button>
            <button
              onClick={() => shareOnSocial("threads")}
              className="btn btn-circle btn-sm p-0 bg-transparent hover:bg-transparent border-none"
            >
              <SocialIcon
                network="threads"
                style={{ height: 32, width: 32 }}
                target="_blank"
              />
            </button>
            <button
              onClick={() => shareOnSocial("bluesky")}
              className="btn btn-circle btn-sm p-0 bg-transparent hover:bg-transparent border-none"
            >
              <SocialIcon
                network="bsky.app"
                style={{ height: 32, width: 32 }}
                target="_blank"
              />
            </button>
            <button
              onClick={copyToClipboard}
              className="btn btn-circle btn-sm"
              title="Copy link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="divider">OR</div>

        <div className="flex gap-2 justify-center">
          <button
            className="btn btn-sm border border-gray-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="btn btn-sm btn-success" onClick={playAgain}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinAlert;
