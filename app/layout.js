import "./styles.scss";
import "./home.scss";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "./lib/themeProvider";

export const metadata = {
  title: "Dokimio - Write and nothing more.",
  description: "Write and nothing more.",
  applicationName: "Dokimio",

  icons: {
    icon: "/icons/d-logo.png",
    apple: "/icons/d-logo.png",
  },

  appleWebApp: {
    capable: true,
    title: "Dokimio",
    statusBarStyle: "default",
  },

  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-title": "Dokimio",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fcfcfb",
  colorScheme: "light dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="main">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
