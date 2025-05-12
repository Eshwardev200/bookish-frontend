
# 📚 Bookish

**Bookish** is a modern web application for managing a collection of books. It includes user authentication and full CRUD functionality using an external API.

---

## ✨ Features

- **Authentication**
  - Login and registration functionality
- **Book Management**
  - Fetch book data from the API
  - Add new books to the collection
  - View book details
  - Edit book information
  - Delete books

---

## 🧰 Tech Stack

- **Framework**: React `^19.1.0`
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: Tailwind CSS `^4.1.5`
- **Routing**: React Router DOM `^7.6.0`
- **API Handling**: React Query `^5.75.6` + Axios `^1.9.0`
- **Form Handling**: React Hook Form `^7.56.3`, Zod `^3.24.4`
- **Tooling**: Vite, ESLint

---

## 🛠️ Project Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd Bookish
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
VITE_API_URL=https://your-api-endpoint.com
```

### 5. Start the Development Server

```bash
npm run dev
```

---

## 📦 Other Scripts

- **Build the Project**

```bash
npm run build
```

- **Lint the Code**

```bash
npm run lint
```

- **Preview the Production Build**

```bash
npm run preview
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
