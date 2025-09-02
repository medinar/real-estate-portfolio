import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  propertyType: string;
  budget: string;
  message: string;
  selectedDate: string;
  selectedTime: string;
  status: string;
  createdAt: string;
  source: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  conversationHistory: Array<{
    text: string;
    sender: string;
    timestamp: string;
  }>;
  status: string;
  createdAt: string;
  source: string;
}

export function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      
      const [bookingsResponse, leadsResponse] = await Promise.all([
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-0272ad44/bookings`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-0272ad44/leads`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        })
      ]);

      const bookingsData = await bookingsResponse.json();
      const leadsData = await leadsResponse.json();

      if (bookingsData.success) {
        setBookings(bookingsData.bookings);
      }

      if (leadsData.success) {
        setLeads(leadsData.leads);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-0272ad44/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const result = await response.json();

      if (result.success) {
        setBookings(prev => prev.map(booking => 
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        ));
        toast.success("Booking status updated");
      } else {
        toast.error("Failed to update booking status");
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error("Failed to update booking status");
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-0272ad44/leads/${leadId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const result = await response.json();

      if (result.success) {
        setLeads(prev => prev.map(lead => 
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        ));
        toast.success("Lead status updated");
      } else {
        toast.error("Failed to update lead status");
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
      toast.error("Failed to update lead status");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200"><CheckCircle className="w-3 h-3 mr-1" />Confirmed</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      case 'new':
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">New</Badge>;
      case 'contacted':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Contacted</Badge>;
      case 'qualified':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Qualified</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'buy':
        return <MapPin className="w-4 h-4" />;
      case 'sell':
        return <DollarSign className="w-4 h-4" />;
      case 'invest':
        return <Users className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your bookings and leads</p>
          </div>
          <Button onClick={fetchData} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{bookings.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Bookings</p>
                  <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'pending').length}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                  <p className="text-2xl font-bold">{leads.length}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New Leads</p>
                  <p className="text-2xl font-bold">{leads.filter(l => l.status === 'new').length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">
              <Calendar className="w-4 h-4 mr-2" />
              Bookings ({bookings.length})
            </TabsTrigger>
            <TabsTrigger value="leads">
              <Users className="w-4 h-4 mr-2" />
              Leads ({leads.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          {getServiceIcon(booking.serviceType)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {booking.firstName} {booking.lastName}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(booking.selectedDate).toLocaleDateString()} at {booking.selectedTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Created {new Date(booking.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(booking.status)}
                        <Select
                          value={booking.status}
                          onValueChange={(value) => updateBookingStatus(booking.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-medium">Contact Information</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span>{booking.email}</span>
                          </div>
                          {booking.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Service Details</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Service:</span> {booking.serviceType}</p>
                          {booking.propertyType && (
                            <p><span className="font-medium">Property Type:</span> {booking.propertyType}</p>
                          )}
                          {booking.budget && (
                            <p><span className="font-medium">Budget:</span> {booking.budget}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {booking.message && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Additional Details</h4>
                        <p className="text-sm">{booking.message}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {bookings.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No bookings yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="leads">
            <div className="space-y-4">
              {leads.map((lead) => (
                <Card key={lead.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{lead.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              Interest: {lead.interest}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Created {new Date(lead.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(lead.status)}
                        <Select
                          value={lead.status}
                          onValueChange={(value) => updateLeadStatus(lead.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-medium">Contact Information</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span>{lead.email}</span>
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span>{lead.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Lead Source</h4>
                        <Badge variant="outline" className="w-fit">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Chatbot
                        </Badge>
                      </div>
                    </div>

                    {lead.conversationHistory && lead.conversationHistory.length > 0 && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Conversation History</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {lead.conversationHistory.slice(-5).map((msg, index) => (
                            <div key={index} className={`text-sm p-2 rounded ${
                              msg.sender === 'user' ? 'bg-blue-100 ml-4' : 'bg-white mr-4'
                            }`}>
                              <span className="font-medium">{msg.sender === 'user' ? 'User' : 'Bot'}:</span> {msg.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {leads.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No leads yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}