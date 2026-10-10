## Project Name: বাজার দর / BazarDor

## About The Project

BazarDor is a Next.js-based daily market price tracker for Bangladesh. Users can browse essential products (rice, lentils, oil, vegetables, fish, meat, eggs-dairy, spices) with today's prices and changes, open category pages, view market-wise price details per product, and sign in to unlock single product pages.

## Technology use

Next.js 16
TypeScript
Tailwind CSS 4
Better-Auth + MongoDB
React Toastify
React Marquee Text
REST API

## Features

1. Live Market Prices – Browse essential products with today's price, unit and rise/fall change in a responsive card grid, fetched from a REST API with revalidation.

2. Category Pages – Open any category in a dynamic page with product count, price sorting (default, low to high, high to low) and the same card grid.

3. Product Details – Open any product in a protected details page with breadcrumb, price summary (lowest, highest, average) and a market-wise min/max/average price table.

4. Authentication & Protected Routes – Sign up and sign in with email-password or Google/GitHub, with session-based header menu, profile page and Proxy-guarded product details pages.

5. Feedback & Navigation – Price ticker marquee with pause on hover, active category highlighting, instant toast notifications for auth actions, plus loading and not-found states.
