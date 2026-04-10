import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export function showSuccessToast(title: string) {
  return Toast.fire({ icon: "success", title });
}

export function showErrorToast(title: string) {
  return Toast.fire({ icon: "error", title });
}

export function showInfoToast(title: string) {
  return Toast.fire({ icon: "info", title });
}

export function showWarningToast(title: string) {
  return Toast.fire({ icon: "warning", title });
}

export { Swal, Toast };

