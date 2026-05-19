
# Pocket Budget Expo App

## Build iPhone App WITHOUT Mac

1. Install Node.js
2. Install Expo CLI
   npm install -g eas-cli

3. Login to Expo
   eas login

4. Install dependencies
   npm install

5. Configure build
   eas build:configure

6. Build iPhone IPA in cloud
   eas build --platform ios

7. Build Android APK
   eas build --platform android

Expo handles cloud Mac builds automatically.

You only need:
- Apple Developer Account
- Expo Account
