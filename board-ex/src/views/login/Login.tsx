import { useForm } from "react-hook-form"

import type { ILoginForm } from "./ILogin"
import { useLogin } from "./useLogin"

const Login = () => {
  const { register, handleSubmit } = useForm<ILoginForm>()
  const { loginAsync } = useLogin()
  const onSubmit = (data) => loginAsync(data)

  return (
    <div className="p-3">
      <h1 className="text-lg mb-2">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input
          className="border border-slate-500 rounded-md p-2 w-full block mb-2"
          {...register("username")}
        />
        <label>Password</label>
        <input
          className="border border-slate-500 rounded-md p-2 w-full block"
          type="password"
          {...register("password")}
        />
        <br />
        <input
          className="p-2 rounded-lg bg-blue-500 text-white w-full hover:cursor-pointer hover:bg-blue-400"
          type="submit"
          value="Login"
        />
      </form>
    </div>
  )
}

export default Login
