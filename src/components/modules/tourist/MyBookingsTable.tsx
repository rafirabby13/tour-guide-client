/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import ManagementTables, { Column } from "@/components/shared/tables/ManagementTables";
import TablePagination from "@/components/shared/tables/TablePagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Assuming you have shadcn Badge
import { format } from "date-fns"; // Recommended for formatting dates, or use JS Date
import { IMeta } from "@/types/meta.interface";
import ReviewDialog from "./ReviewDialog";
import { IReview } from "@/types/review.interface";
import { ITour } from "@/types/tour.interface";
import { initiatePayment } from "@/services/payment/initiatePayment";


interface MyBookingsTableProps {
    bookings: any[];
    meta: IMeta;
}

const MyBookingsTable = ({ bookings, meta }: MyBookingsTableProps) => {
    const [bookingList, setBookingList] = useState<any[]>(bookings);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    // Sync state if props change (e.g. pagination)
    useEffect(() => {
        setBookingList(bookings);
    }, [bookings]);

    // --- Handlers ---
    const handleReviewClick = (booking: ITour) => {
        console.log(booking)
        setSelectedBooking(booking);
        setIsReviewOpen(true);
    };

    const handlePayNow = async(item: any) => {
        // If paymentUrl is stored in booking or generated on fly
        console.log(item)
        const payment = await initiatePayment(item?.id)
        if (payment && payment.success) {
            window.location.href = payment.paymentUrl;
            
        }
        console.log(payment.paymentUrl)
    };

   
    // --- Column Definitions ---
    const columns: Column<any>[] = [
        {
            header: "Tour Name",
            accessor: (row) => (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{row.tour?.title}</span>
                    <span className="text-xs text-gray-500">{row.tour?.location}</span>
                </div>
            ),
        },
        {
            header: "Date & Time",
            accessor: (row) => {
                const dateStr = format(new Date(row.date), "MMM dd, yyyy");
                const startTimeStr = new Date(row.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return (
                    <div className="text-sm">
                        <div>{dateStr}</div>
                        <div className="text-gray-500 text-xs">{startTimeStr}</div>
                    </div>
                );
            },
        },
        {
            header: "Guests",
            accessor: "numGuests",
        },
        {
            header: "Total Price",
            accessor: (row) => `$${row.totalPrice}`,
        },
        {
            header: "Status",
            accessor: (row) => {
                let variant: "default" | "secondary" | "destructive" | "outline" = "default";
                if (row.status === "PENDING") variant = "secondary";
                if (row.status === "CONFIRMED") variant = "default"; // Greenish usually
                if (row.status === "CANCELLED") variant = "destructive";

                return <Badge variant={variant}>{row.status}</Badge>;
            },
        },
        {
            header: "Action",
            accessor: (row) => (
                <div className="flex items-center gap-2">
                    {/* Pay Button for Pending */}
                    {row.status === "PENDING" && row.paymentStatus !== "SUCCESS" && (
                        <Button size="sm" onClick={() => handlePayNow(row)}>
                            Pay Now
                        </Button>
                    )}

                    {/* Review Button for Completed */}
                    {row.status === "CONFIRMED" && !row.review && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReviewClick(row)}
                        >
                            Write Review
                        </Button>
                    )}

                    {/* Show reviewed status */}
                    {row.review && (
                        <span className="text-xs font-medium text-green-600 px-2 py-1 bg-green-50 rounded-md">
                            Reviewed ✓
                        </span>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-4">
            <ManagementTables
                data={bookingList}
                columns={columns}
                getRowKey={(row) => row.id}
                // onEdit={handleEditClick}
            // Remove onDelete/onEdit if not using generic edit/delete
            />

            <div className="flex justify-end pt-4">
                <TablePagination
                    page={meta.page}
                    total={meta.total}
                    limit={meta.limit}
                />
            </div>


            {selectedBooking && (
                <ReviewDialog
                    isOpen={isReviewOpen}
                    onClose={() => {
                        setIsReviewOpen(false);
                        setSelectedBooking(null);
                    }}
                    bookingId={selectedBooking.id}
                  tourId={selectedBooking.tourId}
                />
            )}
        </div>
    );
};

export default MyBookingsTable;