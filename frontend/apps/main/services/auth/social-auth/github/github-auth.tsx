"use client";

import { HTTP_CODES_ENUM } from "@/types/http";
import { useAuthActions } from "../../use-auth-actions";
import { useAuthTokens } from "../../use-auth-tokens";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback, useState } from "react";
// import { FullPageLoader } from "@/components/full-page-loader";
import { useLanguage } from "@/services/i18n/use-language";
import { wrapperFetchJsonResponse, useFetchBase } from "@/utils/fetch";
import { Tokens, User } from "@/types/auth";
import { API_URL } from "@/constants/api";

export const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

export type AuthGoogleLoginRequest = {
  idToken: string;
};

export type AuthGoogleLoginResponse = Tokens & {
  user: User;
};

export function useAuthGoogleLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthGoogleLoginRequest) => {
      return fetchBase(`${API_URL}/v1/auth/google/login`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthGoogleLoginResponse>);
    },
    [fetchBase],
  );
}
export function GoogleAuth() {
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const authGoogleLoginService = useAuthGoogleLoginService();
  const language = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = async (tokenResponse: CredentialResponse) => {
    if (!tokenResponse.credential) return;

    setIsLoading(true);

    const { status, data } = await authGoogleLoginService({
      idToken: tokenResponse.credential,
    });

    if (status === HTTP_CODES_ENUM.OK) {
      setTokensInfo({
        token: data.token,
        refreshToken: data.refreshToken,
        tokenExpires: data.tokenExpires,
      });
      setUser(data.user);
    }
    setIsLoading(false);
  };

  return (
    <>
      <GoogleLogin onSuccess={onSuccess} locale={language} />
      {/* <FullPageLoader isLoading={isLoading} /> */}
    </>
  );
}
