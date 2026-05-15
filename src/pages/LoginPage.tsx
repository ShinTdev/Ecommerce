import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { schema, type Schema } from "../schema/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "../components/Input/Input";

import authApi from "../apis/auth.api";

import { useMutation } from "@tanstack/react-query";

import { Link, useNavigate } from "react-router-dom";

import { isUnprocessableEntityError } from "../utils/utils";
import type { ErrorResponse } from "../types/utils.type";
import { AppContext } from "../contexts/app.context";
import Button from "../components/Button/Button";
import path from "../constants/path";

type LoginFormValue = Pick<Schema, "email" | "password">;

const loginSchema = schema.pick(["email", "password"]);

export default function LoginPage() {
	const { setIsAuthenticated, setProfile } = useContext(AppContext);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		formState: { errors },
	} = useForm<LoginFormValue>({
		resolver: yupResolver(loginSchema),
	});

	const mutaionLogin = useMutation({
		mutationFn: (body: LoginFormValue) => authApi.loginAccount(body),
	});

	const onSubmitLogin = handleSubmit((data) => {
		mutaionLogin.mutate(data, {
			onSuccess: (data) => {
				setIsAuthenticated(true);
				setProfile(data.data.data.user);
				navigate("/");
			},
			onError: (error) => {
				console.log(error);
				if (isUnprocessableEntityError<ErrorResponse<LoginFormValue>>(error)) {
					const formError = error.response?.data.data;

					if (formError) {
						Object.keys(formError).forEach((key) => {
							setError(key as keyof LoginFormValue, {
								message: formError[key as keyof LoginFormValue],
								type: "Server",
							});
						});
					}

					// if (formError?.email) {
					// 	setError("email", {
					// 		message: formError.email,
					// 		type: "Server",
					// 	});
					// }
					// if (formError?.password) {
					// 	setError("password", {
					// 		message: formError.password,
					// 		type: "Server",
					// 	});
					// }
				}
			},
		});
	});

	return (
		<div className="grid grid-cols-2 gap-8 ">
			<div className="p-4 rounded-xl border border-roundedColor">
				<h4 className="text-p20 font-medium mb-4">New Customer</h4>
				<p className="mb-5">
					By creating an account you will be able to shop faster, be up to date on an
					order's status, and keep track of the orders you have previously made.
				</p>
				<Link
					to={path.register}
					className="mt-8 bg-bgButton text-white text-white-200 px-8 py-2 rounded-full font-bold cursor-pointer"
				>
					Create Account
				</Link>
			</div>
			<div className="p-4 rounded-xl border border-roundedColor">
				<h4 className="text-p20 font-medium mb-4">Login</h4>
				<p className="mb-5">If you have an account, please log in.</p>
				<form onSubmit={onSubmitLogin}>
					<Input
						register={register("email")}
						type="text"
						errorMessage={errors.email?.message}
						name="email"
						placeholder="Enter Email"
						classNameInput="w-full border border-custom py-3 px-4 rounded-full font-14 outline-none"
					/>

					<Input
						register={register("password")}
						type="password"
						classNameInput="mt-5 w-full border border-custom py-3 px-4 rounded-full font-14 outline-none"
						errorMessage={errors.password?.message}
						name="password"
						placeholder="Enter Password"
					/>

					<Button
						className="mt-8 mx-auto flex items-center justify-center w-[200px]  text-center bg-bgButton text-white text-white-200 px-8 py-2 rounded-full font-bold cursor-pointer"
						type="submit"
						isLoading={mutaionLogin.isPending}
						disabled={mutaionLogin.isPending}
					>
						Sign In
					</Button>
				</form>
			</div>
		</div>
	);
}
