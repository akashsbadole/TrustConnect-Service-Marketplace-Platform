# TrustConnect - Service Marketplace Platform

A comprehensive full-stack service marketplace platform connecting customers with trusted professionals. Built with React, TypeScript, and modern web technologies.
![TrustConnect - Service Marketplace Platform!](screenshot.png "TrustConnect - Service Marketplace Platform")


## 🚀 Features Overview

### 🎯 Multi-Role System

#### **Customer Features**

- ✅ User registration and authentication
- ✅ Service search with advanced filters
- ✅ Provider profiles with ratings and reviews
- ✅ Multi-step booking system with payment integration
- ✅ Real-time chat with providers
- ✅ Booking history and management
- ✅ Favorite providers
- ✅ Review and rating system
- ✅ Customer dashboard with profile management
- ✅ Payment methods management (Credit Card, PayPal)
- ✅ Notification preferences

#### **Service Provider Features**

- ✅ Multi-step registration with KYC verification
- ✅ Provider dashboard with earnings analytics
- ✅ Service listings management
- ✅ Booking management and calendar
- ✅ Real-time chat with customers
- ✅ Earnings tracking and analytics
- ✅ Profile management with certifications
- ✅ Availability scheduling
- ✅ Performance metrics

#### **Admin Features**

- ✅ User management and verification
- ✅ Provider approval and monitoring
- ✅ Service category management
- ✅ Platform analytics and reports
- ✅ Dispute resolution
- ✅ Content management
- ✅ Financial oversight

#### **Manager Features**

- ✅ Business analytics dashboard
- ✅ Category performance tracking
- ✅ Dispute management
- ✅ Provider performance monitoring
- ✅ Revenue analytics
- ✅ Customer satisfaction metrics

#### **Support Agent Features**

- ✅ Support ticket management
- ✅ Live chat system
- ✅ Customer assistance tools
- ✅ Knowledge base access
- ✅ Performance tracking

#### **Super Admin Features**

- ✅ System administration
- ✅ User role management
- ✅ System health monitoring
- ✅ Security oversight
- ✅ Database management
- ✅ System logs and alerts

### 💬 Communication System

- **Multi-channel chat** (Customer-Provider, Customer-Support, AI Bot)
- **Real-time messaging** with file sharing capabilities
- **Video/voice call integration** (UI ready)
- **SMS notifications** (Twilio integration ready)
- **WhatsApp integration** (API ready)
- **Email notifications** (SendGrid/Mailgun ready)

### 💳 Payment Integration

- **PayPal integration** (UI implemented)
- **Credit card processing** (Stripe ready)
- **Payment method management**
- **Billing and invoicing**
- **Dispute handling**

### 🔐 Security & Authentication

- **Role-based access control (RBAC)**
- **JWT authentication**
- **Protected routes**
- **Permission-based UI rendering**
- **KYC verification system**
- **Document upload and verification**

## 🏗 Technical Architecture

### Frontend Stack

- **React 18** with TypeScript
- **React Router 6** for SPA routing
- **TailwindCSS 3** for styling
- **Radix UI** component library
- **Vite** for build tooling
- **Vitest** for testing

### Backend Stack (API Ready)

- **Express.js** server
- **TypeScript**
- **JWT authentication**
- **File upload handling**
- **API rate limiting**

### Database Schema

#### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(50) NOT NULL DEFAULT 'customer', -- customer, provider, admin, super_admin, support, manager
  is_verified BOOLEAN DEFAULT FALSE,
  profile_image TEXT,
  date_of_birth DATE,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  zip_code VARCHAR(20),
  permissions JSONB DEFAULT '[]',
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Providers Table

```sql
CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(255),
  business_type VARCHAR(50), -- individual, llc, corporation
  experience_years INTEGER,
  description TEXT,
  hourly_rate DECIMAL(10,2),
  service_categories JSONB DEFAULT '[]',
  service_areas JSONB DEFAULT '[]',
  certifications JSONB DEFAULT '[]',
  availability JSONB DEFAULT '{}',
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  completed_jobs INTEGER DEFAULT 0,
  response_time_minutes INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT FALSE,
  verification_documents JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Services Table

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  subcategory VARCHAR(100),
  price DECIMAL(10,2) NOT NULL,
  price_type VARCHAR(20) DEFAULT 'hour', -- hour, service, project
  duration_hours DECIMAL(4,2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Bookings Table

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID REFERENCES users(id),
  provider_id UUID REFERENCES providers(id),
  service_id UUID REFERENCES services(id),
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, in_progress, completed, cancelled
  service_date DATE NOT NULL,
  service_time TIME NOT NULL,
  estimated_hours DECIMAL(4,2),
  service_address TEXT NOT NULL,
  special_requests TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, refunded
  payment_method VARCHAR(50),
  payment_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Reviews Table

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  customer_id UUID REFERENCES users(id),
  provider_id UUID REFERENCES providers(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  images JSONB DEFAULT '[]',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Messages Table

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  sender_id UUID REFERENCES users(id),
  sender_type VARCHAR(20) NOT NULL, -- user, provider, support, ai
  content TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text', -- text, image, file
  attachments JSONB DEFAULT '[]',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Support Tickets Table

```sql
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
  status VARCHAR(50) DEFAULT 'open', -- open, in_progress, waiting, resolved, closed
  resolution TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Categories Table

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Payments Table

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(50) NOT NULL, -- card, paypal, bank_transfer
  payment_gateway VARCHAR(50) NOT NULL, -- stripe, paypal
  gateway_payment_id VARCHAR(255),
  gateway_fee DECIMAL(10,2) DEFAULT 0,
  platform_fee DECIMAL(10,2) DEFAULT 0,
  provider_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
  processed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🛠 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL 14+
- Redis (for sessions/cache)

