import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import HttpStatusCode from "../constants/httpStatus.enum";
import { toast } from "react-toastify";
import type { AuthResponse } from "../types/auth.type";
import { clearLS, getAccessToken, saveAccessToken, setProfileFromLS } from "./auth";

class Http {
	instance: AxiosInstance;
	private accessToken: string;
	constructor() {
		this.accessToken = getAccessToken();
		this.instance = axios.create({
			baseURL: "https://api-ecom.duthanhduoc.com/",
			timeout: 10000,
			headers: {
				"Content-Type": "application/json",
			},
		});

		this.instance.interceptors.request.use(
			(config) => {
				if (this.accessToken && config.headers) {
					config.headers.authorization = this.accessToken;
					return config;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		this.instance.interceptors.response.use(
			(response) => {
				console.log(response);
				const { url } = response.config;

				if (url === "/login" || url === "/register") {
					const data = response.data as AuthResponse;
					this.accessToken = data.data.access_token;
					saveAccessToken(this.accessToken);
					setProfileFromLS(data.data.user);
				} else if (url === "/logout") {
					this.accessToken = "";
					clearLS();
				}

				return response;
			},
			function (error: AxiosError) {
				if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const data: any | undefined = error.response?.data;
					const message = data.message || error.message;
					toast.error(message);
				}
				return Promise.reject(error);
			}
		);
	}
}

const http = new Http().instance;

export default http;
