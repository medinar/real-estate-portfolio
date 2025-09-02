import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Michael & Jennifer Chen",
      role: "First-Time Buyers",
      content: "Sarah made our first home buying experience seamless and stress-free. Her knowledge of the market and attention to detail were exceptional. She found us the perfect home in Santa Monica within our budget.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Robert Thompson",
      role: "Luxury Seller",
      content: "Sarah sold my Beverly Hills property for 15% above asking price in just 3 weeks. Her marketing strategy and negotiation skills are unmatched. I wouldn't trust anyone else with my real estate needs.",
      rating: 5,
      avatar: "RT"
    },
    {
      name: "Lisa Rodriguez",
      role: "Investment Client",
      content: "As an out-of-state investor, I needed someone I could trust completely. Sarah identified several profitable opportunities and handled everything remotely. She's built me an amazing portfolio.",
      rating: 5,
      avatar: "LR"
    },
    {
      name: "David & Sarah Kim",
      role: "Repeat Clients",
      content: "This is our third transaction with Sarah over 8 years. She's helped us upgrade twice and always provides honest advice. Her market insights have saved us thousands and made us thousands.",
      rating: 5,
      avatar: "DK"
    },
    {
      name: "Amanda Foster",
      role: "Luxury Buyer",
      content: "Sarah understood exactly what I was looking for in a Malibu home. She showed me properties that weren't even on the market yet and negotiated an amazing deal. Her service is truly white-glove.",
      rating: 5,
      avatar: "AF"
    },
    {
      name: "James Wilson",
      role: "Commercial Client",
      content: "Sarah helped me purchase a mixed-use property in Venice. Her understanding of both residential and commercial markets is impressive. The investment has already exceeded my expectations.",
      rating: 5,
      avatar: "JW"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Client Testimonials</Badge>
          <h2 className="mb-4">What My Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it - hear from the clients I've had the privilege to serve
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <div className="relative mb-4">
                  <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground italic pl-4">
                    "{testimonial.content}"
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-6 py-3">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">4.9/5 Average Rating</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">150+ Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}