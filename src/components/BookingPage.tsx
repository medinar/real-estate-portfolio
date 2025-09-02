import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Badge } from "./ui/badge";
import { CalendarDays, Clock, User, MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "",
    propertyType: "",
    budget: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const serviceTypes = [
    { value: "buy", label: "Buying a Home", icon: "🏠" },
    { value: "sell", label: "Selling a Home", icon: "💰" },
    { value: "invest", label: "Investment Properties", icon: "📈" },
    { value: "rent", label: "Rental Properties", icon: "🔑" },
    { value: "consultation", label: "General Consultation", icon: "💬" }
  ];

  const budgetRanges = [
    "Under $500K", "$500K - $750K", "$750K - $1M", 
    "$1M - $2M", "$2M - $5M", "Above $5M", "Not sure yet"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !formData.firstName || !formData.email || !formData.serviceType) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        ...formData,
        selectedDate: selectedDate.toISOString(),
        selectedTime
      };

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-0272ad44/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        toast.success("Consultation booked successfully!");
        console.log('Booking submitted successfully:', result.bookingId);
      } else {
        toast.error("Failed to book consultation. Please try again.");
        console.error('Booking submission failed:', result.error);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error('Booking submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-4">
              Your consultation has been scheduled for {selectedDate?.toLocaleDateString()} at {selectedTime}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              You'll receive a confirmation email shortly with meeting details.
            </p>
            <Button onClick={() => {
              setIsSubmitted(false);
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                serviceType: "",
                propertyType: "",
                budget: "",
                message: "",
              });
              setSelectedDate(undefined);
              setSelectedTime("");
            }}>
              Book Another Consultation
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-accent py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4">Free Consultation</Badge>
          <h1 className="text-4xl font-bold mb-4">Schedule Your Real Estate Consultation</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book a personalized consultation with Sarah Martinez. Whether you're buying, selling, or investing, 
            I'll help you navigate the Los Angeles real estate market with confidence.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          {/* Service Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Service Type
              </CardTitle>
              <CardDescription>What can I help you with?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {serviceTypes.map((service) => (
                  <div
                    key={service.value}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.serviceType === service.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleInputChange('serviceType', service.value)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{service.icon}</span>
                      <span className="font-medium">{service.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Date & Time Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                Select Date & Time
              </CardTitle>
              <CardDescription>Choose your preferred consultation slot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0}
                className="rounded-md border"
              />
              
              {selectedDate && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">Available Times</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="text-xs"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Contact Information
              </CardTitle>
              <CardDescription>How can I reach you?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Property Details
              </CardTitle>
              <CardDescription>Tell me about your property needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="propertyType">Property Type</Label>
                <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-family">Single Family Home</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="multi-family">Multi-Family</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="land">Land/Lot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="budget">Budget Range</Label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Additional Details</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell me more about your specific needs, timeline, or any questions you have..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>Free consultation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>No obligation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Expert guidance</span>
                    </div>
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full max-w-md" disabled={isSubmitting}>
                    {isSubmitting ? "Booking..." : "Schedule My Consultation"}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground">
                    By scheduling a consultation, you agree to be contacted by Sarah Martinez Real Estate.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}