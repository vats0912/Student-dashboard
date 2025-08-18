"use client";

import { useSession } from "next-auth/react";
import { dummyStudents } from "@/app/data/studentData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function StudentProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-lg font-medium">
        Loading profile...
      </div>
    );
  }

  if (!session || !session.user?.email) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg font-semibold">
        You must be logged in to view this page.
      </div>
    );
  }

  const student = dummyStudents.find(
    (s) => s.email.toLowerCase() === session.user?.email?.toLowerCase()
  );

  if (!student) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        No student data found for this account.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12 px-4">
      <h2 className="text-xl sm:text-4xl font-bold mb-10 text-gray-900 text-center tracking-tight">
         My Profile
      </h2>

      <Card className="max-w-lg mx-auto border  rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm border-blue-400">
        <CardHeader className="flex flex-col items-center space-y-4 pb-6 border-b border-gray-100">
          <Avatar className="h-24 w-24 text-2xl ring-4 ring-indigo-100 shadow-md">
            <AvatarFallback className="bg-indigo-600 text-white">
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <CardTitle className="text-2xl font-semibold text-gray-900">
              {student.name}
            </CardTitle>
            <p className="text-sm text-gray-500">{student.course}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 pt-6">
          <ProfileField label="Email" value={student.email} />
          <ProfileField label="Contact No" value={student.contact} />
          <ProfileField label="Address" value={student.address} />
        </CardContent>
      </Card>
    </section>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-lg border border-gray-100 hover:border-indigo-200 transition-colors duration-200 bg-gray-50/50 hover:bg-white shadow-sm">
      <p className="text-gray-500 text-xs uppercase tracking-wider">{label}</p>
      <p className="font-medium text-gray-800 break-words">{value}</p>
    </div>
  );
}
