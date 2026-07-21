import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	return {
		define: {
			"import.meta.env": env
		},
		plugins: [react()],
	};
});
