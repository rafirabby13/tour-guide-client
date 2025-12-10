
import { redirect } from "next/navigation";
import ProfileContent from "@/components/modules/profile/ProfileContent";
import { getMyProfile } from "@/services/commmon/myProfile";

export default async function MyProfilePage() {
  const profileData = await getMyProfile();

  // console.log(profileData)

  if (!profileData.success) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileContent user={profileData?.data} />
    </div>
  );
}