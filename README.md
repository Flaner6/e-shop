# E-Shop Chat Application

A modern **Next.js** application featuring an AI‑powered chat widget, built with **Material UI**, **TensorFlow.js**, and **Redux Toolkit**.

---

## 🚀 Key Features

- **Interactive Chat Widget**: Toggleable chat window in the lower‑right corner, powered by a Universal Sentence Encoder model in TensorFlow.js.
- **Next.js App Router**: File‑based routing and server‐side rendering for fast page loads.
- **Global State Management**: Redux Toolkit + React‑Redux for predictable, centralized state (e.g., chat history, UI toggles).
- **Styling & Theming**: Material UI v6 with Emotion cache for SSR compatibility and a custom theme registry.
- **AI/ML Integration**: Embeddings and simple response logic using `@tensorflow-models/universal-sentence-encoder`.
- **Developer Experience**: ESLint, Prettier, Husky Git hooks, and lint‑staged for code quality enforcement.

---

## 📦 Tech Stack

- **Framework:** Next.js 15.1.6 (App Router)
- **Language:** TypeScript
- **Styling:** Material UI v6, Emotion
- **State Management:** Redux Toolkit, React‑Redux
- **AI/ML:** TensorFlow.js, Universal Sentence Encoder
- **Package Manager:** pnpm 10.6.3
- **Node.js Version:** >=22.14.0

---

## 🗂️ Project Structure

```
e-shop/
├── public/                # Public assets (images, fonts)
├── src/
│   ├── app/               # Next.js App Router pages & layout
│   ├── components/        # Reusable UI components
│   │   ├── Chat/          # Chat widget core (Chat, ChatWindow)
│   │   └── ...
│   ├── store/             # Redux store setup & slices
│   ├── theme/             # MUI theme registry, custom theme
│   └── styles/            # Global CSS/SCSS (if any)
├── .husky/                # Git hooks
├── .lintstagedrc.json     # lint‑staged config
├── next.config.js         # Next.js configuration
├── package.json
└── pnpm-lock.yaml
```

---

## ⚙️ Installation & Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/your‑username/e-shop.git
   cd e-shop
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Initialize Git hooks**

   ```bash
   pnpm run prepare
   ```

4. **Run in development mode**

   ```bash
   pnpm dev
   ```

5. **Open your browser** at [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Available Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `pnpm dev`     | Start Next.js development server     |
| `pnpm build`   | Create optimized production build    |
| `pnpm start`   | Run production build locally         |
| `pnpm lint`    | Run ESLint on all `.ts`/`.tsx` files |
| `pnpm format`  | Format codebase with Prettier        |
| `pnpm prepare` | Install Husky Git hooks              |

---

## 🧩 How It Works

1. **Chat Widget Toggle**: A floating **IconButton** in the app layout opens a **Material UI Drawer**, which contains the `Chat` component.
2. **`Chat` Component**: Manages local message state, sends user input to the `/api/chat` endpoint, and displays both user and bot messages.
3. **API Route**: `src/app/api/chat/route.ts` loads the Universal Sentence Encoder model once, computes embeddings, and returns a simple text response based on vector magnitude and content.
4. **Redux Integration**: (Optional) You can extend the `chatSlice` to store messages in global state, enabling features like chat history persistence across pages.
5. **Theming & SSR**: The `ThemeRegistry` component sets up an Emotion cache and injects critical CSS on the server for seamless hydration.

---

## 📚 Learning & Extensibility

- **Adding ML Models**: Swap or extend the `/api/chat` logic to load custom TensorFlow.js models (e.g., image classifiers).
- **State Persistence**: Plug in Redux Persist or localStorage to save chat history across sessions.
- **Notifications**: Integrate Web Push or in-app toasts for incoming bot replies when the drawer is closed.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/awesome-chat`)
3. Commit your changes (`git commit -m "feat: add awesome feature"`)
4. Push to the branch (`git push origin feature/awesome-chat`)
5. Open a Pull Request

Please ensure all lint checks and formatting pass before opening a PR.

---

## 📖 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
