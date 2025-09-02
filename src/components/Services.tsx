import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Home, TrendingUp, Search, Users, Calculator, FileText } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Buyer Representation",
      description: "Expert guidance through the entire home buying process, from search to closing.",
      features: ["Property search assistance", "Negotiation expertise", "Market analysis", "Closing coordination"]
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Seller Representation",
      description: "Comprehensive marketing and sales strategy to maximize your property value.",
      features: ["Professional staging", "Premium photography", "Digital marketing", "Price optimization"]
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Investment Properties",
      description: "Identify lucrative investment opportunities and build your real estate portfolio.",
      features: ["ROI analysis", "Market trends", "Property evaluation", "Portfolio strategy"]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Luxury Properties",
      description: "Specialized service for high-end residential properties and discerning clients.",
      features: ["Exclusive listings", "Luxury marketing", "Confidential service", "White-glove experience"]
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Market Analysis",
      description: "In-depth market research and property valuation services.",
      features: ["Comparative analysis", "Trend forecasting", "Property valuations", "Investment insights"]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Consultation Services",
      description: "Expert advice on real estate matters, market conditions, and investment strategies.",
      features: ["Strategy sessions", "Market updates", "Investment planning", "Portfolio reviews"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Services</Badge>
          <h2 className="mb-4">Comprehensive Real Estate Solutions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From first-time buyers to luxury investors, I provide personalized service tailored to your unique needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-white border border-border hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="text-primary mb-2">
                  {service.icon}
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}