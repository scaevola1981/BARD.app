# BARD.app (EXVERO) - Platformă de Schimb și Marketplace de Bunuri

> **Proiect de Licență** – Aplicație web modernă pentru schimburi echitabile de bunuri, servicii și produse alimentare între utilizatori.

---

## 📌 Despre Proiect

**BARD.app / EXVERO** oferă o alternativă sustenabilă la comerțul tradițional, permițând utilizatorilor să listeze anunțuri de schimb sau vânzare, să comunice în timp real printr-un sistem integrat de mesagerie și să descopere oferte relevante prin filtrare și căutare avansată.

---

## 🚀 Funcționalități Principale

- **Explorare & Marketplace**:
  - Feed dinamic cu cele mai recente anunțuri postate.
  - Paginare pe client și navigare fluidă către pagina de detalii a fiecărui anunț (`/ad/:id`).
  - Filtrare pe două niveluri: pe categorii/subcategorii și pe orașe/județe cu autocompletare.
- **Sistem de Autentificare & Profil**:
  - Înregistrare (`Sign Up`) și autentificare (`Sign In`) securizată.
  - Gestionare profil utilizator (nume, prenume, adresă, poză de profil stocată în Cloud Storage).
  - Tablou de bord în cont: listarea anunțurilor proprii și a celor vizitate recent.
- **Adăugare Anunțuri (Post Ads)**:
  - Formular complet cu validare, încărcare de imagini și legătură automată cu ID-ul utilizatorului autentificat.
- **Chat în Timp Real**:
  - Conversații 1-la-1 între utilizatori prin Firestore Realtime Listeners (`onSnapshot`).
- **Favorite & Istoric**:
  - Salvare locală a anunțurilor preferate cu alertă vizuală în timp real.
- **Suport Temă (Dark / Light Mode)**:
  - Comutare dinamică între modurile luminos și întunecat cu persistență în `localStorage`.

---

## 🛠️ Arhitectură și Tehnologii

- **Frontend**:
  - [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
  - [React Router DOM v7](https://reactrouter.com/) (Navigare și rutare SPA)
  - [Framer Motion](https://www.framer.com/motion/) (Animații și tranziții fluide)
  - [Bootstrap 5](https://getbootstrap.com/) & [React-Bootstrap](https://react-bootstrap.github.io/)
  - [React Icons](https://react-icons.github.io/react-icons/)
- **Backend & Servicii Cloud**:
  - **Firebase Authentication**: Gestionarea identității utilizatorilor (REST API & Web SDK).
  - **Firebase Realtime Database**: Stocarea și interogarea anunțurilor.
  - **Cloud Firestore**: Colecții pentru profiluri utilizatori și mesageria de chat.
  - **Cloud Storage**: Găzduire pentru pozele de profil și fotografiile anunțurilor.
- **Utilitare & HTTP**:
  - [Axios](https://axios-http.com/) cu instanțe dedicate pentru comunicația cu baza de date și serviciul de autentificare.

---

## 📂 Structura Proiectului

```
BARD.app/
├── public/                 # Fișiere statice (imagini, iconițe, logo-uri)
│   └── foto-icons/
├── src/
│   ├── api/                # Servicii de date, instanțe Axios și configurare Firebase
│   │   ├── config.js       # Variabile de mediu și instanțe Axios (dbInstance, authInstance)
│   │   ├── firebase.js     # Inițializare servicii Firebase (Firestore, Storage, Auth)
│   │   ├── user.entity.js  # Metode de autentificare și gestiune profil (Firestore)
│   │   ├── adEntity.js     # Operațiuni CRUD pentru anunțuri (Realtime Database)
│   │   ├── themeContext.js # Context pentru Dark/Light mode
│   │   └── themeProvider.jsx
│   ├── assets/
│   │   ├── Components/     # Componente reutilizabile (Header, Footer, Card, NavBar, Chat)
│   │   └── Pages/          # Paginile aplicației (Home, AllAdsPage, AdDetails, AddPostForm, etc.)
│   ├── App.jsx             # Definirea rutelor aplicației
│   ├── main.jsx            # Punctul de intrare React cu ThemeProvider & BrowserRouter
│   └── index.css           # Stiluri globale
├── .env.example            # Model pentru variabilele de mediu
└── package.json
```

---

## ⚙️ Instalare și Rulare Locală

### 1. Clonare repository și instalare dependențe
```bash
git clone https://github.com/scaevola1981/BARD.app.git
cd BARD.app
npm install
```

### 2. Configurare variabile de mediu
Creați un fișier `.env` în rădăcina proiectului, pornind de la `.env.example`:
```env
VITE_FIREBASE_API_KEY=cheia_ta_firebase
VITE_DATABASE_URL=https://nume-proiect-default-rtdb.europe-west1.firebasedatabase.app
VITE_AUTH_API_URL=https://identitytoolkit.googleapis.com/v1
```

### 3. Pornire server de dezvoltare
```bash
npm run dev
```
Aplicația va rula la `http://localhost:5173`.

### 4. Verificare cod și build de producție
```bash
npm run lint     # Rulare verificare ESLint
npm run build    # Compilare bundle de producție în folderul dist/
```
