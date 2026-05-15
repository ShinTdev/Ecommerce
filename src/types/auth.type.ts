import type { SusscessResponse } from "./utils.type";
import type { User } from "./user.type";

export type AuthResponse = SusscessResponse<{
	access_token: string;
	expires: string;
	user: User;
}>;
