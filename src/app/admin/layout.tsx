import type { Metadata } from "next";
import type { ReactNode } from "react";
import AdminProvider from "@/components/admin/AdminProvider";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("ge_admin_theme")!=="light")document.documentElement.classList.add("admin-dark")}catch(e){}` }} />
      <AdminProvider>{children}</AdminProvider>
    </>
  );
}
