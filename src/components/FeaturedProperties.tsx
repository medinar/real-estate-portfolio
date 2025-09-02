import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Bed, Bath, Square, MapPin, Heart } from "lucide-react";

export function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc1NjcwNjk5MXww&ixlib=rb-4.1.0&q=80&w=1080",
      price: "$2,750,000",
      address: "1234 Beverly Hills Drive, Beverly Hills, CA",
      beds: 4,
      baths: 3.5,
      sqft: "3,200",
      status: "For Sale",
      type: "Luxury Home"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1648147870253-c45f6f430528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob21lJTIwaW50ZXJpb3IlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc1Njc3Nzc1NXww&ixlib=rb-4.1.0&q=80&w=1080",
      price: "$1,850,000",
      address: "5678 Santa Monica Boulevard, Santa Monica, CA",
      beds: 3,
      baths: 2.5,
      sqft: "2,400",
      status: "Sold",
      type: "Modern Condo"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1611095210561-67f0832b1ca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTY3NDkyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "$3,200,000",
      address: "9012 Malibu Coast Highway, Malibu, CA",
      beds: 5,
      baths: 4,
      sqft: "4,100",
      status: "For Sale",
      type: "Oceanfront Villa"
    }
  ];

  return (
    <section id="properties" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Featured Properties</Badge>
          <h2 className="mb-4">Exceptional Properties, Exceptional Service</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover a curated selection of luxury properties in Los Angeles' most desirable neighborhoods
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property) => (
            <Card key={property.id} className="border border-border overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <ImageWithFallback 
                  src={property.image}
                  alt={property.address}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={property.status === 'Sold' ? 'bg-green-500' : 'bg-primary'}>
                    {property.status}
                  </Badge>
                  <Badge variant="secondary">{property.type}</Badge>
                </div>
                <button className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-2xl font-medium mb-1">{property.price}</div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{property.address}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    {property.beds} beds
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    {property.baths} baths
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4" />
                    {property.sqft} sqft
                  </div>
                </div>
                
                <Button className="w-full" variant={property.status === 'Sold' ? 'secondary' : 'default'}>
                  {property.status === 'Sold' ? 'View Details' : 'Schedule Showing'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" size="lg">View All Properties</Button>
        </div>
      </div>
    </section>
  );
}