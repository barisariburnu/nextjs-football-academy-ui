# Football Academy Management System

A modern, comprehensive web application designed for football academies to manage their players, coaches, teams, tournaments, and schedules. Built with Next.js 15, Tailwind CSS, and Shadcn UI.

[![Deploy to GitHub Pages](https://github.com/barisariburnu/nextjs-football-academy-ui/actions/workflows/deploy.yml/badge.svg)](https://github.com/barisariburnu/nextjs-football-academy-ui/actions/workflows/deploy.yml)

## ⚽ Features

- **Dashboard**: Real-time analytics and overview of academy performance.
- **Player Management**: Detailed player profiles, performance tracking, and statistics.
- **Coach Management**: Manage coaching staff, assignments, and schedules.
- **Team Management**: Organize players into teams and age groups.
- **Schedule & Calendar**: Training sessions, matches, and event management using FullCalendar.
- **Tournament Tracking**: Manage league tables, match results, and upcoming tournaments.
- **Analytics & Reports**: Visualized data using Recharts for better decision-making.
- **Parent Portal**: Management of parent contact information and communications.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Calendar**: [FullCalendar](https://fullcalendar.io/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/)
- **Package Manager**: [Bun](https://bun.sh/)

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/barisariburnu/nextjs-football-academy-ui.git
   cd nextjs-football-academy-ui
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Run the development server:
   ```bash
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment

This project is configured for automated deployment to **GitHub Pages** via GitHub Actions.

The deployment configuration can be found in `.github/workflows/deploy.yml`. The site is available at:
[https://barisariburnu.github.io/nextjs-football-academy-ui/](https://barisariburnu.github.io/nextjs-football-academy-ui/)

To build the project manually:
```bash
bun run build
```
The static output will be generated in the `out` directory.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
Built with ❤️ by [Barış Arıburnu](https://github.com/barisariburnu)
