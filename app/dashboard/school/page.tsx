"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { schoolData } from "@/app/data/schoolData";
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
import { Input } from "@/components/ui/input";

export default function SchoolPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // 🔎 Memoized filtering for performance
  const filteredSchools = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return schoolData.filter((school) =>
      `${school.name} ${school.location}`.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Explore Schools
        </h2>
        <Input
          type="search"
          placeholder="Search schools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-700 dark:border-gray-800 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-900/50 border-gray-500">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Total Fees</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchools.length > 0 ? (
              filteredSchools.map((school) => {
                const totalFees =
                  school.fees.tuition +
                  school.fees.library +
                  school.fees.lab;

                return (
                  <TableRow
                    key={school.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-gray-500"
                  >
                    <TableCell className="font-medium text-gray-900 dark:text-white">
                      {school.name}
                    </TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">
                      {school.location}
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      ₹{totalFees.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2 border-gray-300 hover:border-purple-500 hover:text-purple-600"
                          >
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg rounded-xl">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                              {school.name}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p className="text-gray-700 dark:text-gray-300">
                              <strong> Location:</strong> {school.location}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              <strong> Description:</strong>{" "}
                              {school.description}
                            </p>
                            <div>
                              <strong className="block text-gray-800 dark:text-gray-200 mb-1">
                                 Fees Breakdown:
                              </strong>
                              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                <li>Tuition: ₹{school.fees.tuition}</li>
                                <li>Library: ₹{school.fees.library}</li>
                                <li>Lab: ₹{school.fees.lab}</li>
                              </ul>
                            </div>
                            <Button
                              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                              onClick={() =>
                                router.push("/dashboard/payment")
                              }
                            >
                               Pay Now
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => router.push("/dashboard/payment")}
                      >
                        Pay
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No schools matched your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
