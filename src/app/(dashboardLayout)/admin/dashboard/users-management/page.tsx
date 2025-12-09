
"use server"
import UserManagementTable from '@/components/modules/admin/UserManagementTable'
import { getAllUsers } from '@/services/admin/userManagement'
import { IUser } from '@/types/user.interface'

const UsersManagementPage = async () => {
   const users = await getAllUsers()
   console.log({users})

    return (
        <div>
          <UserManagementTable users={users?.data} meta={users?.meta}/>
        </div>
    )
}

export default UsersManagementPage
