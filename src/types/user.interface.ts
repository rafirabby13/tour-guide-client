import { UserRole } from "@/lib/auth-utils";

export interface UserInfo {
    name: string;
    email: string;
    role: UserRole;
}

export interface IUser {
  id: string;
  email: string;
  role: "GUIDE" | "TOURIST" | "ADMIN";
  status: "ACTIVE" | "INACTIVE" | "DELETED";
  password: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  needPasswordChange: boolean;
}
