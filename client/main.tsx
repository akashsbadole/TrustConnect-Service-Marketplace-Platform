import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Services from "./pages/customer/Services";
import ServiceDetail from "./pages/customer/ServiceDetail";
import ProviderProfile from "./pages/customer/ProviderProfile";
import Booking from "./pages/customer/Booking";
import BookingHistory from "./pages/customer/BookingHistory";
import CustomerProfile from "./pages/customer/CustomerProfile";
import Chat from "./pages/customer/Chat";
import ProviderDashboard from "./pages/provider/Dashboard";
import ProviderProfileSettings from "./pages/provider/Profile";
import ServiceListings from "./pages/provider/ServiceListings";
import BookingManagement from "./pages/provider/BookingManagement";
import ProviderEarnings from "./pages/provider/Earnings";
import ProviderRegistration from "./pages/provider/Registration";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminProviders from "./pages/admin/Providers";
import AdminServices from "./pages/admin/Services";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Customer Routes */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/:category" element={<Services />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/provider/:id" element={<ProviderProfile />} />
            <Route path="/booking/:serviceId" element={<Booking />} />
            <Route path="/my-bookings" element={<BookingHistory />} />
            <Route path="/profile" element={<CustomerProfile />} />
            <Route path="/chat/:providerId" element={<Chat />} />

            {/* Provider Routes */}
            <Route
              path="/provider/register"
              element={<ProviderRegistration />}
            />
            <Route path="/provider/dashboard" element={<ProviderDashboard />} />
            <Route
              path="/provider/profile"
              element={<ProviderProfileSettings />}
            />
            <Route path="/provider/services" element={<ServiceListings />} />
            <Route path="/provider/bookings" element={<BookingManagement />} />
            <Route path="/provider/earnings" element={<ProviderEarnings />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/providers" element={<AdminProviders />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
