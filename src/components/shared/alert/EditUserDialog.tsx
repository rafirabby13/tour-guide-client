"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { IUser } from "@/types/user.interface";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"; // 👈 CHANGE: Import from 'dialog', not 'alert-dialog'

interface EditUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: IUser | null;
    onSave: (updatedUser: Partial<IUser>) => void;
}

const EditUserDialog = ({ open, onOpenChange, user, onSave }: EditUserDialogProps) => {
    // Initialize with a safe default, but allow specific User Role types
    const [role, setRole] = useState<IUser["role"] | "">("");
    const [status, setStatus] = useState<IUser["status"] | "">("");

    useEffect(() => {
        if (user && open) {
            setRole(user.role);
            setStatus(user.status);
        }
    }, [user, open]);

    const handleSave = () => {
        if (!user) return;
        
        // Ensure we don't save empty states
        if (role && status) {
            onSave({ 
                id: user.id, 
                role: role as IUser["role"], 
                status: status as IUser["status"] 
            });
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>
                        Make changes to the user's role and account status here.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <label htmlFor="role" className="text-sm font-medium">
                            Role
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value as IUser["role"])}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="TOURIST">Tourist</option>
                            <option value="GUIDE">Guide</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="status" className="text-sm font-medium">
                            Status
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as IUser["status"])}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                            <option value="DELETED">Deleted</option>
                        </select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserDialog;