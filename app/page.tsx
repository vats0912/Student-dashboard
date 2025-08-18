"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
export default function Home() {
 const { data: session, status } = useSession();
   const router = useRouter();
   const {toast}=useToast()
   useEffect(() => {
       if (status === "loading") return;
       if (status === "authenticated") {
        toast({title:'Login Successful', description:'Redirected to dashboard'})
        setTimeout(()=>{
           router.replace("/dashboard");
        },1500)
       } 
       
       else {
         router.push("/login");
       }
     }, [session, status, router, toast]);

   
  return (
    <div className="flex flex-col ">
      <h1 className="text-center text-xl my-32">Loading Dashboard .....</h1>
    </div>
  );
}
