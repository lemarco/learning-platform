import {
  AriaAttributes,
  HtmlHTMLAttributes,
  component$,
  noSerialize,
  useContext,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { LexicalComposerContext } from "..";
import styles from "./ContentEditable.css?inline";

export type Props = {
  ariaActiveDescendant?: AriaAttributes["aria-activedescendant"];
  ariaAutoComplete?: AriaAttributes["aria-autocomplete"];
  ariaControls?: AriaAttributes["aria-controls"];
  ariaDescribedBy?: AriaAttributes["aria-describedby"];
  ariaExpanded?: AriaAttributes["aria-expanded"];
  ariaLabel?: AriaAttributes["aria-label"];
  ariaLabelledBy?: AriaAttributes["aria-labelledby"];
  ariaMultiline?: AriaAttributes["aria-multiline"];
  ariaOwns?: AriaAttributes["aria-owns"];
  ariaRequired?: AriaAttributes["aria-required"];
  autoCapitalize?: HTMLDivElement["autocapitalize"];
  "data-testid"?: string | null | undefined;
} & HtmlHTMLAttributes<HTMLDivElement>;

export const LexicalContentEditable = component$(
  ({
    ariaActiveDescendant,
    ariaAutoComplete,
    ariaControls,
    ariaDescribedBy,
    ariaExpanded,
    ariaLabel,
    ariaLabelledBy,
    ariaMultiline,
    ariaOwns,
    ariaRequired,
    autoCapitalize,
    className,
    id,
    role = "textbox",
    // spellCheck = true,
    style,
    tabIndex,
    "data-testid": testid,
    ...rest
  }: Props) => {
    useStyles$(styles);
    const { editor } = useContext(LexicalComposerContext);

    // if (composerContext == null) {
    //   invariant(false, "LexicalComposerContext.useLexicalComposerContext: cannot find a LexicalComposerContext");
    // }

    // return composerContext.value;

    const ref = useSignal<HTMLDivElement>();
    const isEditable = useSignal(false);

    // const ref = useCallback(
    //   (rootElement: null | HTMLElement) => {
    //     editor.setRootElement(rootElement);
    //   },
    //   [editor],
    // );
    useVisibleTask$(() => {
      const currentIsEditable = editor?.isEditable() || true;
      isEditable.value = true;

      editor?.registerEditableListener((currentIsEditable) => {
        isEditable.value = currentIsEditable;
      });
    });
    // useLayoutEffect(() => {
    //   setEditable(editor.isEditable());
    //   return editor.registerEditableListener((currentIsEditable) => {
    //     setEditable(currentIsEditable);
    //   });
    // }, [editor]);

    return (
      <div
        {...rest}
        aria-activedescendant={!isEditable ? undefined : ariaActiveDescendant}
        aria-autocomplete={!isEditable ? "none" : ariaAutoComplete}
        aria-controls={!isEditable ? undefined : ariaControls}
        aria-describedby={ariaDescribedBy}
        aria-expanded={!isEditable ? undefined : role === "combobox" ? !!ariaExpanded : undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-multiline={ariaMultiline}
        aria-owns={!isEditable ? undefined : ariaOwns}
        aria-readonly={!isEditable ? true : undefined}
        aria-required={ariaRequired}
        autoCapitalize={autoCapitalize}
        class={"ContentEditable__root"}
        contentEditable={String(isEditable.value) as "false" | "true"}
        data-testid={testid}
        id={id}
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        ref={() => editor?.setRootElement(ref.value!)}
        role={role}
        // spellCheck={spellCheck}
        style={style}
        tabIndex={tabIndex}
      />
    );
  },
);
