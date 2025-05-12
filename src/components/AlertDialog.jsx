import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AlertDialogBox = ({ varient, id, handleDelete, item }) => {
  const navigate = useNavigate()

  return varient == "view" ? (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="w-full px-2 justify-start bg-transparent text-white font-normal hover:bg-stone-800"
        >
          View Details
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Book Details</AlertDialogTitle>
          <AlertDialogDescription>
            Title: {item.title}
          </AlertDialogDescription>
          <AlertDialogDescription>Author: {item.author}</AlertDialogDescription>
          <AlertDialogDescription>Published Year: {item.publication_year}</AlertDialogDescription>
          <AlertDialogDescription>Created_at: {item.created_at}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction onClick={() => navigate(`/edit-book/${item.id}`)}>
            Edit Book
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) : (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full bg-red-500 hover:bg-red-600 mt-2 text-white">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            You sure you want to delete this book?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Once deleted, this book will be
            permanently removed from the library and cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogBox;
