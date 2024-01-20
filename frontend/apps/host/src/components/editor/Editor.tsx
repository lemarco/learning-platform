// import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

// import { RichTextPlugin } from "./plugins/LexicalRichTextPlugin";

// import { useSettings } from "./context/SettingsContext";

import { component$, useSignal } from "@builder.io/qwik";
import { RichTextPlugin } from "./plugins/LexicalRichTextPlugin";
import { LexicalContentEditable } from "./ui/ContentEditable";
import { Placeholder } from "./ui/Placeholder";

export const Editor = component$(() => {
  //   const isEditable = useLexicalEditable();
  const text = "Enter some plain text...";
  //   const placeholder = <Placeholder>{text}</Placeholder>;
  //   const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

  //   const onRef = (_floatingAnchorElem: HTMLDivElement) => {
  //     if (_floatingAnchorElem !== null) {
  //       setFloatingAnchorElem(_floatingAnchorElem);
  //     }
  //   };

  //   useEffect(() => {
  //     const updateViewPortWidth = () => {
  //       const isNextSmallWidthViewport = CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

  //       if (isNextSmallWidthViewport !== isSmallWidthViewport) {
  //         setIsSmallWidthViewport(isNextSmallWidthViewport);
  //       }
  //     };
  //     updateViewPortWidth();
  //     window.addEventListener("resize", updateViewPortWidth);

  //     return () => {
  //       window.removeEventListener("resize", updateViewPortWidth);
  //     };
  //   }, [isSmallWidthViewport]);
  const floatingAnchorElem = useSignal<HTMLDivElement>();
  //   const onRef = (_floatingAnchorElem: HTMLDivElement) => {
  //     if (_floatingAnchorElem !== null) {
  //       floatingAnchorElem.value = _floatingAnchorElem;
  //     }
  //   };

  return (
    <>
      {/* {isRichText && <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />} */}
      <div class={"editor-container"}>
        <RichTextPlugin>
          <div class="editor-scroller">
            <div class="editor" ref={floatingAnchorElem}>
              <LexicalContentEditable />
            </div>
          </div>
        </RichTextPlugin>
      </div>
    </>
  );
});
