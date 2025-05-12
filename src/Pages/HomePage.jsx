import { BookTable } from "@/components/BookTable";
import { useAllBooks, useDeleteBook } from "@/lib/Api";
import React from "react";

const HomePage = () => {
  const { data, isLoading } = useAllBooks();
  let fieldsToRemove = ["updated_at"];

  const { mutate: deleteBook} = useDeleteBook(); 

  const handleDelete = (id) => {
      deleteBook(id);
  };

  let cleanedData = data?.map((obj) => {
    fieldsToRemove.forEach((field) => {
      delete obj[field];
    });
    return obj;
  });
  
  return (
    <div className="w-full px-5 py-10">
      <h1 className="text-4xl font-bold mb-2">Book Collection</h1>
      <p className="text-xl text-zinc-300">
        Browse your personal library of books
      </p>
      <BookTable handleDelete={handleDelete} isLoading={isLoading} data={isLoading ? [] : cleanedData} />
    </div>
  );
};

export default HomePage;
