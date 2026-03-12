# Notes App

A simple and intuitive mobile notes application built with React Native and Expo. Users can register, log in, and manage personal notes organized by category. All data is stored locally on the device using AsyncStorage.

---

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Download APK](#download-apk)
- [Screens](#screens)
- [Routing](#routing)
- [Roadmap](#roadmap)
- [Project Status](#project-status)

---

## Description

The Notes App is a React Native mobile application built with Expo and file-based routing. It allows users to create an account, log in, and manage notes with titles, content, and categories. Notes can be searched, edited, and deleted. The app uses AsyncStorage for persistent local storage — no backend or internet connection required.

---

## Features

### Authentication
- Register a new account with username, email, and password
- Password must be at least 6 characters
- Login with registered email and password
- Session persisted using AsyncStorage
- Automatic redirect to login if not authenticated
- Automatic redirect to notes if already logged in

### Notes Management
- Add new notes with:
  - Optional title
  - Category (Work, Study, Personal)
  - Note details/content
- Edit any existing note
- Delete a note with a confirmation prompt
- Notes display date added and date last edited

### Search
- Search notes by title, content, or category in real time

### Profile Management
- View and update username and email
- Change password (requires current password verification)
- Logout from the profile screen

### Navigation
- File-based routing with Expo Router
- Protected routes — unauthenticated users are redirected to Login
- Profile accessible from header on all main screens

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [React Native](https://reactnative.dev/) | Mobile UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Expo](https://expo.dev/) | Development platform and build tools |
| [Expo Router](https://expo.github.io/router/) | File-based navigation |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Local persistent storage |
| [Expo Vector Icons](https://docs.expo.dev/guides/icons/) | Icon library (Ionicons, FontAwesome) |

---

## Requirements

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- npm (comes with Node.js)
- A physical device with [Expo Go](https://expo.dev/go) installed, or an emulator:
  - [Android Studio](https://docs.expo.dev/workflow/android-studio-emulator/) for Android emulator
  - [Xcode](https://docs.expo.dev/workflow/ios-simulator/) for iOS simulator (macOS only)

---

## Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd notes-app

# 2. Install dependencies
npm install

# 3. Install Expo CLI globally (if not already installed)
npm install -g expo-cli

# 4. Install AsyncStorage
npx expo install @react-native-async-storage/async-storage

# 5. Install Expo Router
npx expo install expo-router

# 6. Install Vector Icons
npx expo install @expo/vector-icons
```

---

## Running the App

```bash
# Start the development server
npx expo start
```

Once started, you will see a QR code in the terminal. You can then:

- Scan the QR code with the **Expo Go** app on your Android or iOS device
- Press `a` to open on an **Android emulator**
- Press `i` to open on an **iOS simulator** (macOS only)
- Press `w` to open in a **web browser**

---

## Download APK

If you do not want to run the project from source, you can download and install the APK directly on your Android device:

> APK download link: *(add your APK link here)*

To install the APK:
1. Download the APK file to your Android device
2. Go to **Settings > Security** and enable **Install from unknown sources**
3. Open the downloaded APK file and tap **Install**
4. Open the app and register a new account to get started

---

## Screens

| Screen | Description |
|--------|-------------|
| Login | Sign in with email and password |
| Register | Create a new account |
| Home (Notes List) | View, search, and delete notes |
| Add Note | Add a new note or edit an existing one |
| Profile | Update credentials and log out |

---

## Routing

File-based routing is handled by Expo Router:

| Path | Screen | Auth Required |
|------|--------|---------------|
| `/` | Notes List (Home) | Yes |
| `/authentication/Login` | Login | No |
| `/authentication/Register` | Register | No |
| `/AddNote` | Add or Edit Note | Yes |
| `/Profile` | Profile | Yes |

---

## Roadmap

- [ ] Add support for multiple user accounts
- [ ] Cloud sync with a backend API
- [ ] Note pinning and favorites
- [ ] Dark mode support
- [ ] Note sharing via SMS or email
- [ ] Rich text editor for note content

---

## Project Status

This project is currently in active development. Core features including authentication, note management, search, and profile updates are fully functional. The APK is available for direct installation on Android devices. Cloud sync and multi-user support are planned for future updates.
