/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner'; 
import ManagementTables, { Column } from '@/components/shared/tables/ManagementTables';
import TablePagination from '@/components/shared/tables/TablePagination';
import DeleteConfirmationDialog from '@/components/shared/alert/DeleteConfirmationDialog';
import { IGuideProfile } from '@/types/guideProfile'; // The Guide profile type
import { MapPin, Briefcase, User, Phone, CheckCircle } from 'lucide-react';
import Image from 'next/image';

// The component now accepts initialRequests (IGuideProfile[]) as props
const BecomeGuideTable = ({ initialRequests }: { initialRequests: IGuideProfile[] }) => {
    
    // Initialize requests state with data passed from the server
    const [requests, setRequests] = useState<IGuideProfile[]>([]);
    
    // Filter the initial server data to ensure only pending guides are shown
    useEffect(() => {
        const pendingGuides = initialRequests.filter(guide => !guide.isVerified);
        setRequests(pendingGuides);
        // Assuming your backend handles pagination/meta. For now, total is just filtered count.
        setMeta(prev => ({ ...prev, total: pendingGuides.length }));
        setIsLoading(false);
    }, [initialRequests]);


    const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0 });
    const [isLoading, setIsLoading] = useState(true);
    
    // State for Approval Dialog
    const [selectedGuide, setSelectedGuide] = useState<IGuideProfile | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);


    // --- 1. Define Rich Columns based on IGuideProfile ---
    const columns: Column<IGuideProfile>[] = [
        {
            header: "Applicant Details",
            accessor: (row) => (
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                        {row.profilePhoto ? (
                            <Image src={row.profilePhoto} alt={row.name} fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <User size={20} />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 text-sm">{row.name}</span>
                        {/* Assuming email is not directly on the Guide model, using contact as a secondary ID */}
                        <span className="text-xs text-gray-500">ID: {row.userId.substring(0, 8)}...</span> 
                    </div>
                </div>
            ),
        },
        {
            header: "Location",
            accessor: (row) => (
                <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{row.city}, {row.country}</span>
                </div>
            ),
        },
        {
            header: "Experience",
            accessor: (row) => (
                <div className="flex flex-col text-gray-600 text-sm">
                    <div className="flex items-center gap-1.5">
                        <Briefcase size={14} className="text-gray-400" />
                        <span>{row.experience} Years</span>
                    </div>
                    <span className="text-xs font-medium text-blue-600 uppercase mt-0.5">{row.experienceLevel}</span>
                </div>
            ),
        },
        {
            header: "Contact",
            accessor: (row) => (
                <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                     <Phone size={14} className="text-gray-400" />
                     <span className="font-mono">{row.contactNumber}</span>
                </div>
            ),
        },
        {
            header: "Bio Snippet",
            accessor: (row) => (
                <span className="text-xs italic text-gray-500 line-clamp-2 w-48">
                    &quot;{row.bio || 'No bio provided.'}&quot;
                </span>
            ),
        },
        {
            header: "Status",
            accessor: () => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                    Verification Pending
                </span>
            ),
        }
    ];

    // --- 2. Handle Approval ---
    const handleEditClick = (guide: IGuideProfile) => {
        setSelectedGuide(guide);
        setIsConfirmOpen(true);
    };

    const handleConfirmApprove = async () => {
        if (!selectedGuide) return;
        
        try {
            setIsProcessing(true);
            
            // Call API to update guide status using the Guide ID
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guides/${selectedGuide.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isVerified: true, isAvailable: true }) // Also set available upon verification
            });
            const result = await res.json();

            if (result.success) {
                toast.success(`${selectedGuide.name} approved successfully!`);
                // Remove from list locally
                setRequests(prev => prev.filter(g => g.id !== selectedGuide.id));
                setMeta(prev => ({ ...prev, total: prev.total - 1 })); // Decrement total
                setIsConfirmOpen(false);
                setSelectedGuide(null);
            } else {
                toast.error(result.message || "Failed to approve");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsProcessing(false);
        }
    };

    if (isLoading) return <div className="p-10 text-center text-gray-500">Loading requests...</div>;


    // --- 3. Render ---
    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Guide Applications</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Review and verify pending applications. Verified guides can instantly post tours.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-100">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">{requests.length}</span>
                    <span className="text-sm">Pending Requests</span>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <ManagementTables
                    data={requests}
                    columns={columns}
                    getRowKey={(row) => row.id}
                    onEdit={handleEditClick} // Triggers the Approval Dialog
                />
            </div>
            
            {/* Pagination is tricky when using client-side filtering on all data */}
            {/* Keeping it simple for now, but usually requires server-side pagination with filter */}
            <div className="flex justify-end">
                {/* Pagination is hidden as filtering is done client-side on the entire dataset */}
                {/* If you implement server-side pagination/filter, uncomment and adjust */}
                 <TablePagination
                    page={meta.page}
                    total={meta.total} // Total of filtered requests
                    limit={meta.limit} // Items per page
                    // onPageChange={(val) => setMeta(prev => ({ ...prev, page: val }))}
                 /> 
            </div>

            {/* Approval Dialog */}
            {/* {selectedGuide && (
                <edit
                    open={isConfirmOpen}
                    onOpenChange={setIsConfirmOpen}
                    onConfirm={handleConfirmApprove}
                    title="Approve Guide Application?"
                    isDeleting={isProcessing} // Use isProcessing
                />
            )} */}
        </div>
    );
};

export default BecomeGuideTable;