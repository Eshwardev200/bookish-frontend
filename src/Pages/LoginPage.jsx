import { LoginForm } from "@/components/login-form";
import { useLogin } from "@/lib/Api";
import React from "react";

const LoginPage = () => {
  const { mutate: login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      email: e.target.email.value,
      password: e.target.password.value,
    });
  };

  const data = {
    title: "Login to your account",
    button: "Login",
    inputs: [
      { Label: "email", type: "email", placeholder: "m@example.com" },
      { Label: "password", type: "password", placeholder: "your password" },
    ],
    footer: {
      redirectPath: "/signup",
      redirectText: "Don't have an account?",
      text: "Signup",
    },
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm handler={handleSubmit} data={data} />
      </div>
    </div>
  );
};

export default LoginPage;
