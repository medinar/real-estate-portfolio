import { Hono } from 'npm:hono@4.6.10'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

// Configure CORS and logging
app.use('*', cors())
app.use('*', logger(console.log))

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Route: Store booking consultation
app.post('/make-server-0272ad44/bookings', async (c) => {
  try {
    const body = await c.req.json()
    
    const booking = {
      id: `booking_${Date.now()}`,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      serviceType: body.serviceType,
      propertyType: body.propertyType,
      budget: body.budget,
      message: body.message,
      selectedDate: body.selectedDate,
      selectedTime: body.selectedTime,
      status: 'pending',
      createdAt: new Date().toISOString(),
      source: 'booking_page'
    }

    await kv.set(`booking:${booking.id}`, booking)
    
    console.log(`New booking stored: ${booking.id} for ${booking.firstName} ${booking.lastName}`)
    
    return c.json({ 
      success: true, 
      bookingId: booking.id,
      message: 'Booking stored successfully' 
    })
  } catch (error) {
    console.log(`Booking storage error: ${error}`)
    return c.json({ 
      success: false, 
      error: 'Failed to store booking' 
    }, 500)
  }
})

// Route: Store chatbot leads
app.post('/make-server-0272ad44/leads', async (c) => {
  try {
    const body = await c.req.json()
    
    const lead = {
      id: `lead_${Date.now()}`,
      name: body.name,
      email: body.email,
      phone: body.phone,
      interest: body.interest,
      conversationHistory: body.conversationHistory || [],
      status: 'new',
      createdAt: new Date().toISOString(),
      source: 'chatbot'
    }

    await kv.set(`lead:${lead.id}`, lead)
    
    console.log(`New lead stored: ${lead.id} for ${lead.name}`)
    
    return c.json({ 
      success: true, 
      leadId: lead.id,
      message: 'Lead stored successfully' 
    })
  } catch (error) {
    console.log(`Lead storage error: ${error}`)
    return c.json({ 
      success: false, 
      error: 'Failed to store lead' 
    }, 500)
  }
})

// Route: Get all bookings (for admin)
app.get('/make-server-0272ad44/bookings', async (c) => {
  try {
    const bookings = await kv.getByPrefix('booking:')
    
    // Sort by creation date, newest first
    const sortedBookings = bookings.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    
    return c.json({ 
      success: true, 
      bookings: sortedBookings 
    })
  } catch (error) {
    console.log(`Error fetching bookings: ${error}`)
    return c.json({ 
      success: false, 
      error: 'Failed to fetch bookings' 
    }, 500)
  }
})

// Route: Get all leads (for admin)
app.get('/make-server-0272ad44/leads', async (c) => {
  try {
    const leads = await kv.getByPrefix('lead:')
    
    // Sort by creation date, newest first
    const sortedLeads = leads.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    
    return c.json({ 
      success: true, 
      leads: sortedLeads 
    })
  } catch (error) {
    console.log(`Error fetching leads: ${error}`)
    return c.json({ 
      success: false, 
      error: 'Failed to fetch leads' 
    }, 500)
  }
})

// Route: Update booking status
app.put('/make-server-0272ad44/bookings/:id/status', async (c) => {
  try {
    const bookingId = c.req.param('id')
    const { status } = await c.req.json()
    
    const bookingKey = `booking:${bookingId}`
    const existingBooking = await kv.get(bookingKey)
    
    if (!existingBooking) {
      return c.json({ 
        success: false, 
        error: 'Booking not found' 
      }, 404)
    }
    
    const updatedBooking = {
      ...existingBooking,
      status,
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(bookingKey, updatedBooking)
    
    return c.json({ 
      success: true, 
      booking: updatedBooking 
    })
  } catch (error) {
    console.log(`Error updating booking status: ${error}`)
    return c.json({ 
      success: false, 
      error: 'Failed to update booking status' 
    }, 500)
  }
})

// Route: Update lead status
app.put('/make-server-0272ad44/leads/:id/status', async (c) => {
  try {
    const leadId = c.req.param('id')
    const { status } = await c.req.json()
    
    const leadKey = `lead:${leadId}`
    const existingLead = await kv.get(leadKey)
    
    if (!existingLead) {
      return c.json({ 
        success: false, 
        error: 'Lead not found' 
      }, 404)
    }
    
    const updatedLead = {
      ...existingLead,
      status,
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(leadKey, updatedLead)
    
    return c.json({ 
      success: true, 
      lead: updatedLead 
    })
  } catch (error) {
    console.log(`Error updating lead status: ${error}`)
    return c.json({ 
      success: false, 
      error: 'Failed to update lead status' 
    }, 500)
  }
})

// Health check endpoint
app.get('/make-server-0272ad44/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  })
})

Deno.serve(app.fetch)