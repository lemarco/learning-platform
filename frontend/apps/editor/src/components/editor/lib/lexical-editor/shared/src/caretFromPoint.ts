export function caretFromPoint(
  x: number,
  y: number,
): null | {
  offset: number;
  node: Node;
} {
  if (typeof document.caretRangeFromPoint !== "undefined") {
    const range = document.caretRangeFromPoint(x, y);

    return range === null
      ? null
      : {
          node: range.startContainer,
          offset: range.startOffset,
        };
  }
  // @ts-ignore
  if (document.caretPositionFromPoint !== "undefined") {
    // @ts-ignore FF - no types
    const range = document.caretPositionFromPoint(x, y);
    return range === null
      ? null
      : {
          node: range.offsetNode,
          offset: range.offset,
        };
  }
  // Gracefully handle IE
  return null;
}
