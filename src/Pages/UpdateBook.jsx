import BookForm from "@/components/BookForm";
import { useEditBook } from "@/lib/Api";
import { Axios } from "@/lib/Axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthProvider";

const UpdateBook = () => {
  const { id } = useParams();
  const {data} = useAuth()
  const [book, setBook] = useState(null);
  const queryClient = useQueryClient();


  const getBookData = async () => {
    try {
      const res = await Axios.get(`/books/${id}`);
      setBook(res.data);
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  useEffect(() => {
    if (data) {
      const bookData = data.find((book) => book.id == id);
      setBook({ data: bookData });
    }else {
      getBookData();
    }
  }, [id,data]);

  const fields = [
    {
      name: "title",
      label: "Title",
      placeholder: "The Great Gatsby",
      defaultValue: book?.data?.title || "",
    },
    {
      name: "author",
      label: "Author",
      placeholder: "F. Scott Fitzgerald",
      defaultValue: book?.data?.author || "",
    },
    {
      name: "publication_year",
      label: "Publication Year",
      placeholder: "1925",
      type: "number",
      defaultValue: book?.data?.publication_year || "",
    },
  ];

  const { mutate: editBook } = useEditBook({
    onSuccess: () => {
      queryClient.invalidateQueries(["Books"]);
    },
    onError: (error) => {
      console.error("Error editing book:", error);
    },
  });

  const handleSubmit = (values) => {
    editBook({ id, updatedBook: values });
  };

  if (!book) {
    return (
      <div className="flex items-center justify-center w-full h-[calc(100svh_-_76px)]">
        <Loader className="size-12 text-white" />
      </div>
    );
  }

  return (
    <main className="flex items-center justify-center h-[calc(100svh_-_76px)] p-4">
      <BookForm
        formTitle="Edit Book"
        fields={fields}
        handler={handleSubmit}
      />
    </main>
  );
};

export default UpdateBook;
