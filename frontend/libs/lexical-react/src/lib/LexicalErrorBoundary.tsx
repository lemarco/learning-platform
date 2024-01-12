import * as React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

export type LexicalErrorBoundaryProps = {
  children: JSX.Element;
  onError: (error: Error) => void;
};

export function LexicalErrorBoundary({ children, onError }: LexicalErrorBoundaryProps): JSX.Element {
  return (
    <ReactErrorBoundary
      fallback={
        <div
          style={{
            border: "1px solid #f00",
            color: "#f00",
            padding: "8px",
          }}
        >
          An error was thrown.
        </div>
      }
      onError={onError}
    >
      {children}
    </ReactErrorBoundary>
  );
}
