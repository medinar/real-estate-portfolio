import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Home, 
  DollarSign, 
  MapPin,
  Phone,
  Mail,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  options?: string[];
  type?: 'text' | 'options' | 'lead-form';
}

interface LeadData {
  name: string;
  email: string;
  phone: string;
  interest: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});
  const [currentStep, setCurrentStep] = useState('greeting');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: 'bot' | 'user', options?: string[], type?: 'text' | 'options' | 'lead-form') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      options,
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const initializeChat = () => {
    setMessages([]);
    setCurrentStep('greeting');
    simulateTyping(() => {
      addMessage(
        "Hi! I'm Sarah's AI assistant. I'm here to help you with your real estate needs in Los Angeles. What interests you most?",
        'bot',
        ['Buying a Home', 'Selling a Property', 'Investment Opportunities', 'Market Information'],
        'options'
      );
    }, 500);
  };

  const handleOptionClick = (option: string) => {
    addMessage(option, 'user');
    
    simulateTyping(() => {
      switch (option) {
        case 'Buying a Home':
          setCurrentStep('buying');
          addMessage(
            "Great! I'd love to help you find your dream home. What's your budget range?",
            'bot',
            ['Under $500K', '$500K - $1M', '$1M - $2M', 'Above $2M', 'Not sure yet'],
            'options'
          );
          break;
        case 'Selling a Property':
          setCurrentStep('selling');
          addMessage(
            "Perfect! I can help you get the best value for your property. What type of property are you looking to sell?",
            'bot',
            ['Single Family Home', 'Condominium', 'Townhouse', 'Investment Property'],
            'options'
          );
          break;
        case 'Investment Opportunities':
          setCurrentStep('investment');
          addMessage(
            "Excellent! Los Angeles has fantastic investment opportunities. Are you interested in:",
            'bot',
            ['Rental Properties', 'Fix & Flip', 'Commercial Real Estate', 'New Developments'],
            'options'
          );
          break;
        case 'Market Information':
          setCurrentStep('market');
          addMessage(
            "I'd be happy to share market insights! Which area interests you?",
            'bot',
            ['Beverly Hills', 'Santa Monica', 'Hollywood Hills', 'Downtown LA', 'Venice', 'Other Area'],
            'options'
          );
          break;
        default:
          handleBudgetOrAreaSelection(option);
      }
    });
  };

  const handleBudgetOrAreaSelection = (selection: string) => {
    setLeadData(prev => ({ ...prev, interest: selection }));
    
    simulateTyping(() => {
      addMessage(
        "That's helpful information! I'd love to provide you with personalized recommendations. Could you share your contact details so Sarah can follow up with you directly?",
        'bot',
        [],
        'lead-form'
      );
      setCurrentStep('lead-capture');
    });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    addMessage(inputValue, 'user');
    setInputValue("");
    
    simulateTyping(() => {
      addMessage(
        "Thanks for your message! Let me connect you with Sarah for a personalized response. Please share your contact information:",
        'bot',
        [],
        'lead-form'
      );
      setCurrentStep('lead-capture');
    });
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leadData.name || !leadData.email) {
      toast.error("Please fill in your name and email");
      return;
    }

    try {
      const leadSubmissionData = {
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone || '',
        interest: leadData.interest || 'General inquiry',
        conversationHistory: messages.map(msg => ({
          text: msg.text,
          sender: msg.sender,
          timestamp: msg.timestamp.toISOString()
        }))
      };

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-0272ad44/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(leadSubmissionData)
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Thank you! Sarah will contact you within 24 hours.");
        console.log('Lead submitted successfully:', result.leadId);
        
        simulateTyping(() => {
          addMessage(
            `Thank you, ${leadData.name}! I've forwarded your information to Sarah. She'll reach out to you within 24 hours to discuss your ${leadData.interest || 'real estate'} needs. In the meantime, would you like to schedule a consultation?`,
            'bot',
            ['Schedule Consultation', 'Browse Properties', 'End Chat'],
            'options'
          );
        });
      } else {
        toast.error("Failed to submit your information. Please try again.");
        console.error('Lead submission failed:', result.error);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error('Lead submission error:', error);
    }
  };

  const quickActions = [
    { icon: Home, text: "View Properties", action: () => handleOptionClick('Market Information') },
    { icon: DollarSign, text: "Get Home Value", action: () => handleOptionClick('Selling a Property') },
    { icon: Calendar, text: "Book Consultation", action: () => window.open('#booking', '_self') },
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen]);

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        
        {/* Notification badge */}
        {!isOpen && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-white text-xs font-medium">1</span>
          </motion.div>
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] z-50 shadow-2xl"
          >
            <Card className="h-full flex flex-col">
              {/* Header */}
              <CardHeader className="pb-3 bg-primary text-primary-foreground">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Sarah's Assistant</CardTitle>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs opacity-80">Online</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-primary-foreground hover:bg-white/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : ''}`}>
                      <div className={`flex items-start gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          message.sender === 'user' ? 'bg-primary' : 'bg-gray-200'
                        }`}>
                          {message.sender === 'user' ? 
                            <User className="w-3 h-3 text-white" /> : 
                            <Bot className="w-3 h-3 text-gray-600" />
                          }
                        </div>
                        <div className={`p-3 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          
                          {message.type === 'options' && message.options && (
                            <div className="mt-3 space-y-2">
                              {message.options.map((option, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleOptionClick(option)}
                                  className="w-full text-left justify-start h-auto py-2 px-3"
                                >
                                  {option}
                                </Button>
                              ))}
                            </div>
                          )}
                          
                          {message.type === 'lead-form' && (
                            <form onSubmit={handleLeadSubmit} className="mt-3 space-y-3">
                              <Input
                                placeholder="Your name"
                                value={leadData.name || ''}
                                onChange={(e) => setLeadData(prev => ({ ...prev, name: e.target.value }))}
                                className="text-sm"
                              />
                              <Input
                                type="email"
                                placeholder="Your email"
                                value={leadData.email || ''}
                                onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                                className="text-sm"
                              />
                              <Input
                                placeholder="Phone (optional)"
                                value={leadData.phone || ''}
                                onChange={(e) => setLeadData(prev => ({ ...prev, phone: e.target.value }))}
                                className="text-sm"
                              />
                              <Button type="submit" size="sm" className="w-full">
                                Submit
                              </Button>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 text-gray-600" />
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Quick Actions */}
              {messages.length === 0 && !isTyping && (
                <div className="p-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                  <div className="flex gap-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={action.action}
                        className="flex-1 text-xs"
                      >
                        <action.icon className="w-3 h-3 mr-1" />
                        {action.text}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}