import { useContext } from "react";
import { StoreLanguageContext } from "./store-language-context";

export const useStoreLanguage = () => useContext(StoreLanguageContext);