### 1. Clone Repository

```bash
git clone https://github.com/your-org/trustconnect.git
cd trustconnect
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create `.env` file:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/trustconnect
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Payment Gateways
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-secret

# Email Service
SENDGRID_API_KEY=your-sendgrid-key
MAILGUN_API_KEY=your-mailgun-key
FROM_EMAIL=noreply@trustconnect.com

# SMS/WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890

# File Storage
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=trustconnect-uploads
AWS_REGION=us-east-1

# External APIs
GOOGLE_MAPS_API_KEY=your-google-maps-key
GOOGLE_PLACES_API_KEY=your-places-key

# Server
PORT=8080
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 4. Database Setup

```bash
# Create database
createdb trustconnect

# Run migrations
npm run db:migrate

# Seed initial data
npm run db:seed
```

### 5. Start Development

```bash
npm run dev
```

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Docker Deployment

```bash
# Build image
docker build -t trustconnect .

# Run container
docker run -p 8080:8080 --env-file .env trustconnect
```

### Docker Compose

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "8080:8080"
    env_file:
      - .env
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: trustconnect
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### Cloud Deployment Options

#### Vercel/Netlify (Frontend)

```bash
# Frontend only
npm run build:client
```

#### Railway/Render (Full-stack)

```bash
# Build command
npm run build

# Start command
npm run start
```

#### AWS/Google Cloud/Azure

- Use provided Dockerfile
- Set up RDS/Cloud SQL for database
- Configure environment variables
- Set up CDN for static assets

## 🔧 API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/verify-email/:token
```

### Users

```
GET    /api/users/profile
PUT    /api/users/profile
POST   /api/users/upload-avatar
GET    /api/users/:id
```

### Providers

```
POST   /api/providers/register
GET    /api/providers
GET    /api/providers/:id
PUT    /api/providers/:id
POST   /api/providers/:id/verify
GET    /api/providers/:id/reviews
GET    /api/providers/:id/earnings
```

### Services

```
GET    /api/services
POST   /api/services
GET    /api/services/:id
PUT    /api/services/:id
DELETE /api/services/:id
GET    /api/services/search
GET    /api/services/categories
```

### Bookings

```
GET    /api/bookings
POST   /api/bookings
GET    /api/bookings/:id
PUT    /api/bookings/:id
DELETE /api/bookings/:id
POST   /api/bookings/:id/cancel
POST   /api/bookings/:id/complete
```

### Payments

```
POST   /api/payments/create-intent
POST   /api/payments/confirm
POST   /api/payments/refund
GET    /api/payments/methods
POST   /api/payments/methods
DELETE /api/payments/methods/:id
```

### Messages

```
GET    /api/messages/conversations
GET    /api/messages/conversations/:id
POST   /api/messages/conversations/:id/messages
POST   /api/messages/conversations
PUT    /api/messages/:id/read
```

### Support

```
GET    /api/support/tickets
POST   /api/support/tickets
GET    /api/support/tickets/:id
PUT    /api/support/tickets/:id
POST   /api/support/tickets/:id/resolve
GET    /api/support/chat/active
POST   /api/support/chat/start
```

## 📱 Third-Party Integrations

### Payment Processing

- **Stripe** for credit card processing
- **PayPal** for PayPal payments
- **Bank transfers** support ready

### Communication

- **Twilio** for SMS notifications
- **Twilio WhatsApp** for WhatsApp messaging
- **SendGrid** for transactional emails
- **Socket.io** for real-time chat

### Maps & Location

- **Google Maps API** for location services
- **Google Places API** for address autocomplete
- **Geolocation** for distance calculations

### File Storage

- **AWS S3** for file uploads
- **Cloudinary** alternative ready
- **Local storage** for development

### Monitoring & Analytics

- **Sentry** for error tracking
- **Google Analytics** for user analytics
- **Mixpanel** for event tracking

## 🔒 Security Features

### Authentication & Authorization

- JWT tokens with refresh mechanism
- Role-based access control (RBAC)
- Permission-based UI rendering
- Protected API routes

### Data Protection

- Password hashing with bcrypt
- SQL injection prevention
- XSS protection
- CSRF protection
- Rate limiting

### File Security

- File type validation
- Size limitations
- Malware scanning ready
- Secure file storage

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### Integration Tests

```bash
npm run test:integration
```

### E2E Tests

```bash
npm run test:e2e
```

## 📊 Performance

### Frontend Optimization

- Code splitting with React.lazy
- Image optimization
- Bundle analysis
- PWA ready

### Backend Optimization

- Database indexing
- Query optimization
- Caching with Redis
- API rate limiting

## 🌍 Internationalization

### Multi-language Support

- i18n configuration ready
- Language detection
- Translation management
- RTL support ready

## 📈 Monitoring & Logging

### Application Monitoring

- Error tracking with Sentry
- Performance monitoring
- User analytics
- Server monitoring

### Logging

- Structured logging
- Log levels (error, warn, info, debug)
- Log rotation
- Remote log aggregation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- 📧 Email: support@trustconnect.com
- 💬 Chat: Available in app
- 📞 Phone: 1-800-TRUST-CO
- 📚 Documentation: [docs.trustconnect.com](https://docs.trustconnect.com)

## 🗺 Roadmap

### Phase 1 (Current)

- ✅ Core platform features
- ✅ Multi-role system
- ✅ Payment integration
- ✅ Communication system

### Phase 2 (Next)

- 🔄 Mobile apps (React Native)
- 🔄 Advanced analytics
- 🔄 AI-powered recommendations
- 🔄 Video consultations

### Phase 3 (Future)

- ⏳ Multi-language support
- ⏳ Advanced reporting
- ⏳ Third-party integrations
- ⏳ Enterprise features

---

Built with ❤️ by the TrustConnect Team
