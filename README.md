# David Barber - Premium Barber Shop Template

A production-ready, responsive web template for barber shops with modern booking functionality, built with React, TypeScript, and Tailwind CSS.

## 🎯 Features

### Frontend
- **Modern Industrial Design**: Dark charcoal with warm copper accents
- **Responsive Layout**: Mobile-first approach with smooth animations
- **3-Step Booking Flow**: Service selection → Professional → Date/Time → Confirmation
- **Real-time Status**: Staff availability badges and live updates
- **Premium Components**: Hero section, services grid, team cards, booking modal
- **SEO Optimized**: Meta tags, structured data ready, accessibility compliant

### Backend Integration Ready
- **Azure Functions**: Placeholder endpoints for booking management
- **Azure Cosmos DB**: Sample data models for bookings, users, staff, services
- **Azure AD B2C**: Authentication flow placeholders
- **Azure Web PubSub**: Real-time booking updates integration points

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd barbershop-pro

# Install dependencies
npm install

# Start development server
npm run dev
```

### Azure Deployment

1. **Static Web App Deployment**:
```bash
# Build for production
npm run build

# Deploy to Azure Static Web Apps
# Connect your GitHub repo to Azure Static Web Apps
```

2. **Environment Variables**:
```env
VITE_AZURE_FUNCTIONS_URL=https://your-functions-app.azurewebsites.net
VITE_AZURE_B2C_CLIENT_ID=your-client-id
VITE_COSMOS_DB_ENDPOINT=your-cosmos-endpoint
```

## 📱 Components

### Core Components
- `Header`: Navigation with booking CTA
- `Hero`: Premium landing section with quick booking preview
- `Services`: Interactive service cards with pricing
- `Team`: Staff profiles with availability status
- `BookingFlow`: 4-step booking modal (Service → Professional → DateTime → Confirmation)
- `WhatsAppButton`: Floating contact button

### Design System
- **Colors**: HSL-based semantic tokens in `src/index.css`
- **Typography**: Playfair Display (headings) + Inter (body)
- **Animations**: Fade-ins, hover effects, skeleton loaders
- **Responsive**: Mobile-first with tablet and desktop breakpoints

## 🗃️ Data Models

### Booking Model (Cosmos DB)
```typescript
interface Booking {
  id: string;
  customerId: string;
  serviceId: string;
  staffId: string;
  dateTime: Date;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  price: number;
  duration: number; // minutes
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Service Model
```typescript
interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  category: string;
  isActive: boolean;
}
```

### Staff Model
```typescript
interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  isActive: boolean;
  workingHours: {
    [day: string]: { start: string; end: string; };
  };
}
```

## 🔧 API Endpoints (Azure Functions)

### Booking Management
```typescript
// GET /api/bookings
// POST /api/bookings
// PUT /api/bookings/{id}
// DELETE /api/bookings/{id}

// GET /api/services
// GET /api/staff
// GET /api/availability/{staffId}/{date}
```

## 🎨 Customization

### Color Themes
The design system supports easy theme switching:

**Default (Industrial Dark)**:
- Primary: Copper (#e97c07)
- Background: Deep charcoal (#0f0f10)
- Accent: Amber variations

**Alternative (Classic Vintage)**:
- Primary: Deep green (#1f5f3f)
- Secondary: Gold (#e6b800)
- Background: Warm cream (#f5f3ed)

### Content Localization
- Portuguese (pt-BR) content with English dev placeholders
- Easy string replacement for other languages
- Currency and date formatting ready

## 📊 Performance & SEO

### Lighthouse Targets
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Key Optimizations
- Image lazy loading
- Font preloading
- Critical CSS inlining
- Service worker ready

## 🔐 Security Features

- HTTPS enforced
- Input validation
- XSS protection
- CORS configuration
- Rate limiting ready

## 📱 PWA Ready

- Service worker template
- Offline booking cache
- App manifest
- Install prompts

## 🎯 Conversion Optimization

- Prominent booking CTAs
- 3-step booking flow
- Social proof (ratings, reviews)
- WhatsApp integration
- Real-time availability

## 📈 Analytics Integration

Ready for:
- Google Analytics 4
- Facebook Pixel
- Custom event tracking
- Conversion goals

## 🚀 Implementation Roadmap

### MVP (Week 1)
- [x] Core landing page with booking flow
- [x] Responsive design system
- [x] Component library
- [ ] Azure Functions setup
- [ ] Basic booking API

### V1 Features (Next Steps)
- [ ] User authentication (Azure AD B2C)
- [ ] Real-time updates (Web PubSub)
- [ ] Admin dashboard
- [ ] Payment integration
- [ ] Email notifications
- [ ] Calendar sync
- [ ] Customer reviews system
- [ ] Loyalty program

### V2 Enhancements
- [ ] Multi-location support
- [ ] Inventory management
- [ ] Staff scheduling
- [ ] Advanced analytics
- [ ] Mobile app (React Native)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **UI Components**: Radix UI, Lucide Icons
- **State Management**: React Query, Zustand ready
- **Backend**: Azure Functions, Cosmos DB
- **Auth**: Azure AD B2C
- **Deployment**: Azure Static Web Apps
- **Real-time**: Azure Web PubSub

## 📄 License

MIT License - Free for commercial use

## 🤝 Support

For implementation support or customization services, contact: [your-email]

---

**Ready to transform your barber shop business? Deploy this template and start accepting bookings in minutes!**