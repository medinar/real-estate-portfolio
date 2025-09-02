import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { FeaturedProperties } from "./components/FeaturedProperties";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { BookingPage } from "./components/BookingPage";
import { Chatbot } from "./components/Chatbot";
import { AdminDashboard } from "./components/AdminDashboard";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import { Settings } from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'booking' | 'admin'>('home');

  const handleNavigate = (page: 'home' | 'booking' | 'admin') => {
    setCurrentPage(page);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {currentPage !== 'admin' && (
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      
      <main>
        {currentPage === 'home' && (
          <>
            <Hero onNavigateToBooking={() => handleNavigate('booking')} />
            <About />
            <Services />
            <div id="properties">
              <FeaturedProperties />
            </div>
            <Testimonials />
            <Contact />
          </>
        )}
        
        {currentPage === 'booking' && <BookingPage />}
        
        {currentPage === 'admin' && <AdminDashboard />}
      </main>
      
      {currentPage === 'home' && <Footer />}
      
      {/* Chatbot - only show on home page */}
      {currentPage === 'home' && <Chatbot />}
      
      {/* Admin Access Button - floating in bottom left */}
      {currentPage === 'home' && (
        <Button
          onClick={() => handleNavigate('admin')}
          className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full"
          size="sm"
          variant="outline"
          title="Admin Dashboard"
        >
          <Settings className="w-4 h-4" />
        </Button>
      )}
      
      {/* Back to Home Button in Admin */}
      {currentPage === 'admin' && (
        <Button
          onClick={() => handleNavigate('home')}
          className="fixed top-6 left-6 z-40"
          variant="outline"
        >
          Back to Website
        </Button>
      )}
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}