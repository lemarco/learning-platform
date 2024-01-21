import { component$ } from "@builder.io/qwik";

export * from "./burger.icon";
export * from "./down-arrow.icon";
export * from "./exploreDesignWork.icon";
export * from "./github.icon";
export * from "./google.icon";
export * from "./metamask.icon";
export * from "./english-flag.icon";
export * from "./statistics.icon";
export * from "./search.icon";
export * from "./like.icon";
export * from "./collections.icon";
export * from "./fire.icon";
export * from "./right-arrow.con";
export * from "./facebook-share.icon";
export * from "./twitter-share.icon";
export * from "./bookmark.icon";
export * from "./copy-link.icon";
export * from "./question-mark.icon";
export * from "./check-mark.icon";
export * from "./fingerprint.icon";
import { NoteIcon } from "./note.icon";

export type IconName = "NoteIcon"
type IconProps = {
  className: string;
  name?: IconName
}

export const Icon = component$(({ className, name }: IconProps) => {
  switch (name) {
    case "NoteIcon":
      return <NoteIcon className={className} />;
    default:
      return <></>;
  }
});
