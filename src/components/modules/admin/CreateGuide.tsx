"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useActionState, useEffect, useState } from "react";
import { createGuide } from "@/services/admin/userManagement";
import { Loader2 } from "lucide-react"; // Shadcn/Lucide icon
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { createGuideAction } from "@/services/admin/createGuide";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { title } from "process";

interface Props {
    onSuccess?: () => void; // To refresh your table after creation
}

export function CreateGuide() {
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(createGuideAction, null);
    console.log({state})
    useEffect(() => {

        if (state?.error) {
            toast.error("An Error Occured")
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOpen((prev)=> prev == true ? false : true )


        }
        if (state?.success) {
            toast.success("Guide Created Successfully")
            setOpen((prev)=> prev == true ? false : true )

        }
    }, [state])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                    + Add New Guide
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Onboard New Guide</DialogTitle>
                    <DialogDescription>Create credentials. Profile details can be added later.</DialogDescription>
                </DialogHeader>

                {/* ✅ The Form using Server Action */}
                <form action={formAction} className="mt-4">
                    <FieldGroup className="space-y-4">


                        {/* Email */}
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                        </Field>

                        {/* Password */}
                        <Field>
                            <FieldLabel htmlFor="password">Temporary Password</FieldLabel>
                            <Input id="password" name="password" type="password" placeholder="******" required />
                        </Field>



                        {/* Submit Button */}
                        <Button type="submit" disabled={isPending} className="w-full mt-4">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>

                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}