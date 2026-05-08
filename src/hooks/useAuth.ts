import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: any) => {
      const { data, error } = await signUp.email(payload);
      if (error) throw new Error(error.message || "Signup failed");
      return data;
    },
    onSuccess: () => {
      toast.success("Account created successfully! Please login.");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
