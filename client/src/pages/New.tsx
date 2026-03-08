import { Link } from "wouter";

<Link href="/about">About</Link>

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">About</h1>
      <p>Your content here.</p>
    </div>
  );
}