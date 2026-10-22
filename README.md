# Ranjeet Singh Patel — Hotel General Manager Portfolio

Ultra-premium executive personal portfolio for **Ranjeet Singh Patel**, Hotel General Manager at **Hotel The Ideal, Kushinagar**.

---

## ⚠️ Phase 3 Verification TODOs (Private / Internal)

- [ ] **TODO — Designation Verification:** The CV lists *Operations Manager* for Hotel The Ideal, Kushinagar, whereas the WhatsApp greeting and client request identify Ranjeet Singh Patel as *General Manager*. *General Manager* is displayed across the public portfolio. Verify the official current designation before final publication or update `src/data/profile.js`.
- [ ] **TODO — Official CV Upload:** Place the official, verified PDF resume in `public/resume.pdf`. Once the file is present, toggle `resumeAvailable: true` in `src/data/profile.js` to enable automatic download triggers.
- [ ] **TODO — Tenure Dates:** Employment dates for the 4 listed Kushinagar hotel positions (Hotel The Ideal, Hotel Adelphi Grande, Hotel Om Residency, A Unit of Inpac Hotel & Resorts Pvt. Ltd.) are kept as editable placeholders awaiting verified dates.
- [ ] **TODO — Hotel Photography:** Upload authorized property photos to `public/images/ranjeet/` (see paths below) or maintain graceful fallback image placeholders.

---

## Verified Professional Profile

- **Full Name:** Ranjeet Singh Patel
- **Public Designation:** General Manager
- **Property:** Hotel The Ideal, Kushinagar
- **Location:** Kushinagar, Uttar Pradesh, India
- **Total Hospitality Experience:** 12 Years (*"12 Years of Hospitality Experience"*)
- **Highest Qualification:** Master of Hotel Management (M.H.M.), Sikkim Global Technical University
- **Undergraduate:** Graduation, Lilavati D.P. College, Piprajham, Kushinagar (Affiliated with D.D.U. Gorakhpur University)
- **Secondary:** Intermediate (S.D.I.J. Sohariya, Deoria) & High School (B.N. Lal HSS, Sirsiya Khohiya, Kushinagar) — UP Board
- **Technical Diploma:** Diploma in Computer Applications (D.C.A.), Uma Electronic Institute, Kasia, Kushinagar
- **Languages:** Hindi & English
- **Email:** [ranjeetsinghkushinagar2@gmail.com](mailto:ranjeetsinghkushinagar2@gmail.com)
- **Direct Phone & WhatsApp:** [+91 8707015028](https://wa.me/918707015028)

---

## Image & Asset Configuration

All images are loaded with graceful fallbacks via `<SafeImage />` so missing files never break the layout.

Store files in `public/images/ranjeet/`:

| Configurable Path | Purpose |
|---|---|
| `public/images/ranjeet/profile.webp` | Hero & Executive Profile Portrait |
| `public/images/ranjeet/portrait-2.webp` | Secondary Portrait / Kushinagar Journey |
| `public/images/ranjeet/hotel-the-ideal.webp` | Hotel The Ideal Property Photograph |
| `public/images/ranjeet/hotel-adelphi-grande.webp` | Hotel Adelphi Grande Property Photograph |
| `public/images/ranjeet/hotel-om-residency.webp` | Hotel Om Residency Property Photograph |
| `public/images/ranjeet/inpac-hotel.webp` | Inpac Hotel & Resorts Property Photograph |
| `public/images/ranjeet/certificates/` | Verified certificate scans & credentials |

---

## Contact Form & EmailJS Setup (Optional)

The contact form includes client-side validation, error handling, and loading states. By default, it operates in safe simulation mode with a direct WhatsApp message fallback.

To connect EmailJS for automated email delivery without exposing credentials:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an `.env` file in the project root:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
3. Never commit `.env` with secret credentials to public repositories.

---

## Centralized Data Architecture

All content is managed through centralized data files in `src/data/`:

- `profile.js` — Name, public title, bio paragraphs, contact details, vision, philosophy, hero copy.
- `experience.js` — The 4 verified hotel positions in Kushinagar, editable responsibilities, and 5 educational qualifications.
- `skills.js` — Hospitality experience, computer skills (D.C.A.), languages, and professional values.
- `projects.js` — "My Hospitality Journey" showcasing the 4 featured hotels.
- `achievements.js` — Verified statistics banner (12 Years, MHM, 4 Entries, 2 Languages) and professional values.

---

## Tech Stack & Commands

- **React + Vite**
- **Tailwind CSS v4** + Luxury Design System (Navy, Charcoal, Champagne Gold, Ivory)
- **React Router DOM**
- **Framer Motion**
- **Lucide React**

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## License

© Ranjeet Singh Patel. All rights reserved.
