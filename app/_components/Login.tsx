"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, LogIn, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingEmail(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.ok) {
        toast({
          title: "✅ Login Successful",
          description: "Redirecting to dashboard...",
        });
        setTimeout(() => router.push("/dashboard"), 800);
      } else {
        toast({
          title: "Invalid credentials",
          description: "Please check your email and password.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    toast({
      title: "Logging in...",
      description: "Redirecting to Google sign-in...",
    });
    try {
      await signIn("google");
    } catch {
      toast({
        title: "Google sign-in failed",
        description: "Please try again.",
        variant: "destructive",
      });
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm shadow-xl rounded-2xl border border-gray-500 animate-fadeIn">
        <CardContent className="p-6 space-y-6">
         
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
              Welcome Back👋
            </h1>
            <p className="text-sm text-gray-500">Log in to access your dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" aria-busy={loadingEmail}>
         
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loadingEmail || loadingGoogle}
                  className="pl-9"
                  required
                />
              </div>
            </div>

           
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loadingEmail || loadingGoogle}
                  className="pl-9 pr-9"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>


            <Button
              type="submit"
              className="w-full bg-[#2196F3] hover:bg-[#1976D2] text-white font-medium transition"
              disabled={loadingEmail || loadingGoogle}
            >
              {loadingEmail ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Log In
                </>
              )}
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

         
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-gray-500"
            disabled={loadingGoogle || loadingEmail}
          >
            {loadingGoogle ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redirecting...
              </>
            ) : (
              <>
                <img
                  src="icons8-google.svg"
                  alt="Google"
                  className="w-4 h-4"
                />
                Sign in with Google
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
