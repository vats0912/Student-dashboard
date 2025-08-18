"use client";

import { useState, useMemo } from "react";
import { paymentHistory } from "@/app/data/paymentHistory";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PaymentHistoryPage() {
  const [selectedPayment, setSelectedPayment] = useState<unknown>(null);

  const sortedPayments = useMemo(
    () =>
      [...paymentHistory].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    []
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
         Payment History
      </h2>

      <div className="overflow-x-auto rounded-xl border border-gray-700 dark:border-gray-800 shadow-sm">
        <Table >
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-900/50 border-gray-500">
              <TableHead className="font-semibold">Transaction ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedPayments.length > 0 ? (
              sortedPayments.map((payment) => {
                const isPaid = payment.status === "Paid";
                return (
                  <TableRow
                    key={payment.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-gray-500"
                  >
                    <TableCell className="font-mono text-black">
                      {payment.id}
                    </TableCell>

                    <TableCell className="font-semibold text-green-600">
                      ₹{payment.amount.toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          isPaid
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </TableCell>

                    <TableCell className="text-gray-600 dark:text-gray-300">
                      {payment.date}
                    </TableCell>

                    <TableCell className="text-gray-600 dark:text-gray-300">
                      {payment.method}
                    </TableCell>

                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedPayment(payment)}
                            className="border-gray-300 hover:border-purple-500 hover:text-purple-600"
                          >
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg rounded-xl">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                              Payment Details -{" "}
                              <span className="font-mono text-gray-600">
                                {payment.id}
                              </span>
                            </DialogTitle>
                          </DialogHeader>

                          <div className="space-y-3">
                            <DetailRow
                              label=" Amount"
                              value={`₹${payment.amount.toLocaleString(
                                "en-IN"
                              )}`}
                            />
                            <DetailRow
                              label=" Status"
                              value={payment.status}
                            />
                            <DetailRow
                              label=" Method"
                              value={payment.method}
                            />
                            <DetailRow
                              label=" Date"
                              value={payment.date}
                            />
                            <DetailRow
                              label=" Details"
                              value={payment.details}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No payments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-gray-700 dark:text-gray-300">
      <strong>{label}:</strong> {value}
    </p>
  );
}
