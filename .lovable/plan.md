

# InternTrack — Internship Application Tracker

A stunning, scroll-driven website with bold gradients, vibrant colors, and animated backgrounds where students can log and track internship applications, and admins can post verified opportunities.

---

## Page 1: Landing / Hero (Scroll-animated)
- Full-screen hero section with animated gradient background (purple → blue → teal shifting gradients)
- Bold headline: "Track Your Internship Journey" with fade-in text animation
- Floating 3D-style cards that animate as you scroll, showing sample internship stats
- Smooth scroll-down indicator with bouncing arrow
- Two CTA buttons: "I'm a Student" and "I'm an Admin" — each scrolls/navigates to the relevant section

## Page 2: Student Dashboard
- **Top Stats Bar**: Animated counters showing Total Applications, Interviews, Offers, Pending — each in a colorful gradient card with hover-scale effects
- **Application Logger**: A vibrant form (slide-in animation) to add new applications:
  - Company name, Role/Position, Date Applied, Application Link (optional), Notes
  - Status selector: Applied → Interview → Offered → Rejected (color-coded chips)
- **Applications Table/Cards View**: Toggle between table and card grid view
  - Each card has a gradient border based on status (green=offered, yellow=interview, blue=applied, red=rejected)
  - Status update dropdown directly on each card
  - Smooth fade-in stagger animation as cards load
- **Stats Dashboard Section**: 
  - Donut chart for status breakdown
  - Line chart for applications over time
  - All with gradient fills and smooth enter animations

## Page 3: Browse Opportunities (Student View)
- Scrolling feed of admin-posted verified internships
- Each opportunity card: Company logo placeholder, role, location, stipend, deadline, tags
- Vibrant gradient badges for categories (Tech, Design, Marketing, etc.)
- Search and filter bar with animated dropdown filters
- "Apply Now" button with ripple animation effect
- Cards animate in with staggered fade-up on scroll

## Page 4: Admin Panel
- Toggle to admin view via the "I'm an Admin" button (no auth, just UI switch)
- **Post Opportunity Form**: Rich form with fields — Company, Role, Description, Location, Stipend, Deadline, Category tags
- **Manage Posted Opportunities**: List of posted opportunities with edit/delete actions
- Colorful admin dashboard header with gradient background

## Design System
- **Color palette**: Vibrant gradients — purple (#8B5CF6), blue (#3B82F6), teal (#14B8A6), pink (#EC4899)
- **Background**: Subtle animated gradient mesh / blobs floating behind content
- **Cards**: Glassmorphism with frosted backgrounds and gradient borders
- **Typography**: Bold, modern headings with gradient text effects
- **Animations**: Scroll-triggered fade-ins, parallax floating elements, hover-scale on cards, staggered list animations
- **Dark-first design** with vibrant color pops

## Navigation
- Sticky top navbar with blur backdrop, gradient logo text
- Smooth scroll navigation between sections on the landing page
- Tab-based navigation for Student Dashboard sub-sections

## Data Storage
- All data stored in React state / localStorage for persistence (no backend for now)
- Mock data pre-populated for demo purposes

