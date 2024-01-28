"use client";

import { HTTP_CODES_ENUM } from "@/types/http";
import { useAuthActions } from "@/services/auth/use-auth-actions";
import { useAuthTokens } from "@/services/auth/use-auth-tokens";
import { useCallback, useState } from "react";

import { RequestConfigType } from "@/types/http";
import { useContext, createContext } from "react";
import { useTranslation } from "@/services/i18n/client";
import { Tokens, User } from "@/types/auth";
import { wrapperFetchJsonResponse, useFetchBase } from "@/utils/fetch";
import { API_URL } from "@/constants/api";
export type AuthFacebookLoginRequest = {
  accessToken: string;
};

export type AuthFacebookLoginResponse = Tokens & {
  user: User;
};

export const useFacebookAuth = () => useContext(FacebookContext);
export type FacebookAuthResponse = {
  accessToken: string;
  expiresIn: number;
  signedRequest: string;
  userID: string;
};

export type FacebookAuthLoginResponse = {
  authResponse: FacebookAuthResponse;
};

export const FacebookContext = createContext<{
  login: () => Promise<FacebookAuthLoginResponse>;
}>({
  login: async () => {
    throw new Error("FacebookAuthProvider not mounted");
  },
});

export function useAuthFacebookLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthFacebookLoginRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/auth/facebook/login`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AuthFacebookLoginResponse>);
    },
    [fetchBase],
  );
}

export function FacebookAuth() {
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const authFacebookLoginService = useAuthFacebookLoginService();
  const facebook = useFacebookAuth();
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    try {
      const loginResponse = await facebook.login();
      if (!loginResponse.authResponse) return;

      setIsLoading(true);

      const { status, data } = await authFacebookLoginService({
        accessToken: loginResponse.authResponse.accessToken,
      });

      if (status === HTTP_CODES_ENUM.OK) {
        setTokensInfo({
          token: data.token,
          refreshToken: data.refreshToken,
          tokenExpires: data.tokenExpires,
        });
        setUser(data.user);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button type="button" onClick={onLogin}>
        {t("common:auth.facebook.action")}
      </button>
      {/* <FullPageLoader isLoading={isLoading} /> */}
    </>
  );
}
