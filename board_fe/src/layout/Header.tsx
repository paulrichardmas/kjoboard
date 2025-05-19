import React from "react";
import { useNavigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { removeAuthState, usernameSelector } from "../store/auth";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(usernameSelector);
  const logout = () => {
    dispatch(removeAuthState());
    navigate("/login");
  };

  return (
    <div className="p-2 w-full bg-slate-700 ">
      <div className="container mx-auto flex justify-between text-white">
        <div className="flex gap-4">
          <h1 className="font-bold">KJoboard</h1>
          <p>{username}</p>

          <Link className="hover:cursor-pointer" to="/profile">
            Profile
          </Link>

          <Link className="hover:cursor-pointer" to="/platform">
            Platforms
          </Link>
        </div>
        <div>
          <button className="hover:cursor-pointer" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
