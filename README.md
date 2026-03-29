# Welcome to your Expo app 👋

you are my best professional react expo software engineer and ui/ux designer with react nativewind/tailwind , iam working on food ordering app for all devices: web,tablet,mobile(andriod,apple), this project is for saudi arab users. activate skills for better help if required, this is my decision as you are the expert engineer and you provide expert styles.

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


You are a senior React Native Expo + NativeWind (Tailwind) expert and UI/UX designer.

I have already created the following components:
- CartScreen
- CartRestaurantSection
- CartItemCard
- QuantityControl
- DeliveryAddress
- PromoCode
- OrderSummary
- PaymentMethod
- PlaceOrderButton

Your task:
Apply modern, premium dark theme styling using NativeWind (Tailwind) to match a high-end food ordering app UI similar to Talabat/Careem style.

Design Requirements:

1. 🌙 THEME
   as per your wish

2. 📱 RESPONSIVE DESIGN
- Mobile: single column
- Tablet: spacing + larger cards
- Web: 2-column layout:
  - Left: cart items
  - Right: order summary (sticky)

Use:
- flex-col lg:flex-row
- lg:w-2/3 and lg:w-1/3

3. 🌍 RTL SUPPORT (VERY IMPORTANT)
- Support Arabic (RTL)
- Use:
  - flex-row-reverse when RTL
  - text-right for Arabic
  - spacing should flip automatically

4. 🧩 COMPONENT STYLING

CartItemCard:
- Rounded-xl card
- bg-[#2C1F14]
- flex-row items-center justify-between
- Image left, content center, quantity right
- Soft shadow + spacing

QuantityControl:
- Rounded-full
- bg-[#3A2A1D]
- Plus button = orange circle
- Minus = subtle

OrderSummary:
- Card with bg-[#2C1F14]
- Rounded-2xl
- Padding 16-20
- Highlight total price in orange
- Sticky on web (lg:sticky top-6)

PlaceOrderButton:
- Full width
- bg-orange-500
- rounded-xl
- py-4
- Bold text
- Slight shadow + active opacity

PromoCode:
- Input + Apply button inline
- Input dark bg
- Button small rounded

DeliveryAddress:
- Small card
- Icon + address text
- "Change" button in orange

PaymentMethod:
- Selectable card
- Border highlight when active (border-orange-500)

5. ✨ MICRO INTERACTIONS
- Pressable opacity (active:opacity-80)
- Smooth spacing (gap-3 / gap-4)
- Elevation shadow-md

6. 🧠 DATA BINDING
Use realistic user/cart data like:
:contentReference[oaicite:0]{index=0}

And restaurant/cart grouping:
:contentReference[oaicite:1]{index=1}

7. 🧱 CLEAN CODE
- Use reusable styles
- Use className (NativeWind)
- No inline styles unless necessary
- Keep components modular

8. ⚡ OUTPUT FORMAT
- Update each component with styling
- Do NOT change logic
- Only enhance UI

Goal:
Make the UI look premium, modern, clean, and production-ready for Saudi food delivery app.
