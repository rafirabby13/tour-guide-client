// @/components/modules/admin/BecomeGuideManagementPage.tsx (Server Component)

import BecomeGuideTable from "@/components/modules/admin/BecomeGuideTable";
import { getAllGuides } from "@/services/admin/getAllGuides";
import { IGuideProfile } from "@/types/guideProfile"; // Assuming this is the Guide object type

const BecomeGuideManagementPage = async () => {

    // 1. Fetch ALL Guide profiles
    // We are trusting the backend filter will return only PENDING guides, 
    // or we filter them on the client as done previously.
    const result = await getAllGuides();
    
    // Check for success and safely cast/extract data
    const guideRequests: IGuideProfile[] = result?.data || [];
    
    // Note: If you have separate user data, you might need to combine them here.
    // For now, we will assume IGuideProfile is sufficient to render the table.

    return (
        <div className="p-8">
            <BecomeGuideTable initialRequests={guideRequests}/>
        </div>
    );
}

export default BecomeGuideManagementPage;