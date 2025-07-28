"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function RouteProtector({ children, requireAuth = false, requiredRole }) {
  const { data: session, status } = useSession();

 
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  const isLoading = status === "loading" || !user;
  const isAuthenticated = status === "authenticated" || user;
  const userRole = session?.user?.accountType || user?.accountType;

  const [redirected, setRedirected] = useState(false); //  track if already redirected

  useEffect(() => {
    if (isLoading || redirected) return; // avoid running if still loading or already redirected

    if (requireAuth && !isAuthenticated) {
      setRedirected(true);
      router.push("/");
    } else if (
      requiredRole &&
      (
        (Array.isArray(requiredRole) && !requiredRole.includes(userRole)) ||
        (!Array.isArray(requiredRole) && userRole !== requiredRole)
      )
    ) {
      setRedirected(true);
      router.push("/");
    }
  }, [isLoading, isAuthenticated, requireAuth, requiredRole, userRole, router, redirected]);

  //  Optional loader while checking auth
  if (isLoading || (requireAuth && !isAuthenticated) || (requiredRole && !userRole)) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return children;
}
