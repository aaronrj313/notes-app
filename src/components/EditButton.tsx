"use client"

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Note } from "@/db/schemas/notes";
import { Edit } from "lucide-react";
import EditNoteDialog from "./EditNoteDialog";


type Props = {
    note: Note;
};

function EditButton({ note }: Props) {
  const [open, setOpen] = useState(false);

  return ( <Dialog
    open={open}
    onOpenChange={(open) => setOpen(open)}
    >
        <DialogTrigger
        onClick={() => setOpen(true)}
        >
            <Edit className="size-5 text-muted-foreground"/>
        </DialogTrigger>

        <EditNoteDialog setOpen={setOpen} note={note} />
    </Dialog>
  );
}

export default EditButton