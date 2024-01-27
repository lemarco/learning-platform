import { useContext } from "react";
import { AuthTokensContext } from "./auth-context";

export const useAuthTokens = () => useContext(AuthTokensContext);
