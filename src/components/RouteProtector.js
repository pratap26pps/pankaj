"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function RouteProtector({ children, requireAuth = false, requiredRole }) {
  const { data: session, status } = useSession();
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  // Get the user role from session or Redux
  const userRole = session?.user?.accountType || user?.accountType;

  // Check if loading session or waiting for auth
  const isLoading = status === "loading" || (requireAuth && !user && !session?.user);

  // Check if user is logged in
  const isAuthenticated = (user || session?.user);

  const [redirected, setRedirected] = useState(false); // Prevent multiple redirects

  console.log("userRole in RouteProtector", userRole);
  console.log("requiredRole in RouteProtector", requiredRole);
  console.log("isAuthenticated in RouteProtector", isAuthenticated);


  useEffect(() => {
    if (isLoading || redirected) return; // Skip if still loading or already redirected

    // If authentication is required and user not authenticated → go to homepage
    if (requireAuth && !isAuthenticated && !userRole) {
      setRedirected(true);
      router.push("/");
      return;
    }

    // If requiredRole is provided and user's role matches → go to dashboard
    const roleMatch =
      requiredRole &&
      (
        (Array.isArray(requiredRole) && requiredRole.includes(userRole)) ||
        (!Array.isArray(requiredRole) && userRole === requiredRole)
      );

    if (requireAuth && roleMatch) {
      setRedirected(true);
      router.push("/dashboard");
      return;
    }

    // If none of the above, do nothing and allow rendering
  }, [isLoading, isAuthenticated, requireAuth, requiredRole, userRole, router, redirected]);

  // Show loader while checking session/auth
  if (isLoading || (requireAuth && !isAuthenticated)) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // If all checks pass, render the protected content
  return children;
}
