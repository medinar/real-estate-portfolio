import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ChevronDown, Play, Calendar } from "lucide-react";

interface HeroProps {
  onNavigateToBooking: () => void;
}

export function Hero({ onNavigateToBooking }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1748063578185-3d68121b11ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGFyY2hpdGVjdHVyZSUyMGV2ZW5pbmd8ZW58MXx8fHwxNzU2Nzc3OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Luxury Modern Home"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Gradient overlay for extra depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-colors">
            Top Performing Agent 2024
          </Badge>
          
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-medium mb-6 leading-tight">
            Your Trusted Real Estate Partner in 
            <span className="block text-transparent bg-gradient-to-r from-white to-white/80 bg-clip-text">
              Los Angeles
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            With over 10 years of experience in luxury real estate, I help clients find their dream homes 
            and make smart investment decisions.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 text-lg px-8 py-4"
              onClick={onNavigateToBooking}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Consultation
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-transparent border-white/50 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-4"
              onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="w-5 h-5 mr-2" />
              View Properties
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl md:text-4xl font-medium mb-2 text-white">500+</div>
              <div className="text-white/80">Homes Sold</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl md:text-4xl font-medium mb-2 text-white">$250M+</div>
              <div className="text-white/80">In Sales</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl md:text-4xl font-medium mb-2 text-white">98%</div>
              <div className="text-white/80">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/60 hover:text-white transition-colors cursor-pointer">
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-white/30 rounded-full animate-pulse hidden lg:block"></div>
      <div className="absolute top-1/3 right-12 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-1000 hidden lg:block"></div>
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-500 hidden lg:block"></div>
    </section>
  );
}