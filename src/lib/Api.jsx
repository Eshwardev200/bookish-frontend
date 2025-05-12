import { toast } from "sonner";
import { Axios } from "./Axios";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllBooks = () => {
  const { setData } = useAuth();

  return useQuery({
    queryKey: ["Books"],
    queryFn: async () => {
      const response = await Axios.get("/books");
      setData(response.data.data);
      return response.data.data;
    },
    staleTime: 0,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("Books fetch failed:", error.message);
      toast.error("Failed to load books.");
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { setLoading } = useAuth();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await Axios.post("/login", { email, password });
      return res.data;
    },
    onMutate: () => setLoading(true),
    onSuccess: async (data) => {
      setLoading(false);
      localStorage.setItem("authToken", data?.authorization?.token);
      toast.success("Login successful!");
      navigate("/");
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.response?.data?.message || "Invalid login credentials");
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const { setLoading } = useAuth();

  return useMutation({
    mutationFn: async ({ name, email, password }) => {
      const res = await Axios.post("/register", { name, email, password });
      return res.data;
    },
    onMutate: () => setLoading(true),
    onSuccess: async (data) => {
      setLoading(false);
      localStorage.setItem("authToken", data?.authorization?.token);
      toast.success("Account created successfully!");
      navigate("/");
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.response?.data?.error || "Registration failed");
    },
  });
};

export const useCreateBook = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setLoading } = useAuth();

  return useMutation({
    mutationFn: async (newBook) => {
      setLoading(true);
      const response = await Axios.post("/books", newBook);
      return response.data;
    },
    onSuccess: () => {
      setLoading(false);
      toast.success("Book created successfully!");
      queryClient.invalidateQueries({ queryKey: ["Books"] });
      navigate("/");
    },
    onError: (error) => {
      setLoading(false);
      const errors = error?.response?.data?.errors;
      if (errors && typeof errors === "object") {
        Object.values(errors)
          .flat()
          .forEach((err) => toast.error(err));
      } else {
        toast.error("Something went wrong while creating the book.");
      }
    },
  });
};

export const useEditBook = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setLoading } = useAuth();

  return useMutation({
    mutationFn: async ({ id, updatedBook }) => {
      setLoading(true);
      const response = await Axios.put(`/books/${id}`, updatedBook);
      return response.data;
    },
    onSuccess: () => {
      setLoading(false);
      toast.success("Book updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["Books"] });
      navigate("/");
    },
    onError: (error) => {
      setLoading(false);
      const errors = error?.response?.data?.errors;
      if (errors && typeof errors === "object") {
        Object.values(errors)
          .flat()
          .forEach((err) => toast.error(err));
      } else {
        toast.error("Failed to update the book.");
      }
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await Axios.delete(`/books/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Book deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["Books"] });
    },
    onError: (error) => {
      toast.error("Could not delete the book.");
      console.error("Delete error:", error);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const response = await Axios.post("/logout");
      return response.data;
    },
    onSuccess: () => {
      localStorage.removeItem("authToken");
      toast.success("Logout successful!");
      navigate("/login");
    },
    onError: () => {
      localStorage.removeItem("authToken");
      navigate("/login");
    },
  });
};
