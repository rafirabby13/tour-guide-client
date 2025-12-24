import RegisterForm from "@/components/modules/auth/register-form";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Create Account",
  description: "Join GuideNest today to start exploring or guiding.",
};
const RegisterPage = () => {
  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          <Card>
         
            <CardContent>
              <RegisterForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;