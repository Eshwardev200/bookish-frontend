import BookForm from "@/components/BookForm";
import { useCreateBook } from "@/lib/Api";

const CreateBook = () => {
  const { mutate: createBook } = useCreateBook();

  const fields = [
    {
      name: "title",
      label: "Title",
      placeholder: "The Great Gatsby",
      defaultValue: "",
    },
    {
      name: "author",
      label: "Author",
      placeholder: "F. Scott Fitzgerald",
      defaultValue: "",
    },
    {
      name: "publication_year",
      label: "Publication Year",
      placeholder: "1925",
      type: "number",
      defaultValue: "",
    },
  ];


  return (
    <main className="flex items-center justify-center h-[calc(100svh_-_76px)] p-4">
      <BookForm
        formTitle="Create Book"
        submitLabel="Create Book"
        fields={fields}
        handler={createBook}
      />
    </main>
  );
};

export default CreateBook;
