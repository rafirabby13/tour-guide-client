/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { format } from "date-fns";
import Swal from "sweetalert2";

import ManagementTables, { Column } from "@/components/shared/tables/ManagementTables";
import TablePagination from "@/components/shared/tables/TablePagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IMeta } from "@/types/meta.interface";
import { cancelBooking } from "@/services/guide/cancelBooking";


const GuideBookingsTable = ({ bookings, meta }: { bookings: any[]; meta: IMeta }) => {

  // 1. Sync State


  const [bookingList, setBookingList] = useState<any[]>(bookings);
  const [isUpdating, setIsUpdating] = useState<string | null>(null); // Track which ID is updating
  useEffect(() => {
    setBookingList(bookings);
  }, [bookings]);


  const handleCancelBooking = async (item: { id: string; }) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await cancelBooking(item.id)
          Swal.fire({
            title: "Cancel!",
            text: "Your file has been Cancel.",
            icon: "success"
          });
        }
      });


    } catch (error) {
      console.log(error)
    }
    console.log(item)
  }

  // 3. Define Columns
  const columns: Column<any>[] = [
    {
      header: "Tourist",
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 rounded-full overflow-hidden border">
            <Image
              src={row.tourist?.profilePhoto || "/placeholder-user.png"}
              alt={row.tourist?.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{row.tourist?.name}</span>
            <span className="text-xs text-muted-foreground">{row.tourist?.contactNumber}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Tour Details",
      accessor: (row) => (
        <div className="flex flex-col max-w-[180px]">
          <span className="font-medium truncate" title={row.tour?.title}>
            {row.tour?.title}
          </span>
          <span className="text-xs text-muted-foreground truncate">
            {format(new Date(row.date), "MMM dd, yyyy")} • {row.duration} Hr
          </span>
        </div>
      ),
    },
    {
      header: "Schedule",
      accessor: (row) => {
        const start = new Date(row.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const end = new Date(row.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return <span className="text-xs">{start} - {end}</span>;
      },
    },
    {
      header: "Guests",
      accessor: (row) => <span className="text-center block">{row.numGuests}</span>,
    },
    {
      header: "Price",
      accessor: (row) => <span className="font-medium">${row.totalPrice}</span>,
    },
    {
      header: "Status",
      accessor: (row) => {
        const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
          PENDING: "secondary",
          CONFIRMED: "default", // Green-ish
          CANCELLED: "destructive",
          COMPLETED: "outline",
        };
        return <Badge variant={statusColors[row.status] || "outline"}>{row.status}</Badge>;
      },
    },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="flex gap-2">
          {row.status === "PENDING" ? (
            <>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleCancelBooking(row)}
                disabled={isUpdating === row.id}
                title="Reject"
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <span className="text-xs text-muted-foreground italic">
              {row.status === "CONFIRMED" ? "Active" : "Closed"}
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
      // We handle actions via custom column, so no generic onEdit/onDelete passed
      />

      <div className="flex justify-end pt-4">
        <TablePagination
          page={meta.page}
          total={meta.total}
          limit={meta.limit}
        />
      </div>
    </div>
  );
};

export default GuideBookingsTable;