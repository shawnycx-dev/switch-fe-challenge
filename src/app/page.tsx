import Link from "next/link";

export default async function Home() {
  return (
    <div className="p-4 w-full text-center my-8">
      <h1 className="text-4xl font-bold mb-4">Switch Frontend Challenge</h1>
      <p className="mb-4 text-lg text-balance max-w-[80ch] mx-auto">
        👋 Hello Team at Switch! Welcome to the Frontend Take-Home Challenge.
        Thanks for the opportunity to take on this challenge, I had a lot of fun
        working on it. I kept the project simple and focused on the core
        features. Feel free to check out the{" "}
        <Link
          href="https://github.com/shawnycx-dev/switch-fe-challenge"
          className="no-underline hover:underline text-blue-600 dark:text-yellow-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          repository
        </Link>{" "}
        for more details.
      </p>

      <Link
        href="/catalog"
        className="no-underline hover:underline text-blue-600 dark:text-yellow-300"
      >
        Go to catalog page →
      </Link>
    </div>
  );
}
