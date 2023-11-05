import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuth();

  // This effect runs once on component mount and sets up an event listener for window resize.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        // 768px is typically the md breakpoint
        setIsOpen(false);
      }
    }

    // Set up the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFauVAESNmRE5Og3zMDkV_kcf6g18VHTgBPVtIsiTysto_tPpCi4BDK0pUI7pvuPaJbQ&usqp=CAU"
                  alt="Logo"
                  className="h-8 w-8 mr-2"
                />
                <span className="font-semibold text-gray-500 text-lg">
                  PicConnect
                </span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/upload"
              className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
            >
              Upload
            </Link>
            <Link
              to="/profile"
              className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
            >
              Profile
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="py-4 px-2 text-red-500 font-semibold hover:text-red-400 transition duration-300"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/signin"
                className="py-4 px-2 text-blue-500 font-semibold hover:text-blue-400 transition duration-300"
              >
                Sign In
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-500 hover:text-green-500"
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} mobile-menu`}>
        <ul className="">
          <li className="active">
            <Link
              to="/"
              className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/upload"
              className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
            >
              Upload
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
            >
              Profile
            </Link>
          </li>
          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className="block text-sm px-2 py-4 text-red-500 hover:bg-red-400 transition duration-300"
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/signin"
                className="block text-sm px-2 py-4 text-blue-500 hover:bg-blue-400 transition duration-300"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
