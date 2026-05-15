import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { schema, type Schema } from "../schema/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/Input/Input";
import { useMutation } from "@tanstack/react-query";
import authApi from "../apis/auth.api";
import { isUnprocessableEntityError } from "../utils/utils";
import type { ErrorResponse } from "../types/utils.type";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/app.context";

type RegisterFormValue = Pick<Schema, "email" | "password" | "confirm_password">;

const registerSchema = schema.pick(["email", "password", "confirm_password"]);

export default function RegisterPage() {
	const { setIsAuthenticated, setProfile } = useContext(AppContext);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		formState: { errors },
	} = useForm<RegisterFormValue>({
		resolver: yupResolver(registerSchema),
	});

	const mutationRegister = useMutation({
		mutationFn: (body: Omit<RegisterFormValue, "confirm_password">) =>
			authApi.RegisterAccount(body),
	});

	const onSubmitRegister = handleSubmit((data) => {
		mutationRegister.mutate(data, {
			onSuccess: (data) => {
				setIsAuthenticated(true);
				setProfile(data.data.user);
				navigate("/");
			},

			onError: (error) => {
				console.log(error);
				if (
					isUnprocessableEntityError<
						ErrorResponse<Omit<RegisterFormValue, "confirm_password">>
					>(error)
				) {
					const formError = error.response?.data.data;

					if (formError) {
						Object.keys(formError).forEach((key) => {
							setError(key as keyof Omit<RegisterFormValue, "confirm_password">, {
								message:
									formError[key as keyof Omit<RegisterFormValue, "confirm_password">],
								type: "Server",
							});
						});
					}
				}
			},
		});
	});

	return (
		<div className="p-4  w-[800px] mx-auto">
			<h4 className="font-48 font-bold text-center mb-8">Create account</h4>
			<form onSubmit={onSubmitRegister}>
				<Input
					register={register("email")}
					type="text"
					className="w-full border border-custom py-3 px-4 rounded-full font-14 outline-none"
					errorMessage={errors.email?.message}
					name="email"
					placeholder="Enter Email"
				/>

				<Input
					register={register("password")}
					type="password"
					className="mt-5 w-full border border-custom py-3 px-4 rounded-full font-14 outline-none"
					errorMessage={errors.password?.message}
					name="password"
					placeholder="Enter Password"
				/>

				<Input
					register={register("confirm_password")}
					type="password"
					className="mt-5 w-full border border-custom py-3 px-4 rounded-full font-14 outline-none"
					errorMessage={errors.confirm_password?.message}
					name="confirm password"
					placeholder="Enter Confirm Password"
				/>

				<button
					className="mt-8 mx-auto flex item-center justify-center w-[200px]  text-center bg-bgButton text-white text-white-200 px-8 py-3 rounded-full font-bold cursor-pointer"
					type="submit"
				>
					Create
				</button>
			</form>
		</div>
	);
}
