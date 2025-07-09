import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole | UserRole[];
  requiredPermission?: string;
  fallbackPath?: string;
  showUnauthorized?: boolean;
}

export default function ProtectedRoute({
  children,
  requiredRole,
  requiredPermission,
  fallbackPath = "/login",
  showUnauthorized = false,
}: ProtectedRouteProps) {
  const { user, isLoading, hasRole, hasPermission } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && !hasRole(requiredRole)) {
    if (showUnauthorized) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardContent className="text-center p-8">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Access Denied
              </h2>
              <p className="text-gray-600 mb-6">
                You don't have permission to access this page. Contact your
                administrator if you believe this is an error.
              </p>
              <button
                onClick={() => window.history.back()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Go Back
              </button>
            </CardContent>
          </Card>
        </div>
      );
    }
    return <Navigate to="/unauthorized" replace />;
  }

  // Check permission-based access
  if (requiredPermission && !hasPermission(requiredPermission)) {
    if (showUnauthorized) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardContent className="text-center p-8">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Permission Required
              </h2>
              <p className="text-gray-600 mb-6">
                You need additional permissions to access this feature.
              </p>
              <button
                onClick={() => window.history.back()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Go Back
              </button>
            </CardContent>
          </Card>
        </div>
      );
    }
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

// Higher-order component for role-based conditional rendering
export function withRoleAccess<T extends object>(
  Component: React.ComponentType<T>,
  requiredRole?: UserRole | UserRole[],
  requiredPermission?: string,
) {
  return function RoleBasedComponent(props: T) {
    return (
      <ProtectedRoute
        requiredRole={requiredRole}
        requiredPermission={requiredPermission}
        showUnauthorized={true}
      >
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
