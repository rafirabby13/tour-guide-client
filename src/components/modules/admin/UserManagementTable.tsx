/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import DeleteConfirmationDialog from '@/components/shared/alert/DeleteConfirmationDialog';
import ManagementTables, { Column } from '@/components/shared/tables/ManagementTables';
import { deleteUser } from '@/services/admin/userManagement';
import { IUser } from '@/types/user.interface';
import React, { useState } from 'react'

const UserManagementTable = ({ users }: { users: IUser[] }) => {
    const [userList, setUserList] = useState(users);

    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const validusers =  userList.filter(user=> user.isDeleted == false )
    

    const columns: Column<any>[] = [
        {
            header: "Email",
            accessor: "email",
        },
        {
            header: "Role",
            accessor: "role",
        },
        {
            header: "Status",
            accessor: "status",
        },
    ];
    const handleDeleteClick = (user: IUser) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedUser) return;
        setIsDeleting(true);
        try {
            await deleteUser(selectedUser.id);
            setUserList(userList.filter((u) => u.id !== selectedUser.id));
        } catch (error) {
            console.error("Delete failed", error);
        } finally {
            setIsDeleting(false);
            setIsDialogOpen(false);
            setSelectedUser(null);
        }
    };
    const handleEdit = (item: IUser) => {
        console.log(item)
    }
    return (
        <div>
            <ManagementTables
                data={validusers}
                columns={columns}
                getRowKey={(row) => row.id}
                onDelete={handleDeleteClick}
                onEdit={handleEdit}

            />
            <DeleteConfirmationDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onConfirm={handleConfirmDelete}
                itemName={selectedUser?.email}
                isDeleting={isDeleting}
                title="Delete User"
            />
        </div>
    )
}

export default UserManagementTable
