import React from 'react'
import Link from 'next/link';
import Newsletter from './newsletter'
import { gameLinks, kidLinks } from './headerComps/headerLinks';
import { Home, Gamepad2, ClipboardList, Menu } from "lucide-react";
import FooterDrawer from './footerDrawer'

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
                Boring Squirrel
              </a>
            </div>

            <div className="col-span-1">
              <div className="mt-3 grid space-y-3">
                <ul className="flex flex-col gap-y-2 text-gray-400 ">
                  {gameLinks.map((link) => (
                    <ol key={link.name}>
                      <Link
                        href={link.link}
                        className="hover:text-gray-200 hover:underline"
                      >
                        {link.name}
                      </Link>
                    </ol>
                  ))}
                  {kidLinks.map((link) => (
                    <ol key={link.name}>
                      <Link
                        href={link.link}
                        className="hover:text-gray-200 hover:underline"
                      >
                        {link.name}
                      </Link>
                    </ol>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-span-1">
              <div className="mt-3 grid space-y-3 text-gray-400">
                <p>
                  <Link
                    className="hover:text-gray-200 hover:underline"
                    href="/about"
                  >
                    About us
                  </Link>
                </p>
                <p>
                  <Link
                    className="hover:text-gray-200 hover:underline"
                    href="/independent"
                  >
                    Game Devs
                  </Link>
                </p>
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

            <div className="underline">
              <a href="mailto:contact@boringsquirrel.com">
                contact@boringsquirrel.com
              </a>
            </div>
          </div>
        </div>
      </footer>
      <footer className="block md:hidden fixed bottom-0 left-0 right-0 bg-base-200 p-2 w-full">
        <div className="flex justify-around items-center">
          <a
            href="/"
            className="text-gray-400 hover:text-gray-200"
            aria-label="Home"
          >
            <Home size={36} />
          </a>
          <a
            href="/games"
            className="text-gray-400 hover:text-gray-200"
            aria-label="Games"
          >
            <Gamepad2 size={36} />
          </a>
          <a
            href="/leaderboard"
            className="text-gray-400 hover:text-gray-200"
            aria-label="Leaderboard"
          >
            <ClipboardList size={36} />
          </a>
          <div className="drawer drawer-end w-auto">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content text-gray-400 hover:text-gray-200 transition-all duration-300">
              <label htmlFor="my-drawer-4">
                <Menu size={36} className="cursor-pointer" />
              </label>
            </div>
            <FooterDrawer />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer