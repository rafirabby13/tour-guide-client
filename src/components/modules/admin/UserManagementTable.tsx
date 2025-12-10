/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import DeleteConfirmationDialog from '@/components/shared/alert/DeleteConfirmationDialog';
import EditUserDialog from '@/components/shared/alert/EditUserDialog';
import ManagementTables, { Column } from '@/components/shared/tables/ManagementTables';
import TablePagination from '@/components/shared/tables/TablePagination';
import { deleteUser, updateUserRole, updateUserStatus } from '@/services/admin/userManagement';
import { IMeta } from '@/types/meta.interface';
import { IUser } from '@/types/user.interface';
import React, { useEffect, useState } from 'react'

const UserManagementTable = ({ users, meta }: { users: IUser[], meta: IMeta }) => {
    useEffect(() => {
        setUserList(users);
    }, [users]);
    const [userList, setUserList] = useState(users);

    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    console.log({ meta })

    // const validusers = userList?.filter(user => user.isDeleted === false)


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
    const handleEditClick = (item: IUser) => {
        setSelectedUser(item);
        setIsEditDialogOpen(true);
    }
    const handleConfirmEdit = async (data: any) => {
        if (!selectedUser) return;
        setIsEditing(true);
        try {
            console.log("object", data)
            if (data?.role !== selectedUser.role && data?.status == selectedUser.status) {
                await updateUserRole(selectedUser.id, data.role)
                setUserList((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === selectedUser.id
                            ? { ...user, role: data.role }
                            : user
                    )
                );
            }
            if (data?.status !== selectedUser.status && data?.role == selectedUser.role) {
                console.log(selectedUser.id, data.status)
                await updateUserStatus(selectedUser.id, data.status)
                setUserList((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === selectedUser.id
                            ? { ...user, status: data.status }
                            : user
                    )
                );
            }
            if (data?.status !== selectedUser.status && data?.role !== selectedUser.role) {
                console.log(selectedUser.id, data.status)
                await Promise.all([

                    updateUserStatus(selectedUser.id, data.status),
                    updateUserRole(selectedUser.id, data.role)

                ])
                setUserList((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === selectedUser.id
                            ? { ...user, status: data.status, role: data.role }
                            : user
                    )
                )
            }
        } catch (error) {
            console.error("Delete failed", error);
        } finally {
            setIsEditing(false);
            setIsEditDialogOpen(false);
            setSelectedUser(null);
        }
    };
    return (
        <div className="space-y-4">
            <ManagementTables
                data={userList}
                columns={columns}
                getRowKey={(row) => row.id}
                onDelete={handleDeleteClick}
                onEdit={handleEditClick}

            />
            <div className="flex justify-end pt-4">
                <TablePagination
                    page={meta.page}
                    total={meta.total}
                    limit={meta.limit}
                />
            </div>
            <DeleteConfirmationDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onConfirm={handleConfirmDelete}
                itemName={selectedUser?.email}
                isDeleting={isDeleting}
                title="Delete User"
            />
            <EditUserDialog
                key={selectedUser?.id as string}
                onOpenChange={setIsEditDialogOpen}
                onConfirm={(updatedData) => handleConfirmEdit(updatedData)}
                open={isEditDialogOpen}
                user={selectedUser}
                isEditing={isEditing}
            />
        </div>
    )
}

export default UserManagementTable
