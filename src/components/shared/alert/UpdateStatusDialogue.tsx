import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ITour } from '@/types/tour.interface';
import React, { useState } from 'react'
interface EditStatusDialogProps {
    open: boolean;
    key: string,
    onOpenChange: (open: boolean) => void;
    tour: ITour ;
    onConfirm: (data: { tourId: string; status: ITour["status"] }) => void;
    isEditing?: boolean;
}
const UpdateStatusDialogue = ({ open, onOpenChange, tour, onConfirm, isEditing }: EditStatusDialogProps) => {
    const [status, setStatus] = useState<ITour["status"] | "">(tour?.status || "");


    const handleSave = () => {
        // Guard clause to ensure we have a user and valid inputs
        if ( !status) return;

        // Call the parent function with the local state
        onConfirm({
            tourId: tour.id,
            status: status as ITour["status"],
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>
                        Make changes to the user&apos;s role and account status here.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    

                    <div className="grid gap-2">
                        <label htmlFor="status" className="text-sm font-medium">
                            Status
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as ITour["status"])}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="PUBLISHED">Published</option>
                            <option value="BLOCKED">Block</option>
                            {/* <option value="DELETED">Deleted</option> */}
                        </select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isEditing}
                    >
                        {
                            isEditing ? "Editing" : "Save changes"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateStatusDialogue
