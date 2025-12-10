/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import React, { useEffect, useState } from 'react'
import DeleteConfirmationDialog from '@/components/shared/alert/DeleteConfirmationDialog';
// Assuming you will create this or use a redirect
// import EditTourDialog from '@/components/shared/alert/EditTourDialog'; 
import ManagementTables, { Column } from '@/components/shared/tables/ManagementTables';
import TablePagination from '@/components/shared/tables/TablePagination';
import { IMeta } from '@/types/meta.interface';
import { ITour } from '@/types/tour.interface';
import EditTourDialog from './EditTourModal';

const MyListingToursTable = ({ tours, meta }: { tours: ITour[], meta: IMeta }) => {

    // 1. Sync State on Pagination Change
    useEffect(() => {
        setTourList(tours);
    }, [tours]);

    const [tourList, setTourList] = useState<ITour[]>(tours);
    const [selectedTour, setSelectedTour] = useState<ITour | null>(null);

    // Dialog States
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    // Loading States
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // 2. Define Columns based on your JSON Data
    const columns: Column<any>[] = [
        {
            header: "Title",
            accessor: "title",
            // Optional: You can truncate long titles
            // render: (row) => <span className="font-medium">{row.title}</span>
        },
        {
            header: "Location",
            accessor: "location",
        },
        {
            header: "Guide",
            // Access nested guide object safely
            accessor: (row) => row.guide?.name || "N/A",
        },
        {
            header: "Price / Hr",
            // Map the first pricing tier or show a range
            accessor: (row) => {
                const price = row.tourPricings?.[0]?.pricePerHour;
                return price ? `$${price}` : "N/A";
            }
        },
        {
            header: "Status",
            accessor: "status",
            // You can add a badge component here if you have one
        },
    ];

    // 3. Handlers
    const handleDeleteClick = (tour: ITour) => {
        setSelectedTour(tour);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedTour) return;
        setIsDeleting(true);
        try {
            // await deleteTour(selectedTour.id); 
            setTourList(prev => prev.filter((t) => t.id !== selectedTour.id));
        } catch (error) {
            console.error("Delete failed", error);
        } finally {
            setIsDeleting(false);
            setIsDeleteDialogOpen(false);
            setSelectedTour(null);
        }
    };

    const handleEditClick = (item: ITour) => {
        setSelectedTour(item);
        setIsEditDialogOpen(true);
        // Alternatively, for Tours, you might want to redirect to a page:
        // router.push(`/admin/tours/edit/${item.id}`)
    }

    const handleConfirmEdit = async (data: any) => {
        if (!selectedTour) return;
        setIsEditing(true);
        try {
            console.log("Updating tour:", data);

            // Example: Logic to update status if changed
            if (data?.status !== selectedTour.status) {
                // await updateTourStatus(selectedTour.id, data.status);

                setTourList((prevTours) =>
                    prevTours.map((tour) =>
                        tour.id === selectedTour.id
                            ? { ...tour, status: data.status }
                            : tour
                    )
                );
            }

            // Add other update logic (title, etc.) here if using a dialog

        } catch (error) {
            console.error("Update failed", error);
        } finally {
            setIsEditing(false);
            setIsEditDialogOpen(false);
            setSelectedTour(null);
        }
    };
    const handleDialogClose = () => {
        setIsEditDialogOpen(false);
        setSelectedTour(null);
        // Optional: If you want to force a refresh of local state here without page reload, 
        // you would need to fetch data again or rely on the Dialog calling router.refresh()
    }
    return (
        <div className="space-y-4">
            <ManagementTables
                data={tourList}
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
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleConfirmDelete}
                itemName={selectedTour?.title}
                isDeleting={isDeleting}
                title="Delete Tour"
            // description="Are you sure you want to delete this tour?" // Optional if your component supports description
            />
            {selectedTour && (
                <EditTourDialog
                    isOpen={isEditDialogOpen}
                    onClose={handleDialogClose}
                    tour={selectedTour}
                />
            )}

        </div>
    )
}

export default MyListingToursTable