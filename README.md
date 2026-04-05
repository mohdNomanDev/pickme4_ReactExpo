# Welcome to your Expo app 👋

you are my best professional react expo software engineer and ui/ux designer with react nativewind/tailwind , iam working on food ordering app for all devices: web,tablet,mobile(andriod,apple). activate skills for better help if required, this is my decision as you are the expert engineer and you provide expert styles.

> This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# pickme4_ReactExpo


# react cmd
npm install expo@^55.0.0 
# or use the --fix flag to automatically update compatible packages:
npx expo install expo@latest --fix


npx expo install --fix


# Optionally, you can delete node modules and lock files
rm -rf node_modules
# Then reinstall
npm install # or yarn install, bun install


npx expo-doctor

npx skills add expo/skills



You are a senior React Native (Expo) engineer and UI/UX designer expert using NativeWind (Tailwind).

Project Context:
- This is a food ordering app (Saudi-focused UI)
- Works on: mobile (iOS/Android), tablet, and web
- Components are already created
- Use existing default theme (colors, spacing, typography)
- Focus on responsive, clean, modern UI like Talabat / HungerStation

--------------------------------------------------

🎯 TASK:
Style and enhance the following components using NativeWind (Tailwind classes), making them fully responsive across mobile, tablet, and web.

--------------------------------------------------

📦 COMPONENTS:

Main:
- MyOrdersScreen

Header:
- OrdersHeader
- OrdersTabs (Active / History)

Active Orders:
- ActiveOrdersSection
- OrderCard
- OrderProgressBar
- RiderInfo
- OrderActions

Order History:
- OrderHistorySection
- OrderHistoryItem

--------------------------------------------------

🎨 UI REQUIREMENTS:

1. Use DEFAULT THEME (already in project)
   - primary color → for buttons & highlights
   - background → dark gradient or solid
   - text → proper contrast (white / gray)

2. Responsive Design:
   - Mobile: single column
   - Tablet: 2 columns grid
   - Web: 2–3 columns grid with spacing
   - Use:
     - `w-full md:w-1/2 lg:w-1/3`
     - `flex-row flex-wrap`

3. OrderCard Design:
   - Rounded-xl / 2xl
   - Shadow + elevation
   - Proper padding (p-4 / p-5)
   - Space between sections

4. Buttons:
   - Primary button → filled (Track Order / Live Track)
   - Secondary → outline (Contact / Details)
   - Rounded-xl
   - Good spacing

5. Order Progress Bar:
   - Smooth progress (use width %)
   - Animated if possible
   - Highlight active state

6. Rider Info:
   - Avatar + name
   - Small badge style

7. Tabs:
   - Active tab highlighted
   - Smooth switching UI
   - Rounded pill design

8. Order History:
   - Compact list
   - Status badges:
     - delivered → green
     - cancelled → red
   - Reorder button

--------------------------------------------------

🧠 STATE MANAGEMENT:

Use Redux Toolkit:

1. Create slice:
- ordersSlice

State:
{
  activeOrders: [],
  orderHistory: []
}

2. Load initial data from JSON on component mount

Use this data structure:
- Active Orders (preparing, rider coming)
- Order History (delivered, cancelled)

You can refer to existing user data:
:contentReference[oaicite:0]{index=0}

3. Use:
- useSelector
- useDispatch

--------------------------------------------------

⚙️ EXTRA:

- Use FlatList for performance
- Use reusable small UI components
- Keep code clean and modular
- Add basic loading state (optional)

--------------------------------------------------

🎯 OUTPUT:

- Fully styled components using NativeWind
- Responsive layouts for all devices
- Redux setup + slice + integration
- Clean, production-level code

--------------------------------------------------

Make the UI premium, modern, and smooth like a real food delivery app.