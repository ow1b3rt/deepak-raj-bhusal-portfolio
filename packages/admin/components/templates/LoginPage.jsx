"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import AnimatedCard from "@/components/atoms/AnimatedCard";
import { SafeImage } from "@/components/ui/safe-image";

import { getRuntimeConfig } from "../../lib/runtime.config.js";
import { Input } from "../atoms/Input.jsx";
import { Form } from "../molecules/Form.jsx";

export function LoginPage({ loginUrl = "/auth/login", redirectTo = "/admin/dashboard" }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(values) {
    setError(null);
    setLoading(true);

    const { apiBaseUrl } = getRuntimeConfig();
    const res = await fetch(`${apiBaseUrl}${loginUrl}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok || !data?.user) {
      setError(data?.errors?.[0]?.message ?? "Invalid email or password");
      return;
    }
    router.push(redirectTo);
  }

  return (
    <div className="bg-brand-soft flex min-h-screen items-center justify-center px-4">
      <AnimatedCard
        duration={1500}
        triggerOnView
        className="border-brand-peach bg-brand-peach bg container mx-auto flex max-h-160 min-h-96 max-w-5xl flex-col items-center overflow-hidden rounded-xl border shadow-xl md:flex-row"
      >
        <AnimatedCard
          durtaion={1000}
          triggerOnView
          direction="right"
          className="relative flex w-1/2! items-center justify-center md:p-8"
        >
          <SafeImage src="/images/web-logo.png" alt="Logo" width={900} height={1600} fill={false} />
        </AnimatedCard>

        <div className="flex w-full flex-col justify-between gap-8 px-4 py-4 md:w-1/2 md:px-8">
          <AnimatedCard
            durtaion={1000}
            triggerOnView
            direction="left"
            className="flex flex-col gap-2"
          >
            <h1 className="text-dark-orange text-2xl font-semibold md:text-4xl">Admin Login</h1>
            <p className="text-gray text-sm md:text-lg">Login to your admin panel</p>
          </AnimatedCard>

          <Form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            <AnimatedCard direction="down" triggerOnView className="flex flex-col gap-4">
              <Input
                inputClassName="text-primary-blue text-lg!"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="off"
                required
              />
              <div className="relative flex items-center">
                <Input
                  name="password"
                  inputClassName="text-primary-blue text-lg! pr-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="off"
                  required
                  className="w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  title={showPassword ? "Hide password" : "Show password"}
                  className="text-dark-orange hover:text-primary-blue absolute right-3 bottom-3 flex size-5 cursor-pointer items-center justify-center"
                >
                  {showPassword ? (
                    <EyeOff className="text-primary-green-dark" size={24} />
                  ) : (
                    <Eye size={18} className="text-primary-green-dark" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-brand-red mt-2 cursor-pointer rounded-md px-4 py-2 text-base font-medium text-white transition duration-500 ease-in-out hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </AnimatedCard>
          </Form>
        </div>
      </AnimatedCard>
    </div>
  );
}
