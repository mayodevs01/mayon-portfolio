Recreate the attached reference as a complete working website in the current project.

The attached image is the primary visual specification. Match it as closely as possible, including:

- overall layout and section order
- near-black background
- purple accent colour
- typography sizes and hierarchy
- header and navigation
- hero composition
- layered desktop and mobile website mockups
- project cards
- industry cards
- spacing and proportions
- borders, shadows and subtle purple glows
- process section
- final CTA and footer
- responsive mobile and tablet behaviour

Do not only analyse the image or describe an implementation plan. Create and edit the actual project files now.

PROJECT DETAILS

Brand name: MAYON
Domain: mayon.lol
Email: mayodevs01@gmail.com
Positioning: Independent Web & Software Studio

Main headline:
Websites and software built for real businesses.

Supporting text:
I design and develop professional websites, online stores, booking systems, dashboards and SaaS products that help businesses look better, attract customers and operate more efficiently.

TECH STACK

If the repository does not already contain an application, create one using:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Framer Motion only for restrained animations

Keep dependencies minimal and use reusable, maintainable components.

FIRST INSPECT THE ENVIRONMENT

Before implementing, run:

pwd
git status
git remote -v
gh auth status

Confirm that all work is happening only inside:

C:\Projects\mayon-portfolio

Never create or modify files outside the current repository.

MAIN ROUTES

Create:

/
 /work
 /services
 /industries
 /about
 /contact

Demo routes:

/demos/real-estate
/demos/ecommerce
/demos/restaurant
/demos/local-service
/demos/professional
/demos/saas

Case-study routes:

/work/haven-key-realty
/work/northline-supply
/work/ember-house
/work/luma-studio
/work/northstar-advisory
/work/leadpilot

Also create a custom 404 page.

HEADER

Use:

MAYON

Navigation:

Work
Services
Industries
About
Contact

Primary CTA:

Start a Project

Create a sticky desktop header and a fully working mobile menu.

HOMEPAGE HERO

Small label:

Independent Web & Software Studio

Headline:

Websites and software built for real businesses.

Make “real businesses.” purple.

Buttons:

Explore My Work
Start a Project

Create the overlapping device and browser preview composition shown in the reference. Do not use a generic laptop image. Build the mockups using website preview panels, CSS transforms, shadows, borders and subtle glows.

Add these trust indicators:

Responsive on every device
Fast and performance-focused
SEO-ready foundations
Designed around business goals
Easy to update and expand

INDUSTRY SECTION

Heading:

What are you looking to build?

Cards:

Real Estate
Online Store
Restaurant
Local Service
Professional Firm
SaaS Product

Each card must link to its demo and include a visual preview and View Demo action.

PROJECTS

Create these six projects:

1. Haven & Key Realty
Real Estate Website

2. Northline Supply
Ecommerce Store

3. Ember House
Restaurant Website

4. Luma Studio
Local Service Business

5. Northstar Advisory
Professional Website

6. LeadPilot
SaaS Dashboard

Show them in both:

- a six-card live-demo row
- a numbered featured-project grid

Each featured card must include:

- number
- visual preview
- category
- project name
- short description
- Live Demo button
- Case Study button

PROCESS

Create a six-step horizontal process:

Discover
Plan
Design
Develop
Review
Launch

Use circular purple icons and connecting lines. Convert it to a clean vertical layout on mobile.

FINAL CTA

Headline:

Have a business?
Let’s build something
that works for it.

Checklist:

Clear communication
On-time delivery
Clean and modern design
Scalable and maintainable code

Buttons:

Start a Project
Email Me

Email Me must link to:

mailto:mayodevs01@gmail.com

FOOTER

Include:

MAYON
Websites and software built for real businesses.

Navigation links
Service links
mayodevs01@gmail.com
GitHub placeholder
LinkedIn placeholder
Instagram placeholder

Copyright:

© 2026 Mayon. All rights reserved.

INTERACTIVE DEMOS

Each demo must feel like a different real website, not another portfolio section.

Add a subtle floating demo toolbar containing:

- Mayon
- current demo name
- Change Demo
- Back to Portfolio
- Start a Similar Project

