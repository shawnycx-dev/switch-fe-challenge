# Switch Frontend Challenge

A small “Mini Catalog” web app where users can browse products, search, filter by category, sort, view product details (page + modal route), and favorite items (persisted).

Check out the [instructions](./INSTRUCTIONS.md) for more details.

This project follows the feature-sliced architecture pattern and is organized into the following directories:

- `src/app`: The main application entry point.
- `src/features`: The main features of the application.
- `src/entities`: The entities of the application.
- `src/shared`: The shared components and utilities of the application.

## What I'd improve with more time

- Consider using the domain-driven design pattern instead of feature-sliced architecture. This would help with the separation of concerns and make the code more maintainable but takes a lot of time to properly implement.
- Given more time, I'd like to spend more time on the UI/UX and make it more responsive and accessible.
- Set up a proper CI/CD pipeline to automate the tests and deployment process.
- Set up proper instrumentation for analytics and error tracking.
- Improve search by adding fuzzy search and autocomplete.

## Getting Started

First, run the development server:

```bash
bun dev
```

If bun is not installed, check out the [Bun website](https://bun.sh/) for installation instructions.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

This project uses [Vitest](https://vitest.dev/) for testing.

- Headless run (CI-style):

```bash
bun test
```

- Watch mode:

```bash
bun test:watch
```

- UI mode:

```bash
bun test:ui
```

## Key packages introduced (why they're used):

> Each of these packages is used in exchange for speed and convenience without sacrificing bundle size. In a real-world application, we'd likely want to consider auditing for security purposes or run our own custom implementation.

- `nuqs`: Nuqs is a simple, lightweight, and easy-to-use library for managing URL query state in React applications.
- `clsx + tailwind-merge`: Composed via a cn() helper function to build Tailwind class strings safely.
- `tailwindcss`: Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.
