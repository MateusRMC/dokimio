"use client";

import Link from "next/link";

export default function HomePageClient() {
  return (
    <div className="homeWrapper">
      <div className="homeHero">
        <img className="homeLogo" src="/icons/dokimio-logo.png" alt="Dokimio" />

        <p>Write and nothing more.</p>
      </div>

      <div className="homeCTA">
        <Link href="/auth" className="homeButton">
          Get started
        </Link>
      </div>
    </div>
  );
}
