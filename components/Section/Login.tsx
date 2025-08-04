"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, Link, Loader2 } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  password: z.string().min(4, "Minimum 4 characters"),
});

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        useAuthStore.getState().setAuth(data.username, data.token);
        toast.success("Login Successful");
        router.push("/user/dashboard");
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md bg-white shadow-xl rounded-xl border border-blue-100 p-6">
      {/* Overlay Loader */}
      {loading && (
        <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-50 rounded-xl">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-2" />
          <p className="text-sm font-medium text-blue-800">Logging in...</p>
        </div>
      )}

      <h2 className="text-2xl font-bold text-primary mb-2">
        Welcome Back To Wills Health
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Smarter health starts here — track, process and improve.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      className="pr-10"
                    />
                  </FormControl>
                  <div
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-primary" />
              Remember me
            </label>
            <a href="#" className="text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-blue-800 text-white"
            disabled={loading}
          >
            Login
          </Button>

          {/* Google login */}
          <div className="text-center text-sm text-gray-500 mt-4">
            or login with
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full flex justify-center gap-2 text-gray-700 border-gray-300"
          >
            <Image src="/goggle.png" alt="Google" width={20} height={20} />
            Continue With Google
          </Button>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600">
            Dont have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Login;
