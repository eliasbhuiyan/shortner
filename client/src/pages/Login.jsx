import React from "react";
import { Link } from "react-router";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm } from "react-hook-form";
import { authServices } from "../api";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const handelLogin = async (data) => {
    try {
      const res = await authServices.login(data);
      console.log(res);
    } catch (error) {
      console.log(error);

      setError("apiError", {
        message: error?.response?.data?.message || "Server error",
      });
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(handelLogin)} className="w-xl">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </p>
              <Input
                label="Email"
                type="email"
                placeholder="Enter your Email address"
                {...register("email", { required: "Email is required" })}
                error={errors?.email?.message}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your Password"
                {...register("password", { required: "Password is required" })}
                error={errors?.password?.message}
              />
              {errors?.apiError?.message && (
                <p className="text-base text-red-500">
                  {errors.apiError.message}
                </p>
              )}
              <Button type="submit">Login</Button>
              <p>
                Don't have any account?{" "}
                <Link to="/registration" className="text-brand">
                  Registration
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
