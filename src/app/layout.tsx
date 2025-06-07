import type { Metadata } from "next";
import "../styles/globals.scss";
import { Providers } from "@/providers";
import Header from "@/components/Header";
import SearchContextProvider from "@/context/searchContext";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Mercado Libre App Test",
  description: "Test done for Mercado Libre",
  icons: [{ rel: "icon", url: "/images/favicon.svg" }],
};

const myFont = localFont({
  variable: "--font-variable",
  src: [
    {
      path: "../../public/fonts/proximanova_light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/proximanova_regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/proximanova_bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/proximanova_boldit.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/proximanova_extrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/proximanova_black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/proximanova_black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/proximanova_blackit.otf",
      weight: "900",
      style: "italic",
    },
  ],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={myFont.className}>
      <body>
        <Providers>
          <SearchContextProvider>
            <Header />
            {children}
          </SearchContextProvider>
        </Providers>
      </body>
    </html>
  );
}
