import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../../../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Toaster position="bottom-center" />
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
