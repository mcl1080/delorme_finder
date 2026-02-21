🗺️ DeLorme Page Finder (PWA)
A lightweight, offline-capable Progressive Web App (PWA) that uses your device's GPS to determine which page of the DeLorme Atlas & Gazetteer you are currently located on. Originally designed for the Geocaching "DeLorme Challenge," this tool supports custom map grids, state counties, and complex polygon boundaries.
🌟 Features
Real-Time GPS Tracking: Displays current coordinates in DDM format (N 34 12.345), aligned for easy reading.
Offline Capable: Fully functional without cell service. Includes a "Download All" feature to cache map data.
Auto-State Detection: Automatically detects which US State you are in and loads the relevant map grids.
Multi-Grid Support: Handles overlapping grids (e.g., Northern California vs. Southern California) and displays both simultaneously.
Precision Borders: Uses Ray-Casting algorithms to detect exact polygon boundaries (for County lines) while using fast bounding-box checks for standard rectangular map pages.
Installable: Can be installed to the Home Screen on Android (Chrome) and iOS (Safari) as a native-feeling app.
🚀 How to Use
1. Installation (Recommended)
Navigate to the hosted webpage (e.g., via GitHub Pages).
Android: Click the "⬇️ Install" button in the header, or select "Install App" from the Chrome menu.
iOS: Tap the Share button in Safari and select "Add to Home Screen."
2. Going Offline
To ensure the app works deep in the wilderness:
Open the Settings (⚙️).
Click "Download All Maps (Offline)".
Wait for the status to say "All Maps Saved Offline!"
You can now turn on Airplane Mode and the map lookup will still work.
3. Manual vs Auto Mode
Auto Mode (Default): The app checks your GPS against states.json. If you cross into a new state, it automatically loads that state's map files.
Manual Mode: Turn off the "Auto-Load State" toggle in Settings to manually check specific map files (useful if you are near a border and want to force a specific grid).
🏗️ Tech Stack
HTML5 / CSS3: Mobile-first, Dark Mode design for battery saving and outdoor visibility.
Vanilla JavaScript: No frameworks (React/Vue/Angular) used. This keeps the app extremely lightweight and fast.
Service Workers: Handles caching and offline functionality.
GitHub Pages: Free, secure (HTTPS) hosting required for GPS permissions.
