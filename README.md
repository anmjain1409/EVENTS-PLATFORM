# Events Management Platform

A full-stack Events Management module built using **Next.js**, **TypeScript**, and **Drizzle ORM**.  
This project demonstrates end-to-end ownership, clean architecture, and production-grade engineering practices.

The focus of this assignment is not only functionality, but also **code quality, reusability, and clarity**.

---

## 🚀 Live Demo

🔗 **Deployed URL:**  
(Add your Vercel deployment link here)

---

## 🧩 Features

### Backend
- Full CRUD APIs for Events
- REST APIs using Next.js App Router
- Drizzle ORM with MySQL (PlanetScale compatible)
- Input validation using Zod
- Typed API responses (type aliases only)
- Proper error handling
- Clean and scalable folder structure

### Frontend
- Events List Page
- Event Detail Page
- Create / Edit Event Page
- Delete Event functionality
- Responsive UI using Tailwind CSS
- Loading, Error, and Empty states
- Smooth animations using Framer Motion

### Data Handling
- React Query (TanStack Query) for:
  - Data fetching
  - Mutations
  - Cache invalidation
- Optimized state updates to reduce unnecessary re-renders

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Query (TanStack Query)

### Backend
- Next.js API Routes
- TypeScript
- Drizzle ORM
- MySQL (PlanetScale ready)

### Optional / Future Ready
- Web3.js / Metaplex (Solana)
- Redis
- Stripe

---

## 📂 Folder Structure

src/
├── app/
│ ├── events/
│ │ ├── page.tsx
│ │ ├── create/
│ │ ├── [id]/
│ │ │ ├── page.tsx
│ │ │ └── edit/
│ │ │ └── page.tsx
│ └── api/
│ └── events/
│ ├── route.ts
│ └── [id]/
│ └── route.ts
├── components/
│ ├── EventCard.tsx
│ ├── EventForm.tsx
│ ├── LoadingSkeleton.tsx
│ ├── EmptyState.tsx
│ └── ErrorState.tsx
├── db/
│ ├── schema/
│ │ └── events.ts
│ └── index.ts
├── lib/
│ ├── api/
│ │ └── event.ts
│ └── validators/
│ └── event.schema.ts


---
⚙️ Setup Instructions

1. Clone Repository

git clone <your-repo-url>
cd events-platform

2.Install Dependencies

npm install

3.Environment Variables

Create a .env file in the root directory:
DATABASE_URL="mysql://username:password@host:port/database"

4.Run Database Migration
npx drizzle-kit push

5.Start Development Server
npm run dev


Application will be available at: http://localhost:3000

🔄 API Endpoints
Method	      Endpoint	           Description
POST	     /api/events	       Create an event
GET	        /api/events	           Get all events
GET	       /api/events/:id	       Get event by ID
PUT	       /api/events/:id	       Update an event
DELETE 	  /api/events/:id	       Delete an event

🎨 UI / UX Notes

UI is not a pixel-perfect Figma match.
Focus was placed on:
Clean architecture
Reusable components
Clear UX states (loading, error, empty)
Scalable design patterns

🧠 Design Decisions

Events schema designed based on real-world use cases
React Query used for better mutation and cache control
Reusable form component for Create and Edit flows
Subtle animations for better UX without overuse

🔮 Future Improvements

Pagination for event listing
Authentication & authorization
NFT integration on Solana Devnet
Payments using Stripe
Redis caching