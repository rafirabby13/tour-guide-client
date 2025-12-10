"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface TablePaginationProps {
  page: number;  // Current page
  limit: number; // Items per page
  total: number; // Total items in database
}

const TablePagination = ({ page, limit, total }: TablePaginationProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  // 1. Calculate Total Pages
  const totalPages = Math.ceil(total / limit);

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  // Don't show pagination if there's only 1 page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(page - 1)}
        disabled={page <= 1 || isPending}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
          let pageNumber;

          // Logic to keep the current page centered in the list of 5 buttons
          if (totalPages <= 5) {
            pageNumber = index + 1;
          } else if (page <= 3) {
            pageNumber = index + 1;
          } else if (page >= totalPages - 2) {
            pageNumber = totalPages - 4 + index;
          } else {
            pageNumber = page - 2 + index;
          }
          
          return (
            <Button
              key={pageNumber}
              variant={pageNumber === page ? "default" : "outline"}
              size="sm"
              onClick={() => navigateToPage(pageNumber)}
              disabled={isPending}
              className="w-10"
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(page + 1)}
        disabled={page === totalPages || isPending}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>

      <span className="text-sm text-muted-foreground ml-2">
        Page {page} of {totalPages}
      </span>
    </div>
  );
};

export default TablePagination;