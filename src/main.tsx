import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./contexts/app.context";
import App from "./App";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			//Không tự động gọi lại API khi người dùng quay lại tab trình duyệt (ví dụ chuyển sang tab khác rồi quay lại)
			refetchOnWindowFocus: false,
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<AppProvider>
					<App />
				</AppProvider>
				<ToastContainer />
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>,
);
