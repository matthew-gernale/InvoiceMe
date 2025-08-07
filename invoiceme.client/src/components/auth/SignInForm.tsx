import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";

import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";

import type { LoginDTO } from '../../@types/auth.type';
import authService from '../../services/authService';
import { useAuthStore } from "../../stores";
import Alert from '../../components/ui/alert/Alert'
import { stringIsNullOrEmpty } from "../../utilities/helpers";

class InvalidInput {
    type: string = 'input';
    message: string = '';
    isInvalid: boolean = false;

    constructor(init?: Partial<InvalidInput>) {
        Object.assign(this, init);
    }
}

export default function SignInForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isBtnLoading, setBtnLoading] = useState(false);
    const [isInvalidInput, setInvalidInput] = useState(new InvalidInput());

    const accessToken = useAuthStore((state) => state.accessToken);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isSubmitted },
    } = useForm<LoginDTO>()


    useEffect(() => {
        if (accessToken) {
            navigate("/dashboard", { replace: true });
        }

    }, [accessToken, navigate]);

    const onSubmit = async (data: LoginDTO) => {
        setBtnLoading(true);
        setInvalidInput(new InvalidInput());

        try {
            const response = await authService.login(data);

            if (!stringIsNullOrEmpty(response)) {

                switch (response) {
                    case 'ADMIN':
                        navigate('/');
                        break;

                    case 'CLIENT':
                        navigate('/client-dashboard');
                        break;
                }
            }
            else setInvalidInput({ type: 'credentials', message: 'Invalid credentials.', isInvalid: true });
        } catch (error) {
            console.error('Login error', error);
            setInvalidInput({ type: 'credentials', message: 'Invalid credentials.', isInvalid: true });
        }

        setBtnLoading(false);
    };

  return (
    <div className="relative flex flex-col flex-1 items-center justify-center">
          <div className='relative z-20 flex flex-col bg-white/20 backdrop-blur-[3px] border border-gray-200 rounded-3xl h-fit w-fit p-[20px]'>
              <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                  <div>
                      <div className="mb-5 sm:mb-8">
                          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                              Sign In
                          </h1>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                              Enter your email and password to sign in!
                          </p>
                      </div>
                      <div>
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
                              <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                                  <FcGoogle />
                                  Sign in with Google
                              </button>
                              <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                                  <FaXTwitter />
                                  Sign in with X
                              </button>
                          </div>
                          <div className="relative py-3 sm:py-5">
                              <div className="absolute inset-0 flex items-center">
                                  <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                              </div>
                              <div className="relative flex justify-center text-sm">
                                  <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                                      Or
                                  </span>
                              </div>
                          </div>
                          <form onSubmit={handleSubmit(onSubmit)}>
                              {
                                  isInvalidInput.type === 'credentials' && isInvalidInput.isInvalid === true &&
                                  <div className='pb-[30px]'>
                                      <Alert variant='error' title='Login Failed' message={isInvalidInput.message} />
                                  </div>
                              }
                              {
                                  isInvalidInput.type === 'input' && isInvalidInput.isInvalid === true &&
                                  <div className='pb-[30px]'>
                                      <Alert variant='warning' title='Invalid Input' message={isInvalidInput.message} />
                                  </div>
                              }

                              <div className="space-y-6">
                                  <div>
                                      <Label>
                                          Email <span className="text-error-500">*</span>{" "}
                                      </Label>
                                      <Input
                                          placeholder="example@gmail.com"
                                          type="text"
                                          {...register("Email", {
                                              required: "Email is required",
                                              pattern: {
                                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                  message: "Invalid email address",
                                              },
                                          })}
                                          error={!!errors.Email}
                                          hint={
                                              touchedFields.Email || isSubmitted
                                                  ? errors.Email?.message
                                                  : ""
                                          } />
                                  </div>
                                  <div>
                                      <Label>
                                          Password <span className="text-error-500">*</span>{" "}
                                      </Label>
                                      <div className="relative">
                                          <Input
                                              type={showPassword ? "text" : "password"}
                                              placeholder="Enter your password"
                                              {...register("Password", { required: "Password is required" })}
                                              error={!!errors.Password}
                                              hint={
                                                  touchedFields.Password || isSubmitted
                                                      ? errors.Password?.message
                                                      : ""
                                              } />
                                          <span
                                              onClick={() => setShowPassword(!showPassword)}
                                              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                          >
                                              {showPassword ? (
                                                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                              ) : (
                                                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                              )}
                                          </span>
                                      </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                          <Checkbox checked={isChecked} onChange={setIsChecked} />
                                          <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                                              Keep me logged in
                                          </span>
                                      </div>
                                      <Link
                                          to="/reset-password"
                                          className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                      >
                                          Forgot password?
                                      </Link>
                                  </div>
                                  <div>
                                      <Button
                                          className={`primary-btn
                                                ${(isBtnLoading ? 'opacity-50 cursor-not-allowed' : '')}`}
                                          disabled={isBtnLoading}
                                          size="sm"
                                          type='submit'
                                      >
                                          Sign in
                                      </Button>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>


          <div className="absolute inset-0 w-full h-full">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white/10 z-10"></div>

              {/* Background image */}
              <img
                  src="/images/bg/crypto-bg.png"
                  alt="crypto bg"
                  className="w-full h-full object-cover object-center"
              />
          </div>
    </div>
  );
}
