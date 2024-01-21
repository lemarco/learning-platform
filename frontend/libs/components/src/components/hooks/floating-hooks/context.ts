import { createContextId } from "@builder.io/qwik";
// @ts-ignore
export interface FloatingNodeType<any> {
  // export interface FloatingNodeType<RT extends  ReferenceType = ReferenceType> {
  id: string;
  parentId: string | null;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  context?: any;
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const floatingNodeTypeContext = createContextId<FloatingNodeType<any>>("floatingContext");
