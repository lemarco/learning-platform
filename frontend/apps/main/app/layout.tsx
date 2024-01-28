import { customTheme } from "@/app/theme";
import { AuthProvider } from "@/services/auth/auth-provider";

import { getMetadataGenerator } from "@/services/i18n";
import { StoreLanguageProvider } from "@/services/i18n/store-language-provider";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import { dir } from "i18next";
import "./globals.css";
export const generateMetadata = getMetadataGenerator("common");

export default function RootLayout({
  children,
  params: { language },
}: {
  children: React.ReactNode;
  params: { language: string };
}) {
  // dir={dir(language)}
  return (
    <html lang={language}>
      <head>
        <ThemeModeScript />
      </head>

      <body>
        <Flowbite theme={{ theme: customTheme }}>
          <StoreLanguageProvider>
            <AuthProvider>{children}</AuthProvider>
          </StoreLanguageProvider>
        </Flowbite>
      </body>
    </html>
  );
}
