'use client'
import React, {useState} from 'react'
import axiosInstance from './utility/axios';
import toast from 'react-hot-toast';

const Newsletter = () => {
    const [address, setAddress] = useState("");

    const validateEmail = (address) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(address);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateEmail(address)) {
          toast.error("Your email is not in the correct formata");
          return;
        }

        try {
            const response = await axiosInstance.post("/newsletter", {
              address
            });
            toast.success("Subscription successful!");
        } catch (error) {
            if (error.response) {
            const status = error.response.status;
            if (status === 400) {
                toast.error("Your email is not in the correct format");
            } else if (status === 409) {
                toast.error("This email has already been submitted");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
            } else {
            toast.error("Network error. Please check your connection.");
            }
        }
    };
console.log(address)
  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 rounded-lg ">
        <div className="w-full">
          <label htmlFor="emails" className="sr-only">
            Subscribe
          </label>
          <input
            type="email"
            id="emails"
            name="emails"
            className="input input-bordered block w-full rounded-lg text-sm"
            placeholder="Enter your email"
            autoComplete="true"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          className="w-full sm:w-auto hover:scale-110 whitespace-nowrap p-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent btn btn-primary  disabled:pointer-events-none"
          type="submit"
        >
          Subscribe
        </button>
      </div>
      {/* <p className="mt-3 text-sm text-gray-400">
                New UI kits or big discounts. Never spam.
              </p> */}
    </form>
  );
}

export default Newsletter