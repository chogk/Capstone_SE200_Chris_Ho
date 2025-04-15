# 🛡️ Insurance Application

A modern web app for managing insurance policies, policy holders, and subscriptions — built using Next.js 14, Tailwind CSS, shadcn/ui components, React, lucide-React, NextAuth and PostgreSQL with Prisma.

This project is a Next.js 14 web application styled with Tailwind CSS and built with modern frontend practices.

## 🚀 Features

- Add & list insurance policies
- Manage policy holders and their subscriptions
- Pagination, sorting, filtering
- Clean and responsive UI using shadcn/ui + Tailwind CSS

## 🚀 Getting Started for Beginners

Follow these step-by-step instructions to run this project on your local machine.

---

### ✅ Prerequisites

Make sure you have the following installed:

- [Node.js (v18+)](https://nodejs.org/en)
- [Git](https://git-scm.com/downloads)
- [VS Code (optional)](https://code.visualstudio.com/)

---

### 🔄 Step 1: Clone the Repository

Open your terminal or Git Bash and run:

```
git clone https://github.com/chogk/Capstone_SE200_Chris_Ho.git
```

---

### 📁 Step 2: Navigate into the Project Folder

```
cd Capstone_SE200_Chris_Ho
```

---

### 📦 Step 3: Install Dependencies

```
npm install
```

This will install all required libraries and dependencies.

---

## 🛠️ Setting Up PostgreSQL and Prisma

If your project uses a PostgreSQL database and Prisma ORM, follow these extra steps.

---

### 🐘 Step 1: Install PostgreSQL

1. **Download PostgreSQL** from the official site: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
2. **During installation**, set a password for the default user (usually `postgres`). Remember this password.

---

### 🗄️ Step 2: Create a Database

After installing PostgreSQL, open **pgAdmin** or use the terminal:

```sql
CREATE DATABASE insurance_app;
```

---

### 📄 Step 3: Configure Environment Variables

In the root of your project, create a `.env` file with this line (edit values accordingly):

```
DATABASE_URL="postgresql://postgres:<your-password>@localhost:5432/insurance_app"
```

Replace `<your-password>` with your actual PostgreSQL password.

---

### 🔍 Step 4: View Database (Optional)

Use tools like **pgAdmin**, **TablePlus**, or **Prisma Studio**:

```bash
npx prisma studio
```

This opens a web interface to explore your database.

---

You're now fully set up with both the frontend (Next.js) and backend (PostgreSQL + Prisma)! 🚀

### 🔄 Step 5: Set Up Prisma

Run the following commands to initialize the database and apply the schema:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

This will create the tables in your PostgreSQL database based on the schema defined in `prisma/schema.prisma`.

---

### ⚙️ Step 6: Start the Development Server

```
npm run dev
```

You should see a message like:

```
Local: http://localhost:3000
```

---

### 🌐 Step 7: Open the Website

Go to your browser and open:

```
http://localhost:3000
```

Congratulations! 🎉 You’re now running the website locally.

---

### 🧠 Optional: Edit the Code

To open the code in VS Code, run:

```
code .
```

You can now explore and modify files in the `app/` or `components/` folders.

---

### 🧼 Troubleshooting

- ❌ **npm: command not found** – Make sure Node.js is installed.
- ❌ **Port 3000 already in use** – Close the other app or run with `npm run dev -- -p 3001`.
- ❌ **Permission errors** – Try using `sudo` (macOS/Linux).

---

## 🎨 Setting Up shadcn/ui Components

This project uses `shadcn/ui` for modern and customizable UI components.

---

### 🎯 Step 11: Install shadcn/ui

Run the following command to initialize `shadcn/ui`:

```bash
npx shadcn-ui@latest init
```

You’ll be prompted to answer a few setup questions (e.g., framework = React, styling = Tailwind).

---

### 🧩 Step 12: Add Components

To add a component (e.g., Button, Input, Card), run:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
```

Repeat this for each component your project needs.

---

### 📁 Component Usage

All components will be placed in:

```
/components/ui/
```

You can import them like this:

```tsx
import { Button } from "@/components/ui/button";
```

---

shadcn/ui makes it super easy to build fast and beautiful UIs with Tailwind CSS. 🌟

Happy Coding!

---

## 🧠 Helpful Commands

| Command                  | Description                |
| ------------------------ | -------------------------- |
| `npm run dev`            | Start development server   |
| `npx prisma studio`      | Open Prisma DB visual tool |
| `npx prisma migrate dev` | Run DB migrations          |
| `npx prisma generate`    | Generate Prisma client     |

---

## 📁 Folder Structure (Simplified)

```
insurance_app/
│
├── app/               # Pages and routing
├── components/        # Reusable UI components (shadcn)
├── prisma/            # Prisma schema & migrations
├── public/            # Static assets
├── styles/            # Global styles
├── .env               # Your PostgreSQL connection URL
├── package.json       # Project config and dependencies
└── README.md          # You're here!
```

---

## 🧑‍💻 Credits

Created by **Chris Ho** — Singapore  
Built with ❤️ using Next.js, Prisma, and Tailwind CSS

---

## 📬 Questions?

If you're stuck, feel free to reach out to me or raise an issue in this repository.
