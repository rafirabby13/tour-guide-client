
"use server"
import UserManagementTable from '@/components/modules/admin/UserManagementTable'
import { getAllUsers } from '@/services/admin/userManagement'
interface SearchParamsProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const UsersManagementPage = async ({ searchParams }: SearchParamsProps) => {
  const query = await searchParams;
  console.log({query})
   const users = await getAllUsers(query )
   console.log({users})
    // const validusers = userList?.filter(user => user.isDeleted === false)


    return (
        <div>
          <UserManagementTable users={users?.data} meta={users?.meta}/>
        </div>
    )
}

export default UsersManagementPage
