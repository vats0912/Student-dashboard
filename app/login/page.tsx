
"use client";
import React from 'react'
import LoginPage from '../_components/Login';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (status === "loading") return; 
    if (status === "authenticated") {
      router.replace("/dashboard/");
    } else {
      setShouldRender(true); 
    }
  }, [status, router]);

  if (!shouldRender) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return <LoginPage />;
}

export default Page


