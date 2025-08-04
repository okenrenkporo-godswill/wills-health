"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Link, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore"; // Make sure this is correct

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters." })
    .max(12, { message: "Password must be at most 12 characters." }),
});

function Register() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        // Save auth and redirect to dashboard
        setAuth(data.username, data.token);
        toast.success("Account created successfully 🎉");
        router.push("/user/dashboard");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      // no unused variable now
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md bg-white shadow-xl rounded-xl border border-blue-100 p-6">
      {/* Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-50 rounded-xl">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-2" />
          <p className="text-sm font-medium text-blue-800">
            Creating account...
          </p>
        </div>
      )}

      <h2 className="text-2xl font-bold text-primary mb-2">
        Create Your Wills Health Account
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Join us and start managing your health smarter.
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
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-blue-800 text-white"
            disabled={loading}
          >
            Register
          </Button>

          {/* Link to Login */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default Register;
