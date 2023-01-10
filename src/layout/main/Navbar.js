import { signOut } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { singOut } from "../../features/auth/authSlice";
import auth from "../../firebase/firebase.config";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const { pathname } = useLocation();
  const auths = useSelector((state) => state.auth);
  const {
    isLoading,
    user: { email, role },
  } = auths;
  const dispatch = useDispatch();
  // console.log(isLoading, email);
  const handelLogout = () => {
    signOut(auth).then(() => {
      dispatch(singOut());
    });
  };
  return (
    <nav
      className={`h-14 fixed w-full z-[999] ${
        pathname === "/" ? null : "bg-white"
      }`}
    >
      <ul className="max-w-7xl mx-auto flex gap-3 h-full items-center">
        <li className="flex-auto font-semibold text-2xl">
          <Link to="/">JobBox</Link>
        </li>
        <li>
          <Link className="hover:text-primary" to="/jobs">
            Jobs
          </Link>
        </li>

        <li>
          {!isLoading && email && (
            <span>
              {email && role && (
                <Link
                  className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              )}
              {email && !role && (
                <Link
                  className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all mx-3"
                  to="/register"
                >
                  register
                </Link>
              )}
            </span>
          )}
          {!isLoading && email ? (
            <button
              className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
              onClick={() => handelLogout()}
            >
              LogOut
            </button>
          ) : (
            <Link
              className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
              to="/login"
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
