"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from '../../../components/utility/axios'
import { X, Check } from "lucide-react";

const IndependentSubmit = () => {
  const [formData, setFormData] = useState({
    gameName: "",
    description: "",
    imageUrl: "",
    tag1: "",
    tag2: "",
    tag3: "",
    category: "",
    linkUrl: "",
    email: "",
    additionalInfo: "",
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/independentgame", formData);

      if (response.status === 200 || response.status === 201) {
        toast.success("Your Submission was successful");
      } else {
        toast.error("Submission failed, please try again");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Error submitting form. Please try again later.");
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:m-10">
      <div className="w-full md:w-1/2 p-6 flex-1 max-w-[500px]">
        <h2 className="text-2xl font-bold text-center mb-4">
          Submit Your Game
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="form-control">
            <span className="label-text">Game Name:</span>
            <input
              type="text"
              name="gameName"
              value={formData.gameName}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              autoComplete="false"
            />
          </label>

          <label className="form-control">
            <span className="label-text">Description:</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="textarea textarea-bordered w-full"
            />
          </label>

          <label className="form-control">
            <span className="label-text">Image URL:</span>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control">
            <span className="label-text">Tags (max 3):</span>
            <div className="flex gap-2">
              <input
                type="text"
                name="tag1"
                value={formData.tag1}
                onChange={handleChange}
                placeholder="Tag 1"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="tag2"
                value={formData.tag2}
                onChange={handleChange}
                placeholder="Tag 2"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="tag3"
                value={formData.tag3}
                onChange={handleChange}
                placeholder="Tag 3"
                className="input input-bordered w-full"
              />
            </div>
          </label>

          <label className="form-control">
            <span className="label-text">Category:</span>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control">
            <span className="label-text">Link URL:</span>
            <input
              type="url"
              name="linkUrl"
              value={formData.linkUrl}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control">
            <span className="label-text">Email:</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control">
            <span className="label-text">Additional Info:</span>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              required
              className="textarea textarea-bordered w-full"
            />
          </label>

          <button type="submit" className="btn btn-soft btn-primary w-full">
            Submit
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2  p-0 md:p-6 flex-1 max-w-[800px] pb-24 md:pb-0">
        <h2 className="text-2xl font-bold text-center mb-4">
          Why Submit Your Game?
        </h2>

        <p className="text-gray-500 text-lg mx-10">
          Our platform is dedicated to **supporting independent game
          developers** by showcasing their creations to a wider audience. By
          submitting your game, you'll be part of a thriving community that
          values **creativity, innovation, and collaboration**. We actively
          **promote developers and their work**, ensuring **organic exposure**
          to players and fellow creators.
        </p>

        <p className="text-gray-500 text-lg mt-4 mx-10">
          Whether you're launching your first title or expanding your brand, our
          submission process provides **an easy way to link your game to our
          network**. We help drive **traffic, engagement, and recognition** for
          your project.
        </p>

        <div className="mt-6 mx-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Submission Guidelines
          </h3>

          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-2 text-red-500">
              <X color="red" /> No NSFW or offensive content
            </span>
            <span className="flex items-center gap-2 text-red-500">
              <X color="red" /> No plagiarized or stolen assets
            </span>
            <span className="flex items-center gap-2 text-green-500">
              <Check color="green" /> Only original and legally owned games
            </span>
            <span className="flex items-center gap-2 text-green-500">
              <Check color="green" /> Games should have a playable demo or full
              version
            </span>
            <span className="flex items-center gap-2 text-green-500">
              <Check color="green" /> Provide an accurate game description &
              images
            </span>
          </div>
        </div>
        <p className="text-gray-500 text-lg mt-6 mx-10">
          **Interested in hosting your game on our site?** We'd love to hear
          from you! Reach out to us at
          <a
            href="mailto:contact@boringsquirrel.com"
            className="text-gray-100 underline pl-2"
          >
            contact@boringsquirrel.com
          </a>{" "}
          to get started.
        </p>
      </div>
    </div>
  );
};

export default IndependentSubmit;
