"use client";

import { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { schoolData } from "@/app/data/schoolData";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

export default function DashboardSchools() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  
  const autoplay = useRef(
    Autoplay({
      delay: 1500,
      stopOnInteraction: false, 
    })
  );

  const filteredSchools = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return schoolData.filter((school) =>
      `${school.name} ${school.location}`.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  return (
    <section className="space-y-10">
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          className="hover:border-purple-500 hover:text-purple-600"
          onClick={() => router.push("/dashboard/payment")}
        >
          Pay Fees
        </Button>
        <Button
          variant="outline"
          className="hover:border-purple-500 hover:text-purple-600"
          onClick={() => router.push("/dashboard/history")}
        >
          Payment History
        </Button>
        <Button
          onClick={() => router.push("/dashboard/feedback")}
          variant="outline"
          className="hover:border-purple-500 hover:text-purple-600"
        >
          Feedback
        </Button>
      </div>

      
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Featured Schools
        </h3>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
          className="w-full max-w-6xl mx-auto"
          
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          <CarouselContent>
            {schoolData.slice(0, 6).map((school) => (
              <CarouselItem
                key={school.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Card className="border border-gray-500 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-5 flex flex-col items-center text-center space-y-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {school.name}
                      </h4>
                      <p className="text-sm text-gray-500">{school.location}</p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => router.push("/dashboard/payment")}
                    >
                      Pay Now
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

     
      <div className="overflow-x-auto rounded-xl border border-gray-700 dark:border-gray-800 shadow-sm max-w-7xl">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-900/50 border-gray-500">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchools.length > 0 ? (
              filteredSchools.map((school) => (
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
                            onClick={() => router.push("/dashboard/payment")}
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
              ))
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
    </section>
  );
}
