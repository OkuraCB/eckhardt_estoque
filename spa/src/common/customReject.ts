import axios from "axios";

export const customReject = (e: any, rejectWithValue: any) => {
	if (axios.isAxiosError(e) && e.response) {
		return rejectWithValue(e.response.data);
	}

	return rejectWithValue({ message: "Um erro inesperado ocorreu." });
};
