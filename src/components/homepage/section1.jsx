import React from 'react'

const Section1 = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1697753594107-3afb13b02629?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md bg-base-200 p-4 rounded-2xl shadow-2xl shadow-base-300">
          <h1 className="mb-5 text-5xl font-bold">Like Boring Games?</h1>
          <p className="mb-5">
            This is a project we am working on to make games hopefully people
            enjoy. If there is any feedback, let us know. Currently a solo game
            but will be adding games to play against each other.
          </p>
          {/* <button className="btn btn-primary">Contact Us</button> */}
        </div>
      </div>
    </div>
  );
}

export default Section1