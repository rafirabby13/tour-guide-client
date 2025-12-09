
"use server"
import UserManagementTable from '@/components/modules/admin/UserManagementTable'
import { getAllUsers } from '@/services/admin/userManagement'
import { IUser } from '@/types/user.interface'

const UsersManagementPage = async () => {
   const users = await getAllUsers()

    return (
        <div>
          <UserManagementTable users={users?.data}/>
        </div>
    )
}

export default UsersManagementPage
