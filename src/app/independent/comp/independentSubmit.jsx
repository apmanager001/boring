"use client";
import React, { useState } from "react";
import { X, Check } from "lucide-react";

const IndependentSubmit = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    tags: ["", "", ""],
    category: "",
    linkUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (index, value) => {
    const updatedTags = [...formData.tags];
    updatedTags[index] = value;
    setFormData((prev) => ({ ...prev, tags: updatedTags }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // You can send this data to your backend here
  };

  return (
    <div className="flex flex-col md:flex-row md:m-10 gap-4">
      <div className="w-1/2 mx-auto p-6 flex-1">
        <h2 className="text-2xl font-bold text-center mb-4">
          Submit Your Game
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="form-control">
            <span className="label-text">Game Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
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
              {formData.tags.map((tag, index) => (
                <input
                  key={index}
                  name={index}
                  type="text"
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  placeholder={`Tag ${index + 1}`}
                  className="input input-bordered w-full"
                />
              ))}
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

          <button type="submit" className="btn btn-soft btn-primary w-full">
            Submit
          </button>
        </form>
      </div>
      <div className="w-1/2 p-6 flex-1">
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
