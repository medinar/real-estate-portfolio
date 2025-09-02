import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

interface HeaderProps {
  currentPage: 'home' | 'booking' | 'admin';
  onNavigate: (page: 'home' | 'booking' | 'admin') => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isBookingPage = currentPage === 'booking';

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled || isBookingPage
        ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isScrolled || isBookingPage ? 'bg-primary' : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <span className={`font-medium transition-colors ${
                isScrolled || isBookingPage ? 'text-primary-foreground' : 'text-white'
              }`}>SM</span>
            </div>
            <span className={`text-lg font-medium transition-colors ${
              isScrolled || isBookingPage ? 'text-foreground' : 'text-white'
            }`}>Sarah Martinez</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {currentPage === 'home' ? (
              <>
                <a href="#about" className={`transition-colors ${
                  isScrolled 
                    ? 'text-foreground hover:text-primary' 
                    : 'text-white/90 hover:text-white'
                }`}>About</a>
                <a href="#services" className={`transition-colors ${
                  isScrolled 
                    ? 'text-foreground hover:text-primary' 
                    : 'text-white/90 hover:text-white'
                }`}>Services</a>
                <a href="#properties" className={`transition-colors ${
                  isScrolled 
                    ? 'text-foreground hover:text-primary' 
                    : 'text-white/90 hover:text-white'
                }`}>Properties</a>
                <a href="#testimonials" className={`transition-colors ${
                  isScrolled 
                    ? 'text-foreground hover:text-primary' 
                    : 'text-white/90 hover:text-white'
                }`}>Testimonials</a>
                <a href="#contact" className={`transition-colors ${
                  isScrolled 
                    ? 'text-foreground hover:text-primary' 
                    : 'text-white/90 hover:text-white'
                }`}>Contact</a>
                <button 
                  onClick={() => onNavigate('booking')}
                  className={`transition-colors ${
                    isScrolled 
                      ? 'text-foreground hover:text-primary' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  Book Consultation
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate('home')}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Home
                </button>
                <span className="text-muted-foreground">Book Consultation</span>
              </>
            )}
          </div>
          
          {currentPage === 'home' ? (
            <Button 
              onClick={() => onNavigate('booking')}
              className={`transition-all ${
                isScrolled 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30'
              }`} 
              variant={isScrolled ? "default" : "outline"}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          ) : (
            <Button onClick={() => onNavigate('home')} variant="outline">
              Back to Home
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}