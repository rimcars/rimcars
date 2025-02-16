## Project Context Overview

**Project Name:** Online Car Marketplace  
**Stack:**  
- **Frontend:** Next.js 14 (App Router, server actions), Tailwind CSS, shadcn UI  
- **Backend:** Supabase (PostgreSQL with RLS, Auth, Storage)  

**Key Features:**  
- **User Management:**  
  • Registration and login via Supabase Auth  
  • Profile management with fields like name and avatar URL  
  • A trigger function that automatically inserts new users into the `public.users` table  
- **Listings Management:**  
  • CRUD operations for car listings with these fields:  
    - **car_name** (replaces title)  
    - **description**  
    - **price** and optional **old_price**  
    - **make**, **model**, **year**, **mileage**, **location**  
    - **condition** (ENUM: 'new', 'used')  
    - **transmission** (ENUM: 'manual', 'automatic')  
    - **fuel_type** (ENUM: 'petrol', 'diesel', 'electric', 'hybrid')  
    - **images** (an array of image URLs)  
  • Search and filter capabilities on listings  
- **Admin Controls:**  
  • Admins have full CRUD capabilities for both users and listings  
  • Access control enforced via Row Level Security (RLS) and a helper function (`is_admin()`)  
- **Data Handling:**  
  • File uploads for listing images using Supabase Storage  
  • All server-side interactions (CRUD operations) are handled via Next.js server actions (not API routes)

---

## Task Breakdown

### 1. Project Setup
- **Initialize Next.js Project:**  
  - Create a new Next.js 14 project using the App Router.  
  - Set up Tailwind CSS and install shadcn UI components.
- **Environment Configuration:**  
  - Configure environment variables for your Supabase connection.

### 2. Supabase Backend Setup
- **ENUM & Table Creation:**  
  - Define ENUM types:  
    - `user_role` ('buyer', 'seller', 'admin')  
    - `car_condition` ('new', 'used')  
    - `transmission_type` ('manual', 'automatic')  
    - `fuel_type` ('petrol', 'diesel', 'electric', 'hybrid')  
  - Create the **users** table with columns:  
    - `id`, `email`, `name`, `avatar_url`, `role`, `created_at`, `updated_at`  
  - Create the **listings** table with columns:  
    - `id`, `user_id` (FK to users), `car_name`, `description`, `price`, `old_price`, `make`, `model`, `year`, `mileage`, `location`, `condition`, `transmission`, `fuel_type`, `images` (as TEXT[]), `created_at`, `updated_at`
- **Indexes & RLS Policies:**  
  - Add indexes on commonly queried fields (price, car_name, make, model, etc.)  
  - Enable RLS on both tables:  
    - Regular users can access only their own records  
    - A helper function (`is_admin()`) grants full access to admin users
- **Helper Function & Trigger:**  
  - Create a helper function `public.is_admin()` to check if a user is an admin (using `auth.uid()` and the `users` table).  
  - Create a trigger function (e.g., `handle_new_user()`) to insert new user data (name, avatar_url, role) from Supabase Auth metadata into the `public.users` table.

### 3. Authentication & User Management
- **Auth Integration:**  
  - Integrate Supabase Auth into your Next.js project for user registration and login.  
  - Build pages for sign-up, login, and profile management.
- **User Profile:**  
  - Display profile details (name, avatar) and allow updates.

### 4. Car Listings Functionality
- **Listings Page:**  
  - Build a page to display all listings with search and filter options based on price, make, model, year, location, fuel type, transmission, and condition.
- **Listing Detail Page:**  
  - Create a dynamic route (`/listings/[id]`) for detailed views of individual car listings, including an image gallery (using the images array) and complete car details.
- **CRUD Operations via Server Actions:**  
  - Implement server actions in Next.js for creating, updating, and deleting listings.  
  - Develop forms for listing creation and update; ensure they support file uploads for images using Supabase Storage.

### 5. Dashboard & Admin Features
- **Seller Dashboard:**  
  - Create a dashboard for sellers to manage their own listings (view, edit, delete).
- **Admin Dashboard:**  
  - Build an admin panel that provides full control over users and listings.  
  - Use the `is_admin()` function within your server actions to ensure admins can override normal access controls.

### 6. Data Handling & Server Actions
- **Server Actions:**  
  - Use Next.js server actions for all data mutations instead of API routes.  
  - Implement server actions for:  
    - Submitting new listings  
    - Editing or deleting listings  
    - Managing user profiles (if necessary)
- **Image Uploads:**  
  - Develop an image upload component that interacts with Supabase Storage.  
  - Ensure that the uploaded image URLs are stored in the `images` array for each listing.

### 7. UI/UX & Styling
- **Consistent Layout:**  
  - Design a consistent header, footer, and navigation using shadcn UI and Tailwind CSS.
- **Reusable Components:**  
  - Build components for listing cards, detailed views, forms, and dashboards.  
  - Ensure components are responsive and optimized for mobile use.
- **Styling:**  
  - Leverage Tailwind CSS to create a clean, modern interface.

### 8. Testing & Quality Assurance
- **Component & Server Action Testing:**  
  - Write unit tests for key UI components using Jest and React Testing Library.  
  - Test server actions to ensure they correctly interact with Supabase and enforce RLS policies.
- **RLS Policy Testing:**  
  - Use Supabase’s testing tools to verify that users can only access their own data and that admin functions work as intended.

### 9. Documentation
- **Project Documentation:**  
  - Document the project architecture, data schema, and server actions.  
  - Provide clear onboarding instructions for collaborators and for your AI agent to understand the project context.

---

## Context Summary for AI Agent (Cursor AI)

- **Project Name:** Online Car Marketplace  
- **Stack:** Next.js 14 (App Router with server actions), Tailwind CSS, shadcn UI, Supabase  
- **Core Functionality:**  
  - **User Management:** Integrate Supabase Auth; auto-insert new user data (name, avatar, role) using a trigger function.  
  - **Listings Management:** Enable sellers to create, update, and delete car listings. Listings include detailed fields (car_name, description, price, old_price, make, model, year, mileage, location, condition, transmission, fuel_type, images array).  
  - **Access Control:** Use Supabase RLS policies along with a helper function (`is_admin()`) to ensure users can only access their own data while admins have full control.  
  - **Server Actions:** Handle all data mutations (CRUD) via Next.js server actions instead of API routes.  
  - **UI/UX:** Build a responsive, modern interface using shadcn UI components and Tailwind CSS.  
- **Task List:**   
  3. Integrate Supabase Auth and build user management pages.  
  4. Develop car listing pages and CRUD operations using server actions.  
  5. Create dashboards for sellers.  
  6. Build file upload components for images and integrate with Supabase Storage.  
  7. Document the project structure, setup, and workflows.
