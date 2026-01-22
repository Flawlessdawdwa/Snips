# Snips Mobile Application

A React Native mobile application built for the Senior Mobile Developer technical assessment at Snips. The app features a Netflix-style home page and a TikTok-like video feed with smooth scrolling and responsive design.

## Technical Stack Overview

### State Management
- **TanStack Query (React Query)**: Used for server state management, data fetching, caching, and synchronization. Provides automatic background refetching, optimistic updates, and intelligent caching strategies.

### Navigation
- **React Navigation**: Native stack navigator for seamless navigation between screens with native performance and gestures.

### Styling
- **React Native StyleSheet**: Native styling solution for optimal performance with platform-specific optimizations.

### Data Fetching & API
- **TanStack Query**: Handles all API calls with built-in error handling, retry logic, and caching mechanisms.
- **Custom Services**: Modular service layer for API endpoints (homepage, feedpage).

### Video Player
- **react-native-video**: High-performance video player for TikTok-like scrolling experience with optimized buffering and playback controls.

### Development Tools
- **Reactotron**: Debugging tool for monitoring network requests, state changes, and console logs in development.
- **React Native SVG Transformer**: For rendering and transforming SVG icons and graphics.

## Key Architectural Decisions

1. **Service-Oriented Architecture**: Separated API logic into dedicated service modules for better maintainability and testability.

2. **Type-Safe Development**: Implemented TypeScript types for all API responses and data models to ensure type safety throughout the application.

3. **Custom Hooks Pattern**: Created custom hooks (e.g., `useHomepage`, `useFeedpage`) to encapsulate data fetching logic and provide clean component APIs.

4. **Modular Page Structure**: Organized features into separate pages (HomePage, FeedPage, ProfilePage, SearchPage) for better code organization and lazy loading capabilities.

5. **Optimized Video Scrolling**: Implemented TikTok-like vertical video scrolling with preloading and memory management for smooth performance.

## Libraries Used

- **@tanstack/react-query**: Server state management and data synchronization
- **react-navigation/native**: Navigation framework
- **react-navigation/native-stack**: Stack navigation
- **react-native-video**: Video playback component
- **react-native-svg**: SVG rendering
- **react-native-svg-transformer**: SVG asset transformation
- **reactotron-react-native**: Development debugging tool

## Assumptions

- The app is designed for both iOS and Android platforms with React Native 0.83.1.
- API endpoints follow RESTful conventions and return JSON responses.
- Video content is optimized for mobile streaming with appropriate formats and bitrates.
 - Users have stable internet connectivity for video streaming functionality.
# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
