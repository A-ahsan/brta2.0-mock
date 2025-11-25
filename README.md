# BRTA 2.0 - Smart Transport Portal of Bangladesh

🚗 **Smart Roads. Smart Drivers. Smart Bangladesh.**  
🎯 **NO DALAL, NO DELAY**

A modern, professional mockup UI for Bangladesh Road Transport Authority (BRTA) featuring a comprehensive vehicle and license management system.

## ✨ Features

### 🏠 Homepage
- **Animated Hero Section** with gradient text animations
- **Feature Cards** showcasing 6 core services:
  - Driving License Management
  - Face Verification System
  - Slot Booking
  - Online Payment Integration
  - QR-based Police Verification
  - AI Chatbot Assistant
- **Responsive Design** with smooth Framer Motion animations
- **Bilingual Support** (English/Bangla)
- **Dark/Light Mode** toggle

### 👤 User Dashboard
- **License Application** tracking
- **Vehicle Registration** management
- **Payment History** with status indicators
- **Test Slot Booking** calendar
- **User Profile** management
- **Settings** with theme and language toggles
- **Interactive Sidebar** with smooth animations

### 👨‍💼 Admin Panel
- **Analytics Dashboard** with key metrics:
  - Total Users
  - DL Requests
  - Vehicles Registered
  - Monthly Revenue
- **Charts & Visualizations**:
  - Monthly applications bar chart
  - Test center distribution pie chart
- **Application Management**:
  - Approve/Reject pending applications
  - Real-time status updates
- **Test Slot Management**:
  - View available slots
  - Monitor booking rates
  - Add new test slots

### 👮 Police Dashboard
- **QR Code Scanner** area for vehicle verification
- **Manual Search** by plate number
- **Vehicle Records Database** with:
  - Registration details
  - Owner information
  - Fine history
  - Insurance status
  - License expiry
- **Recent Checks** history
- **Real-time Statistics**:
  - Vehicles checked today
  - Violations found
  - Expired documents
  - Active patrols

### 🔐 Authentication
- **Login Page** with secure authentication
- **Signup Page** with form validation
- **Animated Transitions** between pages
- **Quick Access** to Admin and Police dashboards

## 🎨 Design System

### Color Palette
```css
Primary (BRTA Green): #006A4E
Primary Dark: #004D3A
Success: #28A745
Danger/Error: #DC3545
Background: #F8F9FA
Muted/Borders: #E9ECEF
Text Dark: #333333
White: #FFFFFF
```

### Technologies Used
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Phosphor Icons** - Icon library
- **Recharts** - Data visualization

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Open in Browser**
The app will open automatically at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
brta_extended/
├── public/
│   ├── brta.png           # BRTA logo
│   └── prompt.txt         # Project requirements
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── FeatureCard.jsx
│   │   └── StatCard.jsx
│   ├── contexts/          # React contexts
│   │   └── AppContext.jsx
│   ├── pages/             # Page components
│   │   ├── Homepage.jsx
│   │   ├── UserDashboard.jsx
│   │   ├── AdminPanel.jsx
│   │   ├── PoliceDashboard.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── utils/             # Utilities
│   │   └── translations.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🌐 Pages & Routes

- `/` - Homepage
- `/login` - Login Page
- `/signup` - Signup Page
- `/dashboard` - User Dashboard
- `/admin` - Admin Panel
- `/police` - Police Dashboard

## 🎯 Key Features Implemented

### ✅ Animations
- Framer Motion animations throughout
- Smooth page transitions
- Hover effects on cards and buttons
- Animated gradient text on hero section
- Floating elements
- Slide-in sidebars

### ✅ Interactivity
- Theme toggle (Dark/Light mode)
- Language toggle (English/Bangla)
- Interactive charts and graphs
- Collapsible sidebar
- Tab navigation
- Form validation
- Search functionality

### ✅ Responsiveness
- Mobile-first design
- Responsive grid layouts
- Adaptive navigation
- Optimized for all screen sizes

### ✅ Professional Design
- Government-grade appearance
- Clean, modern interface
- Consistent color scheme
- Professional typography
- High-quality visual hierarchy

## 📱 Mobile Support

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1920px+)

## 🌍 Bilingual Support

Full support for:
- 🇬🇧 English
- 🇧🇩 বাংলা (Bangla)

Toggle between languages using the language switcher in the navbar.

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    DEFAULT: '#006A4E',
    dark: '#004D3A',
  },
  // ... add more colors
}
```

### Adding New Pages
1. Create a new file in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `Navbar.jsx`

## 📝 Notes

- This is a **UI mockup only** - no backend integration
- All data is mock/static data
- Forms don't submit to a real server
- Charts display static data
- QR scanner is a visual mockup

## 🎓 Perfect for

- Client demonstrations
- Project presentations
- UI/UX showcases
- Portfolio projects
- Government portal mockups

## 🏆 Project Highlights

- ✨ Modern, professional design
- 🎭 Smooth animations
- 🌐 Bilingual interface
- 🌓 Dark/light themes
- 📊 Data visualizations
- 📱 Fully responsive
- ♿ Accessible components
- 🚀 Fast performance

## 📄 License

This is a mockup project created for demonstration purposes.

## 👨‍💻 Developer

Created with ❤️ for the BRTA 2.0 Smart Transport Portal project.

---

**Ready to impress clients and judges!** 🏆
