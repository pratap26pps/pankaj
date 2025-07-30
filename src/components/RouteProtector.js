"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function RouteProtector({ children, requireAuth = false, requiredRole }) {
  const { data: session, status } = useSession();
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  const userRole = session?.user?.accountType || user?.accountType;
  const isAuthenticated = !!(session?.user || user);
  const isLoading = status === "loading";

  const [redirected, setRedirected] = useState(false);

  // Logs for debugging
  console.log("userRole in RouteProtector", userRole);
  console.log("requiredRole in RouteProtector", requiredRole);
  console.log("isAuthenticated in RouteProtector", isAuthenticated);
  console.log("requireAuth in RouteProtector", requireAuth);

  useEffect(() => {
    if (redirected) return;

    // Case 1: Wait for session to load
    if (isLoading) return;

    // Case 2: Auth required but missing info → redirect home
    if (requireAuth && (!isAuthenticated || !userRole)) {
      setRedirected(true);
      router.push("/");
      return;
    }

    // Case 3: Role mismatch → redirect home
    if (
      requiredRole &&
      (!userRole ||
        (Array.isArray(requiredRole)
          ? !requiredRole.includes(userRole)
          : userRole !== requiredRole))
    ) {
      setRedirected(true);
      router.push("/");
      return;
    }

    // Case 4: All clear → allow rendering
  }, [isLoading, isAuthenticated, userRole, requireAuth, requiredRole, redirected, router]);

  // Optional loader while loading session or checking roles
  if (isLoading || (requireAuth && (!isAuthenticated || !userRole))) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return children;
}
