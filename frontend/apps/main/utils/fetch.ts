"use client";

import { useCallback } from "react";
import { Tokens } from "@/types/auth";
import { TokensInfo } from "@/services/auth/auth-context";
import { AUTH_REFRESH_URL } from "@/constants/api";
import { FetchInputType, FetchInitType } from "@/types/http";
import useLanguage from "@/services/i18n/use-language";
import { useAuthTokens } from "@/services/auth/use-auth-tokens";
import { FetchJsonResponse } from "@/types/http";
import { HTTP_CODES_ENUM } from "@/types/http";
export function useFetch() {
  const { tokensInfoRef, setTokensInfo } = useAuthTokens();
  const fetchBase = useFetchBase();

  const fetchWrapper = useCallback(
    async (input: FetchInputType, init?: FetchInitType) => {
      return fetchBase(input, init, {
        token: tokensInfoRef.current?.token,
        refreshToken: tokensInfoRef.current?.refreshToken,
        tokenExpires: tokensInfoRef.current?.tokenExpires,
        setTokensInfo,
      });
    },
    [fetchBase, setTokensInfo, tokensInfoRef],
  );

  return fetchWrapper;
}

export function useFetchBase() {
  const language = useLanguage();

  return useCallback(
    async (
      input: FetchInputType,
      init?: FetchInitType,
      tokens?: Tokens & {
        setTokensInfo?: (tokensInfo: TokensInfo) => void;
      },
    ) => {
      let headers: HeadersInit = {
        "x-custom-lang": language,
      };

      if (!(init?.body instanceof FormData)) {
        headers = {
          ...headers,
          "Content-Type": "application/json",
        };
      }

      if (tokens?.token) {
        headers = {
          ...headers,
          Authorization: `Bearer ${tokens.token}`,
        };
      }

      if (tokens?.tokenExpires && tokens.tokenExpires <= Date.now()) {
        const newTokens = await fetch(AUTH_REFRESH_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.refreshToken}`,
          },
        }).then((res) => res.json());

        if (newTokens.token) {
          tokens?.setTokensInfo?.({
            token: newTokens.token,
            refreshToken: newTokens.refreshToken,
            tokenExpires: newTokens.tokenExpires,
          });

          headers = {
            ...headers,
            Authorization: `Bearer ${newTokens.token}`,
          };
        } else {
          tokens?.setTokensInfo?.(null);

          throw new Error("Refresh token expired");
        }
      }

      return fetch(input, {
        ...init,
        //@ts-ignore
        headers: {
          ...headers,
          ...init?.headers,
        },
      });
    },
    [language],
  );
}

async function wrapperFetchJsonResponse<T>(response: Response): Promise<FetchJsonResponse<T>> {
  const status = response.status as FetchJsonResponse<T>["status"];
  return {
    status,
    data: [HTTP_CODES_ENUM.NO_CONTENT, HTTP_CODES_ENUM.SERVICE_UNAVAILABLE, HTTP_CODES_ENUM.INTERNAL_SERVER_ERROR].includes(status)
      ? undefined
      : await response.json(),
  };
}

export default wrapperFetchJsonResponse;
