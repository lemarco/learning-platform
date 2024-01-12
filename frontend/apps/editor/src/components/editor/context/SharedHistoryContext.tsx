/** @jsxImportSource react */

import type { HistoryState } from "@frontend/lexical-editor";

import { createEmptyHistoryState } from "@frontend/lexical-editor";
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
