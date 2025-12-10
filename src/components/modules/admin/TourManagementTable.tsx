/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from 'react'
import DeleteConfirmationDialog from '@/components/shared/alert/DeleteConfirmationDialog'
import ManagementTables, { Column } from '@/components/shared/tables/ManagementTables'
import { IMeta } from '@/types/meta.interface'
import { ITour } from '@/types/tour.interface'
import TablePagination from '@/components/shared/tables/TablePagination'
import UpdateStatusDialogue from '@/components/shared/alert/UpdateStatusDialogue'
import { updateTourStatus } from '@/services/admin/tourManagement'

const TourManagementTable = ({ tours, meta }: { tours: ITour[], meta: IMeta }) => {

    const [selectedTour, setSelectedTour] = useState<ITour | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [tourList, setTourList] = useState<ITour[]>(tours);
    useEffect(() => {
        setTourList(tours);
    }, [tours]);
    const columns: Column<ITour>[] = [
        {
            header: "Title",
            accessor: "title",
        },
        {
            header: "Location",
            accessor: "location",
        },
        {
            header: "Status",
            accessor: "status",
        },
        {
            header: "Available Dates",
            accessor: (row) => {
                const rawDates = row.availableDates as any;

                if (!rawDates) return "No dates";

                let dateArray: any[] = [];

                if (Array.isArray(rawDates)) {
                    // It is ALREADY an array, no need to split
                    dateArray = rawDates;
                } else if (typeof rawDates === "string") {
                    // It is a string, so we split it
                    dateArray = rawDates.split(",");
                }

                // 3. Format and Join
                return dateArray
                    .map((dateItem) => {
                        // Ensure we clean whitespace if it was a split string
                        const cleanDate = typeof dateItem === 'string' ? dateItem.trim() : dateItem;
                        return new Date(cleanDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        });
                    })
                    .join(' | ');
            },
        }
    ];



    const handleEditClick = (item: ITour) => {
        setSelectedTour(item);
        setIsDialogOpen(true);
    }
    const handleConfirmEdit = async (data: any) => {
        if (!selectedTour) return;
        setIsEditing(true);
        try {

            if (data?.status !== selectedTour.status) {
                console.log(selectedTour.id, data.status)
                await updateTourStatus(selectedTour.id, data.status)
                setTourList((prevTours) =>
                    prevTours.map((Tour) =>
                        Tour.id === selectedTour.id
                            ? { ...Tour, status: data.status }
                            : Tour
                    )
                );
            }

        } catch (error) {
            console.error("Update failed", error);
        } finally {
            setIsEditing(false);
            setIsDialogOpen(false)
            setSelectedTour(null);
        }
    };
    return (
        <div className="space-y-4">
            <ManagementTables
                data={tourList}
                columns={columns}
                getRowKey={(row) => row.id}
                onEdit={handleEditClick}
            />

            <div className="flex justify-end pt-4">
                <TablePagination
                    page={meta.page}
                    total={meta.total}
                    limit={meta.limit}
                />
            </div>
            {selectedTour && (
                <UpdateStatusDialogue
                    key={selectedTour.id} // "id" is safe to access now
                    onOpenChange={setIsDialogOpen}
                    onConfirm={(updatedData) => handleConfirmEdit(updatedData)}
                    open={isDialogOpen}
                    tour={selectedTour} // Now TypeScript knows this is ITour, not null
                    isEditing={isEditing}
                />
            )}

        </div>
    )
}

export default TourManagementTable