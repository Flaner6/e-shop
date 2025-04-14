# E-Shop Chat Application

A Next.js-based chat application with Material UI and TensorFlow.js integration.

## Tech Stack

- **Framework:** Next.js 15.1.6
- **Language:** TypeScript
- **Styling:** Material UI v6
- **AI/ML:** TensorFlow.js, Universal Sentence Encoder
- **Package Manager:** pnpm 10.6.3
- **Node Version:** 22.14.0

## Key Dependencies

### Production Dependencies

- Next.js
- React & React DOM
- Material UI (@mui/material, @mui/icons-material, @mui/material-nextjs)
- Emotion (@emotion/cache, @emotion/react, @emotion/styled)
- TensorFlow.js (@tensorflow/tfjs)
- Universal Sentence Encoder (@tensorflow-models/universal-sentence-encoder)

### Development Dependencies

- TypeScript
- ESLint
- Prettier
- Husky (Git hooks)
- lint-staged
- TensorFlow.js Node (@tensorflow/tfjs-node)

## Development Tools

### Code Quality

- ESLint for code linting
- Prettier for code formatting
- Husky for Git hooks
- lint-staged for running checks on staged files

### Scripts

```bash
# Development
pnpm dev         # Start development server
pnpm build       # Build production bundle
pnpm start       # Start production server
pnpm lint        # Run ESLint
pnpm format      # Run Prettier
```

## Project Structure

```
e-shop/
├── src/
│   ├── app/          # Next.js App Router pages
│   ├── components/   # React components
│   └── theme/       # MUI theme configuration
├── public/          # Static assets
└── ...config files
```

## Getting Started

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
