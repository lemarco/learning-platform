import { useContext } from "react";
import { StoreLanguageActionsContext } from "./store-language-context";

export const useStoreLanguageActions = () => useContext(StoreLanguageActionsContext);
