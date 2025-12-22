import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router";
import { authServices } from "../api";

const Registration = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await authServices.registration(data);
      console.log(res);
      navigate("/login")
    } catch (error) {
      if (
        error.response.data.message === "User with this email already exist"
      ) {
        return setError("email", {
          message: error.response.data.message,
        });
      }
      setError("apiError", {
        message: error.response.data.message,
      });
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-xl">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </p>
              <Input
                {...register("fullName", { required: "Full Name is required" })}
                label="Full Name"
                placeholder="Enter your full name"
                error={errors?.fullName?.message}
              />
              <Input
                {...register("email", { required: "Email is required" })}
                label="Email"
                type="email"
                placeholder="Enter your Email address"
                error={errors?.email?.message}
              />
              <Input
                {...register("password", { required: "Passwird is required" })}
                label="Password"
                type="password"
                placeholder="Enter your Password"
                error={errors?.password?.message}
              />
              {errors?.apiError?.message && (
                <p className="text-base text-red-500">
                  {errors.apiError.message}
                </p>
              )}
              <Button type="submit">Create an account</Button>
              <p>
                Already have an account?.{" "}
                <Link to="/login" className="text-brand">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Registration;
