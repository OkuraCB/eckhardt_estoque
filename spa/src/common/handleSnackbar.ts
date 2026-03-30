import { enqueueSnackbar } from "notistack";

export const handleSnackbar = (
  message: string | string[],
  type: "default" | "error" | "success" | "warning" | "info" | undefined
) => {
  if (Array.isArray(message))
    message.map((msg) => enqueueSnackbar(msg, { variant: type }));
  else enqueueSnackbar(message, { variant: type });
};
