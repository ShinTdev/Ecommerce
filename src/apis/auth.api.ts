import http from "../utils/http";

const authApi = {
	loginAccount(body: { email: string; password: string }) {
		return http.post("/login", body);
	},

	RegisterAccount(body: { email: string; password: string }) {
		return http.post("/register", body);
	},

	logoutAccount() {
		return http.post("/logout");
	},
};

export default authApi;
