'use client'
import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Dashboard from '@/app/_components/Payment';

function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="text-center mt-20">Loading session...</div>;
  }
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
<Dashboard/>
    </div>
  )
}

export default Page