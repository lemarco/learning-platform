/** @jsxImportSource react */

import type { HistoryState } from "../lib/lexical-editor";

import { createEmptyHistoryState } from "../lib/lexical-editor";
import * as React from "react";
import { ReactNode, createContext, useContext, useMemo } from "react";

type ContextShape = {
  historyState?: HistoryState;
};

const Context: React.Context<ContextShape> = createContext({});

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
