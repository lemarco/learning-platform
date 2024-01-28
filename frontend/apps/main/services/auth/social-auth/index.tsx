"use client";

import { FacebookAuthProvider } from "./facebook/facebook-auth-provider";
import { GithubAuthProvider } from "./github/github-auth";
import { GoogleAuthProvider } from "./google/google-auth";
export const SocialAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleAuthProvider>
      <FacebookAuthProvider>
        <GithubAuthProvider>{children}</GithubAuthProvider>
      </FacebookAuthProvider>
    </GoogleAuthProvider>
  );
};
