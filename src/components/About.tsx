import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Award, GraduationCap, MapPin, Star } from "lucide-react";

export function About() {
  const credentials = [
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Licensed Real Estate Broker",
      description: "California Real Estate License #12345678"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Luxury Home Marketing Specialist",
      description: "Certified by the Institute for Luxury Home Marketing"
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Top 1% Performer",
      description: "Los Angeles County Association of Realtors"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Local Market Expert",
      description: "Beverly Hills, Malibu, Santa Monica, Venice"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">About Sarah</Badge>
          <h2 className="mb-4">Experience You Can Trust</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building lasting relationships through exceptional service and unparalleled market knowledge
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <p className="mb-6 text-lg">
              As a Los Angeles native and luxury real estate specialist, I bring a unique combination of local 
              market expertise, professional training, and genuine passion for helping clients achieve their real estate goals.
            </p>
            <p className="mb-6">
              My approach is built on trust, transparency, and results. Whether you're buying your first home, 
              upgrading to your dream property, or making a strategic investment, I provide the guidance and 
              support you need to make informed decisions.
            </p>
            <p className="mb-8">
              I specialize in luxury properties throughout Los Angeles County, with particular expertise in 
              Beverly Hills, Malibu, Santa Monica, and Venice. My clients benefit from my extensive network, 
              cutting-edge marketing strategies, and commitment to excellence.
            </p>
          </div>
          
          <div className="grid gap-4">
            {credentials.map((item, index) => (
              <Card key={index} className="border border-border">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="text-primary mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}