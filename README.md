# 👑 Shembe App (Ibandla laseNazaretha)

[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE)
[![React Native](https://img.shields.io/badge/React_Native-0.74+-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK_51+-000000?logo=expo&logoColor=white)](https://expo.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Database_%26_Auth-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

An all-in-one digital companion for the **Nazareth Baptist Church (Ibandla laseNazaretha / Shembe)** community. Designed for mobile (iOS & Android) and Web, the Shembe App connects congregants worldwide with sacred hymns (*Izihlabelelo*), annual holy pilgrimage guides, branch/temple locators, live sermon streams, and church announcements.

---

## ✨ Key Features

### 📖 1. Izihlabelelo zamaNazaretha (Digital Hymnbook)
- Full collection of sacred hymns written by Prophet Isaiah Shembe and successors.
- **Search & Filter**: Find hymns instantly by number, title, or keyword in isiZulu.
- **Favorites & Audio Playback**: Save favorite hymns and listen to choir recordings/chants.
- **Offline Access**: Full text available offline without internet connectivity.

### 🏔️ 2. Sacred Pilgrimages & Holy Calendar (*Izinhlangano & Inhlokomo*)
- Comprehensive schedules for the **Nhlangakazi Mountain Pilgrimage**, **July Holy Gatherings**, **October Remembrance Month**, and **January Gatherings**.
- Interactive maps, trail checkpoints, packing guides, and safety instructions for pilgrims.
- Countdowns to major Sabbath services (*Umhlangano WeSabatha*) and holy festivals.

### 📍 3. Temple & Branch Finder (*AmaThempele & IziGcodlo*)
- Interactive geolocation directory for local branches, holy temples, and gathering grounds (*Ebuhleni, Ekuphakameni, Judea, Khenani, etc.*).
- Service schedules, contact info for local church elders (*Abaphathi*), and directions via Google Maps / Apple Maps.

### 📻 4. Sermons & Live Streaming (*Imiyalezo & Imiphasho*)
- Live audio/video broadcasting of Sabbath services and holy events.
- On-demand archive of sermons, teachings, and sacred choir performances.
- Push notifications when live services begin.

### 💳 5. Iminikelo & Tithes (Digital Offerings)
- Secure in-app digital contributions for tithes, holy offerings, building funds, and community upliftment programs.
- Transaction history and downloadable digital receipts.

### 📢 6. Church Announcements & Community News
- Official verified updates from the church council and leadership.
- Local branch notifications for Sabbath preparations, community youth meetings, and traditional dance (*Ukusina*) rehearsals.

---

## 🛠️ Technology Stack

- **Frontend**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (Cross-platform iOS, Android, and Web)
- **Backend & Auth**: [Supabase](https://supabase.com/) (PostgreSQL Database, Realtime Subscriptions, Row Level Security)
- **UI & Design**: Custom design system honoring traditional Shembe aesthetic (Holy Gold, White, Deep Emerald Green) with modern Glassmorphism.
- **Maps**: `react-native-maps` / Leaflet API
- **Audio Engine**: `expo-av` for background hymn audio playback

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go App](https://expo.dev/go) on your mobile device (for testing)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/radebeinnovations/Shembe-app.git
   cd Shembe-app
