'use client'
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname=usePathname()

  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/profile": "Profile",
    "/dashboard/payment": "Payment",
    "/dashboard/history": "Previous Transcations",
    "/dashboard/deadlines": "Upcoming Deadlines",
    "/dashboard/school": 'Schools',
    "/dashboard/feedback": 'Feedback'
  };

  const currentTitle = pageTitles[pathname] || "Student Dashboard"
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{currentTitle}</h1>
      </div>
    </header>
  )
}
