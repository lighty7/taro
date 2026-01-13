# ✨ Celestia Tarot

> **The Oracle of the Stars**  
> A visually stunning, immersive Tarot Card Reader built with React, TypeScript, and Framer Motion.

![Celestia Tarot Banner](https://placehold.co/1200x400/0f0c29/fbbf24?text=Celestia+Tarot)

## 🔮 About The Project

**Celestia Tarot** is a frontend-only, Single Page Application (SPA) designed to replicate the mystical and emotional experience of a real tarot reading. Unlike standard card apps, Celestia focuses on atmosphere, animation, and "organic" randomness.

It features a full 78-card Rider-Waite-Smith deck, enabling users to perform 3 different types of readings or explore the cards in a compendium gallery.

### Key Features

*   **🌌 Immersive Atmosphere**: Dynamic star backgrounds, glowing effects, and smooth transitions.
*   **🃏 Organic Deck Interaction**: Cards are scattered "messily" rather than in a grid during selection to mimic a real table spread.
*   **📖 Reading Synthesis**: Automatically generates a cohesive interpretation based on card positions, dominant suits, and major/minor arcana balance.
*   **👁️ Arcana Compendium**: A dedicated gallery mode to view all 78 cards with search filters and detailed meanings.
*   **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

*   **Framework**: React 18
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Animations**: Framer Motion
*   **Icons**: Lucide React
*   **Build Tool**: Vite

## 🚀 Getting Started

To run this project locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/celestia-tarot.git
    cd celestia-tarot
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## ☁️ Deployment on Vercel

This project is configured for seamless deployment on Vercel.

1.  Push your code to a GitHub repository.
2.  Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3.  Import your repository.
4.  Vercel will detect **Vite** automatically.
    *   **Framework Preset**: Vite
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
5.  Click **Deploy**.

The included `vercel.json` ensures that client-side routing works correctly when users refresh the page.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*“The cards do not predict the future; they illuminate the path you are already walking.”*
