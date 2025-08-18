"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function PaymentPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    amount: "",
    cardNo: "",
    expiry: "",
    cvv: "",
  });

  
  const handleChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === "cardNo") {
      formattedValue = value.replace(/\D/g, "").slice(0, 16);
      formattedValue = formattedValue.replace(/(.{4})/g, "$1 ").trim();
    }

    if (field === "expiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 4)
        .replace(/(\d{2})(\d{1,2})?/, (_, m1, m2) =>
          m2 ? `${m1}/${m2}` : m1
        );
    }

    if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setForm((prev) => ({ ...prev, [field]: formattedValue }));
  };


  const validateForm = () => {
    const { amount, cardNo, expiry, cvv } = form;

    if (!amount || Number(amount) <= 0) {
      return "Please enter a valid amount";
    }
    if (cardNo.replace(/\s/g, "").length !== 16) {
      return "Please enter a valid 16-digit card number";
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      return "Please enter expiry in MM/YY format";
    }
    if (cvv.length !== 3) {
      return "Please enter a valid 3-digit CVV";
    }
    return null;
  };

  const handlePayment = () => {
    const error = validateForm();
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
      return;
    }

    toast({
      title: "Payment Initiated",
      description: "Processing your payment securely...",
    });

    setTimeout(() => {
      router.push("/dashboard/payment/processing");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md border border-gray-700 dark:border-gray-800 shadow-lg rounded-xl bg-white dark:bg-gray-950">
        <CardContent className="space-y-6 p-6">
          <header className="space-y-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Make a Payment
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your payment is processed securely with encrypted details.
            </p>
          </header>

         
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (INR)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={form.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                aria-label="Payment amount"
                className="focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="card">Card Number</Label>
              <Input
                id="card"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={form.cardNo}
                onChange={(e) => handleChange("cardNo", e.target.value)}
                aria-label="Card number"
                className="tracking-widest focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="expiry">Expiry</Label>
                <Input
                  id="expiry"
                  type="text"
                  placeholder="MM/YY"
                  value={form.expiry}
                  onChange={(e) => handleChange("expiry", e.target.value)}
                  aria-label="Expiry date"
                  className="focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex-1 space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  placeholder="123"
                  value={form.cvv}
                  onChange={(e) => handleChange("cvv", e.target.value)}
                  aria-label="CVV security code"
                  className="focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <Button
              onClick={handlePayment}
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white"
              aria-label="Pay now"
            >
              Pay Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
