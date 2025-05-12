import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProtectedRoutes from "./lib/ProtectedRoutes";
import LoginPage from "./Pages/LoginPage";
import { AuthProvider } from "./context/AuthProvider";
import Register from "./Pages/RegisterPage";
import { Toaster } from "sonner";
import MainLayout from "./Layout/MainLayout";
import CreateBook from "./Pages/CreateBook";
import UpdateBook from "./Pages/UpdateBook";

const App = () => {
  return (
    <>
      <Toaster
        theme="system"
        toastOptions={{
          classNames: {
            toast: "bg-popover text-popover-foreground border border-popover",
          },
        }}
      />

      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Register />} />

            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <MainLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<HomePage />} />
              <Route path="create-book" element={<CreateBook />} />
              <Route path="edit-book/:id" element={<UpdateBook />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
