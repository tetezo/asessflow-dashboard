# AssessFlow - Patient Assessment Dashboard


## Running the Project Locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```


## Features

- Dashboard with key statistics cards
- Search and filtering by patient, status, type, and date range
- Desktop table view and mobile card-based layout
- Client-side pagination (5 items per page)
- Slide-over assessment detail panel
- Score gauge visualization and subscale breakdown
- Fully responsive layout (mobile-first)



## Notes 

I started with the core layout and UI structure and then layered in filtering, pagination, and responsive behavior.

This was my first time working with **shadcn/ui**, which required adapting and extending its components to closely match the provided design reference. I also encountered some challenges related to **Tailwind CSS v4**, particularly around style overrides and component composition.

I was very focused on a pixel-perfect implementation, carefully matching spacing, typography, sizing, alignment, and visual hierarchy based on the design reference.

From an architectural standpoint, I chose to separate **AssessmentTable (desktop)**, **AssessmentCard (mobile)**, and **Pagination** into independent components to keep responsibilities clear and simplify responsive logic. Filtering and pagination state are managed at the dashboard level.

To validate the **“Last 30 days”** filter, I added an extra assessment entry to the mock data and included active-state feedback and a tooltip for better UX. The most challenging part was implementing the **score gauge visualization**, which required experimentation to achieve the correct visual behavior while staying within Tailwind-based styling.