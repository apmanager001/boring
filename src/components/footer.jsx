import React from 'react'
import Newsletter from './newsletter'
import { Home, Gamepad2, ClipboardList, Menu } from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="hidden md:block mt-auto bg-base-200 w-full z-10">
        <div className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <div className="col-span-full lg:col-span-1">
              <a
                className="flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80"
                href="#"
                aria-label="Brand"
              >
                Boring Games
              </a>
            </div>

            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100">Games</h4>

              <div className="mt-3 grid space-y-3">
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="/games/acornsweeper"
                  >
                    Acornsweeper
                  </a>
                </p>
                {/* <p><a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Changelog</a></p>
            <p><a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Docs</a></p> */}
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100">About Us</h4>

              <div className="mt-3 grid space-y-3">
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    href="/about"
                  >
                    About us
                  </a>
                </p>
                {/* <p><a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Blog</a></p>
            <p><a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Careers</a> <span className="inline-block ms-1 text-xs bg-blue-700 text-white py-1 px-2 rounded-lg">We're hiring</span></p>
            <p><a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Customers</a></p> */}
              </div>
            </div>

            <div className="col-span-2">
              <h4 className="font-semibold text-gray-100">
                Get Updates on New Games:
              </h4>

              <Newsletter />
            </div>
          </div>

          <div className="mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400 dark:text-neutral-400">
                © 2025 Boring Squirrel.
              </p>
            </div>

            <div>Socials</div>
          </div>
        </div>
      </footer>
      <footer className="block md:hidden fixed bottom-0 left-0 right-0 bg-base-200 p-4">
        <div className="flex justify-around">
          <a href="/" className="text-gray-400 hover:text-gray-200">
            <Home size={24} />
          </a>
          <a href="/games" className="text-gray-400 hover:text-gray-200">
            <Gamepad2 size={24} />
          </a>
          <a href="/leaderboard" className="text-gray-400 hover:text-gray-200">
            <ClipboardList  size={24}/>
          </a>
          <a href="/about" className="text-gray-400 hover:text-gray-200">
            <Menu size={24} />
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer