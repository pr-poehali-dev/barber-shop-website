
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import Admin from "./pages/admin/Admin";
import AppointmentsList from "./pages/admin/AppointmentsList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking/:serviceId?" element={<Booking />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          
          {/* Админ роуты */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="appointments" element={<AppointmentsList />} />
            <Route path="products" element={<NotFound />} />
            <Route path="orders" element={<NotFound />} />
            <Route path="clients" element={<NotFound />} />
            <Route path="settings" element={<NotFound />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
