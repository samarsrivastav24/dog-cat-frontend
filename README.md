## Dog & Cat Language Translator (Frontend Demo)

This is a **frontend‑only** React app (Vite) that walks through a playful flow for translating dog and cat language using AI.  
There is **no backend** – everything runs in the browser and uses `localStorage` / `sessionStorage`.

### Tech stack

- **React 18** with functional components and hooks
- **Vite** for fast dev/build
- **React Router** for navigation + protected routes
- Plain CSS (`src/index.css`) for a modern, responsive UI

### Pages & flow

1. **Login page** (`/`)
   - Enter phone number.
   - Click **Send OTP** to generate a random 6‑digit code.
   - OTP is stored in `sessionStorage` and shown via `alert` (demo only).
   - Redirects to `/otp`.

2. **OTP verification page** (`/otp`)
   - Enter the 6‑digit OTP from the alert.
   - If correct:
     - Sets `localStorage.isLoggedIn = "true"`.
     - Redirects to `/select-animal`.
   - If incorrect: shows an inline error message.

3. **Animal selection page** (`/select-animal`)
   - Two large cards:
     - **Dog** 🐶
     - **Cat** 🐱
   - On click:
     - Stores `localStorage.selectedAnimal` (`"dog"` or `"cat"`).
     - Clears any previous `selectedBreed`.
     - Redirects to `/select-breed`.

4. **Breed selection page** (`/select-breed`)
   - If **Dog**:
     - Labrador, German Shepherd, Golden Retriever, Pug, Husky.
   - If **Cat**:
     - Persian, Siamese, Maine Coon, Bengal, British Shorthair.
   - On selection:
     - Stores `localStorage.selectedBreed`.
     - Redirects to `/upload`.

5. **Upload options page** (`/upload`)
   - Shows the selected animal + breed at the top.
   - Three large option cards:
     - 📷 **Upload Photo** → `accept="image/*"`
     - 🎥 **Upload Video** → `accept="video/*"`
     - 🎤 **Sound Only** → `accept="audio/*"`
   - Clicking an option highlights the card and shows the matching file input.
   - UI only – **files are not uploaded anywhere**.

6. **Route protection**
   - All routes except `/` (login) and `/otp` are wrapped in a `ProtectedRoute` component.
   - If `localStorage.isLoggedIn !== "true"`, user is redirected back to `/`.

### Running the project

From the project root (`frontend dog` folder):

```bash
npm install
npm run dev
```

Then open the printed `http://localhost:5173` URL in your browser.

### Build for production

```bash
npm run build
npm run preview
```

### Where to look in the code

- `src/main.jsx` – React entry point + router wrapper.
- `src/App.jsx` – Route definitions and protected routes.
- `src/components/ProtectedRoute.jsx` – Simple auth guard based on `localStorage.isLoggedIn`.
- `src/pages/LoginPage.jsx` – Phone number input + OTP generation.
- `src/pages/OtpPage.jsx` – OTP verification and login flag.
- `src/pages/AnimalSelectionPage.jsx` – Dog/Cat selection.
- `src/pages/BreedSelectionPage.jsx` – Breed cards based on selected animal.
- `src/pages/UploadOptionsPage.jsx` – Upload type cards and file inputs.
- `src/index.css` – Global styling and modern card UI.