REAL ESTATE DEMO

Brand: Haven & Key Realty

Include:

- property listings
- search
- location, price, bedroom and type filters
- property details
- image gallery
- save-property interaction
- agent information
- viewing-booking modal
- mortgage calculator
- WhatsApp enquiry
- similar properties

All filters and the calculator must work with realistic fictional data.

ECOMMERCE DEMO

Brand: Northline Supply

Include:

- product catalogue
- categories
- search and filters
- product details
- size and colour selection
- quantity selection
- wishlist
- cart drawer
- discount-code interaction
- checkout demonstration
- order-success state

Cart totals must calculate correctly. Do not process real payments.

RESTAURANT DEMO

Brand: Ember House

Include:

- menu
- menu categories
- menu search
- dietary labels
- featured dishes
- gallery
- table reservation form
- date, time and party-size selection
- reservation confirmation
- location and opening hours
- WhatsApp ordering

LOCAL SERVICE DEMO

Brand: Luma Studio

Include:

- services
- pricing
- staff profiles
- gallery
- reviews
- multi-step appointment booking
- service selection
- employee selection
- date and time selection
- booking summary
- confirmation state

PROFESSIONAL DEMO

Brand: Northstar Advisory

Include:

- services
- industries
- fictional case studies
- team
- insights
- consultation booking
- contact form

Do not add fake awards, fake real clients or fake business results.

SAAS DEMO

Brand: LeadPilot

Include:

- SaaS marketing page
- features
- pricing
- login and signup interfaces
- Explore Demo Dashboard button
- KPI cards
- leads table
- lead search and filters
- add-lead modal
- sales pipeline
- tasks
- analytics
- notifications
- team
- billing
- settings

Visitors must be able to explore without creating a real account.

CONTACT FORM

Fields:

- full name
- email
- phone or WhatsApp
- business name
- existing website
- business type
- project type
- features required
- budget
- launch timeline
- project details
- reference demo

Add validation, loading, error and success states.

For now, make submission open a properly formatted email addressed to mayodevs01@gmail.com unless a secure backend is already available.

Start a Similar Project buttons must prefill the relevant project type and reference demo.

CONTENT RULES

Do not use:

- lorem ipsum
- fake testimonials for Mayon
- fake clients
- fake awards
- fake statistics
- exaggerated experience claims
- broken placeholder buttons
- generic AI marketing phrases

Clearly label demo work as concept projects.

RESPONSIVENESS AND ACCESSIBILITY

Ensure:

- no horizontal overflow
- strong mobile layouts
- functional mobile navigation
- touch-friendly controls
- responsive dashboard tables
- keyboard navigation
- visible focus states
- accessible forms and modals
- good colour contrast
- reduced-motion support

IMPLEMENTATION PROCESS

Work in checkpoints:

Checkpoint 1:
Create application foundation, design system, routing, header, footer and homepage.

Checkpoint 2:
Create Work, Services, Industries, About, Contact and case-study pages.

Checkpoint 3:
Create all six interactive demos.

Checkpoint 4:
Perform responsive polishing, accessibility checks and production testing.

After every checkpoint:

- inspect the result
- run the build
- fix errors
- make a Git commit

Use clear commit messages.

FINAL VERIFICATION

Before finishing:

1. Run npm install if required.
2. Run npm run build.
3. Fix every TypeScript, import and build error.
4. Check every route.
5. Check every navigation item.
6. Check buttons, filters, calculators, cart and booking interactions.
7. Check responsive layouts.
8. Check for console errors.
9. Ensure no secrets or .env files are committed.
10. Run git status.

GITHUB

If no GitHub remote exists:

1. Confirm gh auth status succeeds.
2. Create a public GitHub repository named mayon-portfolio using the currently authenticated account.
3. Add it as origin.

Use:

gh repo create mayon-portfolio --public --source=. --remote=origin

After the full production build passes:

1. Stage all safe project files.
2. Commit the final changes.
3. Show me the final build result, Git status and commit history.
4. Ask for my explicit confirmation before running git push origin main.

Do not push until I confirm.

Begin implementation now. Do not stop after writing a plan or only completing the homepage.