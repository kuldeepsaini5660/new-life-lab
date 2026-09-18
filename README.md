# New Life Lab — React Website

Ye New Life Lab ki website ka React (Vite) version hai. Sabhi pages
(Home, About, Tests, Packages, Home Collection, Reports, Book a Test,
Contact, FAQ, Privacy, Terms, Disclaimer) ek hi React app ke andar hain.
Har booking/contact form submit karte hi seedha WhatsApp khulta hai aur
message aapke number par ja pahunchta hai.

## Kya kya install karna hai

Sabse pehle apne computer mein **Node.js** install karna hoga (isme
`npm` bhi saath aata hai):

1. https://nodejs.org par jaayein aur **LTS version** download karke install kar lein.
2. Install hone ke baad terminal / command prompt kholkar check karein:
   ```
   node -v
   npm -v
   ```
   Dono ke version number dikhne chahiye — agar dikh gaye to Node sahi se install ho gaya.

## Project chalu kaise karein

1. Is zip ko kisi folder mein extract kar lein.
2. Terminal / command prompt us folder ke andar khole (folder ka naam `newlifelab-react` hoga).
3. Neeche di gayi command se saari zaroori cheezein (React, Vite, etc.) install karein:
   ```
   npm install
   ```
   Ye pehli baar thoda time lega (internet se packages download honge).
4. Website ko local computer par chalane ke liye:
   ```
   npm run dev
   ```
   Terminal mein ek link dikhega, jaise `http://localhost:5173` — usko browser mein khol lein, website dikhne lag jayegi.

## Website ko live/online daalne ke liye (production build)

Jab website final ho jaaye aur hosting par daalni ho:
```
npm run build
```
Isse ek `dist` folder banega — isi folder ke andar ki saari files ko
apni hosting (Netlify, Vercel, Hostinger, ya kisi bhi hosting) par
upload kar dena. Bas itna hi.

## Zaroori changes jo aapko khud karne hain

- **WhatsApp number**: `src/NewLifeLab.jsx` file kholein, sabse upar
  `const WA_NUMBER = "917062217553";` line milegi — apna number daal dein
  (format: country code + 10 digit number, bina `+` aur bina space).
- **Owner ki photo**: Home page ke "Meet the owner" section mein
  `<img src="" .../>` line hai — usme apni photo ka path daal dein
  (photo ko `public` folder mein rakh kar `/photo.jpg` jaisa path de sakte hain).
- **Lab ka address, timings, Google Maps link**: Contact page wale
  section mein `[Complete Address]`, `[Opening – Closing]` jaisी
  bracket wali jagah apni actual details bhar dein.

## Folder structure

```
newlifelab-react/
├── index.html          → Vite ka entry HTML
├── package.json        → project settings aur dependencies
├── vite.config.js       → Vite/React config
└── src/
    ├── main.jsx          → React app yahan se start hota hai
    ├── App.jsx            → NewLifeLab component ko yahan use kiya hai
    └── NewLifeLab.jsx     → poori website (saare pages, CSS, logo, WhatsApp logic)
```

Koi bhi error aaye `npm install` ya `npm run dev` karte waqt, to poora
error message copy karke pooch lein.
