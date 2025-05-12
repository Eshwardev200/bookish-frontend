import { LoginForm } from "@/components/login-form";
import { useRegister } from "@/lib/Api";
import React from "react";

const Register = () => {
  const { mutate: register } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    register({
      name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    });
  };

  const data = {
    title: "create an account",
    button: "Create Account",
    inputs: [
      { Label: "username", type: "text", placeholder: "username" },
      { Label: "email", type: "email", placeholder: "m@example.com" },
      { Label: "password", type: "password", placeholder: "your password" },
    ],
    footer: {
      redirectPath: "/login",
      redirectText: "Already have an account?",
      text: "Login",
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

export default Register;
