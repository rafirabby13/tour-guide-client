import { CreateAdminForm } from '@/components/modules/admin/CraeteAdmin' // Note: Check typo in filename 'Craete' vs 'Create'
import { Users, ShieldAlert } from 'lucide-react'
import React from 'react'

const CreateAdminPage = () => {
    return (
        <div className="space-y-8 animate-in fade-in-50 duration-500">
            
            {/* --- Page Header --- */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Admin Management
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Manage access levels and create new administrative accounts.
                    </p>
                </div>
                
                {/* The "Wow" Form Button sits here as the main action */}
                <CreateAdminForm />
            </div>

            {/* --- Content Area (Placeholder for List) --- */}
            <div className="rounded-xl border border-gray-100 bg-white shadow-sm min-h-[400px]">
                
                {/* Empty State / Placeholder */}
                <div className="flex flex-col items-center justify-center h-[400px] text-center p-8">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Users className="h-8 w-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Admin Management
                    </h3>
                    <p className="text-sm text-gray-500 max-w-sm mt-2 mb-6">
                         Click the button above to add the first one.
                    </p>
                    
                    {/* Optional: Info Banner */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 text-xs rounded-full border border-yellow-100">
                        <ShieldAlert className="w-3 h-3" />
                        <span>Super Admins have full access</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateAdminPage