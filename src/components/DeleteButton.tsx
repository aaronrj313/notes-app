"use client";

import { Trash2 } from 'lucide-react';
import { useTransition, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from './ui/alert-dialog';
import toast from "react-hot-toast"
import { deleteNoteAction } from '@/actions/notes';

function DeleteButton({noteId}: {noteId: number}) {
  const [open, setOpen] = useState(false);
  
  const [isPending, startTransition] = useTransition();

  const handleDeleteNote = async () => {
    startTransition(async() => {
        const { errorMessage } = await deleteNoteAction(noteId)
        if ( !errorMessage ) {
            setOpen(false)
            toast.success("Succesfully deleted note") 
        }
    })
  }

  return <AlertDialog open={open}>
    <AlertDialogTrigger
        className="absolute -right-2"
        onClick={() => setOpen(true)}
    >
        <Trash2 className="size-5 text-destructive/50"/>
    </AlertDialogTrigger>


    <AlertDialogContent>
        <AlertDialogHeader>
            Are you sure you want to delete this note?
        </AlertDialogHeader>
        <AlertDialogDescription>
            This action cannot be undone. This will oermanently delete this note from all records.
        </AlertDialogDescription>

        <AlertDialogFooter>
            <AlertDialogCancel
            disabled={isPending}
            onClick={() => setOpen(false)}
            >Cancel</AlertDialogCancel>

            <form action={handleDeleteNote}>
                <AlertDialogAction type="submit"
                className="bg-destructive hover:bg-destructive hover:brightness-110"
                disabled={isPending}
                >
                    {isPending ? "Deleting Note..." : "Delete Note"}
                </AlertDialogAction>
            </form>
        </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
}

export default DeleteButton