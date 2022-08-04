import { toast } from "react-toastify"

export const postSuccess = (message:string) => {
  toast.success(message);
}

export const postError = (message: string) => {
  toast.error(message);
}