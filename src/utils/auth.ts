import type { User } from "../types/user.type";

export const saveAccessToken = (access_token: string) => {
	localStorage.setItem("access_token", access_token);
};

export const getAccessToken = () => localStorage.getItem("access_token") || "";

export const clearLS = () => {
	localStorage.removeItem("access_token");
	localStorage.removeItem("profile");
};

export const setProfileFromLS = (profile: User) => {
	localStorage.setItem("profile", JSON.stringify(profile));
};

export const getProfileToLS = () => {
	const result = localStorage.getItem("profile");
	return result ? JSON.parse(result) : null;
};
