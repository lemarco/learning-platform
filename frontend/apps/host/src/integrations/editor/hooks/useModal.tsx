import { useCallback, useMemo, useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "ui";

export function useModal(): [
  JSX.Element | null,
  (title: string, showModal: (onClose: () => void) => JSX.Element) => void,
] {
  const [modalContent, setModalContent] = useState<null | {
    content: JSX.Element;
    title: string;
  }>(null);

  const onClose = useCallback(() => {
    setModalContent(null);
  }, []);

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null;
    }
    const { title, content } = modalContent;
    return (
      <Dialog open={true}>
        <DialogHeader>{title}</DialogHeader>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>{content}</DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }, [modalContent, onClose]);

  const showModal = useCallback(
    (title: string, getContent: (onClose: () => void) => JSX.Element) => {
      setModalContent({
        content: getContent(onClose),
        title,
      });
    },
    [onClose]
  );

  return [modal, showModal];
}
