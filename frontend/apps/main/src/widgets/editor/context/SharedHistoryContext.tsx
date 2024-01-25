/** @jsxImportSource react */

import type { HistoryState } from "@lexical/react/LexicalHistoryPlugin";

import LexHistoryPlugin from "@lexical/react/LexicalHistoryPlugin";
const { createEmptyHistoryState } = LexHistoryPlugin;

import { Context as Ctx, ReactNode, createContext, useContext, useMemo } from "react";

type ContextShape = {
  historyState?: HistoryState;
};

const Context: Ctx<ContextShape> = createContext({});

export const SharedHistoryContext = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const historyContext = useMemo(() => ({ historyState: createEmptyHistoryState() }), []);
  return <Context.Provider value={historyContext}>{children}</Context.Provider>;
};

export const useSharedHistoryContext = (): ContextShape => {
  return useContext(Context);
};
