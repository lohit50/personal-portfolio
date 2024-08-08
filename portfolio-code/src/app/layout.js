// app/layout.js
"use client"; // This line makes the component a Client Component

import React, { useState, useEffect } from "react";
import "./globals.css";
import Loader from "@/components/Loader";
import Head from "next/head";

import CustomScrollbar from "@/components/CustomScrollbar";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>L O H I T</title>
        <meta
          name="description"
          content="G E T   T H R O U G H   M Y    P A G E"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="relative">
        {loading && <Loader />}
        <div className="noise-overlay"></div>
        <CustomScrollbar>{children}</CustomScrollbar>
      </body>
    </html>
  );
}
