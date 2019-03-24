# Firestore Dataflow Test
Firestore dataflow illustrated and measured 🔥📏

This repository contains a simple web-based testbed to measure latencies of various Firestore dataflow paths.

# Usage
1. Create a Firebase project using Firebase console
2. Enable Cloud Firestore in your Firebase project
3. Install Firebase CLI tools with `npm i -g firebase-tools`
4. Authenticate with your CLI `firebase login`
5. Initialize your project `firebase use <PROJECT_ID>`
6. Deploy Cloud Functions `firebase deploy --only functions`
7. Run the tests locally `firebase serve`
8. (optional) Deploy to Firebase Hosting `firebase deploy --only hosting`
9. (optional) Secure (kinda) your Firestore `firebase deploy --only firestore:rules`
10. (options) Remove Firestore indexing if you plan to do heavy testing `firebase deploy --only firestore:indexes`
