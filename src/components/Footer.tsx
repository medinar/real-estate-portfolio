import { Separator } from "./ui/separator";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-foreground text-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">SM</span>
              </div>
              <span className="text-lg font-medium">Sarah Martinez</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Your trusted real estate partner in Los Angeles, committed to exceptional service and results.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#about" className="hover:text-primary-foreground transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-primary-foreground transition-colors">Services</a></li>
              <li><a href="#properties" className="hover:text-primary-foreground transition-colors">Properties</a></li>
              <li><a href="#testimonials" className="hover:text-primary-foreground transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-primary-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Services</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Buyer Representation</li>
              <li>Seller Representation</li>
              <li>Luxury Properties</li>
              <li>Investment Properties</li>
              <li>Market Analysis</li>
              <li>Consultation</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Areas Served</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Beverly Hills</li>
              <li>Malibu</li>
              <li>Santa Monica</li>
              <li>Venice</li>
              <li>West Hollywood</li>
              <li>Manhattan Beach</li>
            </ul>
          </div>
        </div>
        
        <Separator className="bg-primary-foreground/20 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 Sarah Martinez Real Estate. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-xs text-primary-foreground/60 text-center">
          <p>California Real Estate License #12345678 | Equal Housing Opportunity</p>
          <p className="mt-2">This website is for informational purposes only. All property information is deemed reliable but not guaranteed.</p>
          <div className="flex items-center justify-center mt-6 space-x-2">
            {/* Building Icon SVG */}
            <span className="inline-block align-middle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="7" width="18" height="13" rx="2" fill="#1976d2"/>
                <rect x="7" y="11" width="2" height="2" fill="#fff"/>
                <rect x="11" y="11" width="2" height="2" fill="#fff"/>
                <rect x="15" y="11" width="2" height="2" fill="#fff"/>
                <rect x="7" y="15" width="2" height="2" fill="#fff"/>
                <rect x="11" y="15" width="2" height="2" fill="#fff"/>
                <rect x="15" y="15" width="2" height="2" fill="#fff"/>
                <rect x="9" y="3" width="6" height="4" rx="1" fill="#1976d2"/>
              </svg>
            </span>
            <a href="https://site-foundry.netlify.app/" target="_blank" rel="noopener noreferrer" className="align-middle hover:underline">
              Powered by: <strong>Site Foundry</strong>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}