import { ReactNode } from "react";

export const Modal = ({ children, trigger }: { children: ReactNode; trigger: string | ReactNode }) => {
  return (
    <>
      <dialog className="h-[300px] w-[500px]">
        <button className="mb-5" autoFocus={true}>
          Close
        </button>
        {children}
      </dialog>
      <button>{trigger}</button>
    </>
  );
};
