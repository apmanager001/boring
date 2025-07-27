"use client";
import React, { useState } from "react";
import {
  Squirrel,
  TableProperties,
  Dices,
  Newspaper,
  Menu,
  X,
} from "lucide-react";
import GoogleSignin from "./headerComps/googleSignin";
import Link from "next/link";
import { gameLinks, kidLinks } from "../components/headerComps/headerLinks";
import StoreDebugger from "./utility/StoreDebugger";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <div className="navbar justify-center bg-base-200">
        <div className="flex flex-col mx-10 w-full">
          <div className="flex-1 flex justify-center items-center">
            <img
              src="/squirrelglasses.webp"
              alt="Squirrel Logo"
              width="100"
              height="100"
            />
            <Link href="/" className="btn btn-ghost text-xl">
              Boring Squirrel
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex justify-center items-center">
            <ul className="menu menu-horizontal justify-center text-sm">
              <li>
                <details>
                  <summary>
                    <Dices />
                    Games
                  </summary>
                  <ul className="rounded-t-none p-2 text-center bg-base-200 z-50">
                    {gameLinks
                      .filter((link) => link.type === "game")
                      .map((link) => (
                        <li key={link.name}>
                          <Link href={link.link}>{link.name}</Link>
                        </li>
                      ))}
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <Dices />
                    Kid Games
                  </summary>
                  <ul className="rounded-t-none p-2 text-center bg-base-200 z-50">
                    {kidLinks
                      .filter((link) => link.type === "kid")
                      .map((link) => (
                        <li key={link.name}>
                          <Link href={link.link}>{link.name}</Link>
                        </li>
                      ))}
                  </ul>
                </details>
              </li>
              <li>
                <Link href="/news">
                  <Newspaper /> Gaming News
                </Link>
              </li>
              <li>
                <Link href="/leaderboard">
                  <TableProperties /> Leaderboard
                </Link>
              </li>
              <li>
                <GoogleSignin />
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden absolute right-4 top-4">
            <button
              onClick={toggleMobileMenu}
              className="btn btn-ghost btn-sm"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden w-full mt-4 bg-base-200 rounded-lg shadow-lg">
              <ul className="menu menu-vertical p-4 space-y-2">
                <li className="menu-title">
                  <span>Games</span>
                </li>
                {gameLinks
                  .filter((link) => link.type === "game")
                  .map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.link}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}

                <li className="menu-title">
                  <span>Kid Games</span>
                </li>
                {kidLinks
                  .filter((link) => link.type === "kid")
                  .map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.link}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}

                <li>
                  <Link href="/news" onClick={() => setMobileMenuOpen(false)}>
                    <Newspaper /> Gaming News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/leaderboard"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <TableProperties /> Leaderboard
                  </Link>
                </li>
                <li>
                  <div onClick={() => setMobileMenuOpen(false)}>
                    <GoogleSignin />
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <StoreDebugger />
    </>
  );
};

export default Header;
