"use client";

import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/auth/logout";


const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <Button variant={"destructive"} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;