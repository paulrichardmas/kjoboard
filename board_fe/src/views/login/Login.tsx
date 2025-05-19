import React from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

import type { ILoginForm } from "./ILogin";
import { useLogin } from "./useLogin";
import AuthLayout from "../../layout/AuthLayout";
import Input from "../../components/Input/Input";

const Login = () => {
  const { register, handleSubmit } = useForm<ILoginForm>();
  const { loginAsync } = useLogin();
  const onSubmit = (data) => loginAsync(data);

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold mb-2">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <Input {...register("username")} />
        <div className="h-4" />
        <label>Password</label>
        <Input type="password" {...register("password")} />
        <div className="h-4" />
        <input
          className="p-2 rounded-lg bg-blue-500 text-white w-full hover:cursor-pointer hover:bg-blue-400"
          type="submit"
          value="Login"
        />
        <div className="h-4" />
        <p>
          Go to{" "}
          <Link to="/register" className="text-blue-500 underline">
            Sign up!
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
