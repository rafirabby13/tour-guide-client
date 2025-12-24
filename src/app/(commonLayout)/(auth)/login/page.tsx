import LoginForm from "@/components/modules/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Access your GuideNest account to manage bookings and trips.",
};

const LoginPage = async ({searchParams}: {searchParams?: Promise<{redirect?: string}>}) => {
  // console.log(await searchParams)
  const {redirect} = await searchParams || {};
  return (
    <div className="flex min-h-screen items-center justify-center">
     
        <LoginForm redirect={redirect}/>
    
    </div>
  );
};

export default LoginPage;