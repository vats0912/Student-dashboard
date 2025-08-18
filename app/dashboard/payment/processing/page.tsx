
"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentProcessingPage() {
  const [processing, setProcessing] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setProcessing(false);

      
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] px-4 text-center">
      <Card className="w-full max-w-md shadow-xl border-primary border-2">
        <CardHeader>
          <CardTitle className="text-2xl">
            {processing ? "Processing Payment..." : "Payment Successful!"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {processing ? (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
              <p className="text-gray-600">Your transaction is being processed.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <p className="text-green-700 font-medium">Payment was successful.</p>
              <p className="text-sm ">Redirecting to dashboard...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
