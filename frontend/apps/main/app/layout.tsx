import "./globals.css";
import { dir } from "i18next";
import { getMetadataGenerator } from "@/services/i18n";
import { StoreLanguageProvider } from "@/services/i18n/store-language-provider";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import { customTheme } from "@/app/theme";
import { AuthProvider } from "@/services/auth/auth-provider";
import { GoogleAuthProvider } from "@/services/auth/social-auth/google/google-auth";
import { FacebookAuthProvider } from "@/services/auth/social-auth/facebook/facebook-auth-provider";
export const generateMetadata = getMetadataGenerator("common");

export default function RootLayout({
  children,
  params: { language },
}: {
  children: React.ReactNode;
  params: { language: string };
}) {
  return (
    <html lang={language} dir={dir(language)}>
      <ThemeModeScript />
      <body>
        <Flowbite theme={{ theme: customTheme }}>
          <StoreLanguageProvider>
            <AuthProvider>
              <GoogleAuthProvider>
                <FacebookAuthProvider>{children}</FacebookAuthProvider>
              </GoogleAuthProvider>
            </AuthProvider>
          </StoreLanguageProvider>
        </Flowbite>
      </body>
    </html>
  );
}
