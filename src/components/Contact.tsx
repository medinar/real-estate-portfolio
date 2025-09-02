import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Phone, Mail, MapPin, Clock, MessageSquare, Calendar } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Contact</Badge>
          <h2 className="mb-4">Let's Start Your Real Estate Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to buy, sell, or invest? Get in touch today for a free consultation and market analysis
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border border-border">
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block mb-2">First Name</label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-2">Last Name</label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2">Phone</label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2">Subject</label>
                  <Input id="subject" placeholder="What can I help you with?" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell me more about your real estate needs..."
                    className="min-h-32"
                  />
                </div>
                
                <Button className="w-full" size="lg">Send Message</Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground">(555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">sarah@sarahmartinez.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Office</div>
                    <div className="text-muted-foreground">9000 Sunset Blvd<br />West Hollywood, CA 90069</div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mb-3">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Text Me
                </Button>
                
                <Button className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Call
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>12:00 PM - 5:00 PM</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-secondary/30 rounded-md">
                  <p className="text-sm text-muted-foreground">
                    Available 24/7 for urgent real estate needs
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-secondary/20 rounded-2xl p-8">
            <div className="text-center">
              <div className="font-medium mb-1">Areas Served</div>
              <div className="text-sm text-muted-foreground">Beverly Hills • Malibu • Santa Monica<br />Venice • West Hollywood • Manhattan Beach</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}