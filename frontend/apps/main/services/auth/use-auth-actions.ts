import { useContext } from "react";
import { AuthActionsContext } from "./auth-context";

export const useAuthActions = () => useContext(AuthActionsContext);
