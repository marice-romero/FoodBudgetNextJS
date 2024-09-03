import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const isAuthenticated = await checkIsAuthenticated();

  if (isAuthenticated) {
    redirect("/dashboard");
  } else {
    redirect("/auth");
  }
  return (
    <div>
      <h1>B&B Save Money</h1>
      <Link href="/auth">Sign in here</Link>
    </div>
  );
}
