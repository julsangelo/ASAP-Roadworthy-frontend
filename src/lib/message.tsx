import { toast } from "sonner";
import { XCircle, Info, CircleCheck } from "lucide-react";

export function showSuccess(message: string) {
  toast.success(message, {
    icon: <CircleCheck className="h-5 w-5 text-green-500" />,
  });
}

export function showError(message: string) {
  toast.error(message, {
    icon: <XCircle className="h-5 w-5 text-red-500" />,
  });
}

export function showInfo(message: string) {
  toast(message, {
    icon: <Info className="h-5 w-5 text-blue-500" />,
  });
}
