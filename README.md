<p align="center">
  <a href="#" target="blank"><img src="https://res.cloudinary.com/dp6urj3gj/image/upload/v1731674488/car_logo_tst97o.png" width="240" alt="Chaka Ride Logo" /></a>
</p>

<p align="center">A modern ride-sharing platform UI: trip requests, driver bidding, admin moderation, and AI-powered vehicle assistants against the Chaka Ride API.</p>

# CHAKA RIDE CLIENT

**CHAKA RIDE CLIENT** is the Next.js frontend for Chaka Ride. Passengers can browse car categories, request trips, and manage their rides. Drivers can view incoming trip requests, place bids with the help of an AI price estimator, and manage their earnings. Staff use the admin dashboard for moderation, trip oversight, and user administration.

---

## ✨ Features

### Roles (enforced server-side)

`PASSENGER` · `DRIVER` · `ADMIN` · `SUPER_ADMIN`

### 👤 Passenger

- **Smart Trip Assistant**: **Natural language vehicle search** using an AI-powered assistant. Describe your trip (e.g., "Need a car for 5 people to Cox's Bazar") and get instant AI-curated car recommendations.
- **Trip Booking**: Seamless booking flow for One-Way or Round-Trip journeys.
- **My Rides**: Dedicated dashboard to track pending, assigned, and completed trips.
- **My Queries**: Built-in support query system to communicate with admins.
- **Auth**: Better Auth (email/password), session-aware navigation.

### 🚗 Driver

- **Driver Dashboard**: Overview of earnings, complete with monthly revenue charts and "Pending Clearance" trackers.
- **Bidding System**: View incoming passenger trip requests and submit competitive bids.
- **AI Smart Estimate**: Get an instant, AI-generated "Fair Market Price" estimate when placing a bid, factoring in route, distance, and car category.
- **Profile Management**: Upload and manage vehicle documents and driver's licenses.

### 🛠️ Admin / Super Admin

- **Operational Overview**: Track platform revenue, active trips, and driver/passenger statistics.
- **Trips Moderation**: Manage all trips with server-side pagination, status filtering, and search functionalities.
- **Driver Approval**: Review driver bids and assign them to passenger trips.
- **Users**: Manage applicants, drivers, and staff lists.

### 🌐 Public

- Marketing/home sections, fleet catalog, services breakdown, and sign-in/register entry points.

---

## 🛠️ Technology stack

- **Framework**: [Next.js](https://nextjs.org/) (v15+), App Router
- **UI**: [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), Radix UI, Shadcn-style components, Framer Motion
- **Data**: [TanStack Query](https://tanstack.com/query), [Axios](https://axios-http.com/) instance for REST
- **Auth**: [Better Auth](https://www.better-auth.com/) client (`baseURL` derived from `NEXT_PUBLIC_API_URL`)
- **Forms**: React Hook Form, [Zod](https://zod.dev/)
- **UX**: Sonner toasts, Recharts (for driver earnings)

---

## 📋 Prerequisites

- **Node.js** v20+ recommended
- **pnpm** or **npm**
- A running **Chaka Ride Server** (local or deployed) — see backend README for database and environment setup.

---

## 🔧 Setup

### 1. Clone and enter the client

```bash
git clone https://github.com/mazharul90007/chaka_ride.git
cd chaka_ride/chaka-ride-client
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment variables

Create `.env.local` in this directory.

**Local API** (default server port from backend README is `4000`)

```env
NEXT_PUBLIC_API_URL="http://localhost:4000/api/v1"
```

The Better Auth client uses the same host with `/api/v1` stripped, so it must match your server’s public URL and CORS/cookie settings.

### 4. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📜 Project structure

- `src/app` — App Router routes: public site, `(dashboardLayout)` admin/driver/passenger, auth pages
- `src/components` — Shared UI, dashboard, auth, home sections
- `src/hooks` — React Query hooks (e.g., `useTrip.ts`, `useAIEstimate.ts`)
- `src/lib` — Axios client, Better Auth client
- `src/assets` — Static images and media

---

## 👤 Author

**Mazharul Islam Sourabh**

---

## 📝 License

ISC
