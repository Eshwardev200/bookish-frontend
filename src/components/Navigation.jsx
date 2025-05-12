import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/lib/Api";

const Navigation = () => {
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="flex items-center justify-between px-5 py-5">
      <h2
        role="button"
        onClick={() => navigate("/")}
        className="text-2xl cursor-pointer font-bold"
      >
        Bookish
      </h2>
      <div className="flex items-center gap-4 md:gap-2">
        <Button onClick={() => navigate("/create-book")}>Create Book</Button>
        <Button
          onClick={handleLogout}
          disabled={isLoading}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
