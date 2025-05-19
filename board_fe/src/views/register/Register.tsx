import React from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import type { IRegisterForm } from "./IRegister";
import AuthLayout from "../../layout/AuthLayout";
import Input from "../../components/Input/Input";
import { useRegister } from "./useRegister";

const Register = () => {
  const { registerAsync } = useRegister();
  const { register, handleSubmit } = useForm<IRegisterForm>();
  const onSubmit = (data) => registerAsync(data);
  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold mb-2">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <Input {...register("username")} />
        <div className="h-4" />
        <label>Password</label>
        <Input {...register("password")} type="password" />
        <div className="h-4" />

        <input
          className="p-2 rounded-lg bg-blue-500 text-white w-full hover:cursor-pointer hover:bg-blue-400"
          type="submit"
          value="Submit"
        />
        <div className="h-4" />
        <p>
          Go to{" "}
          <Link to="/login" className="text-blue-500 underline">
            Sign in!
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
