// Flow comes with a pretty good library definitions for React, and it
// includes a type for useRef but no definition for the ref object itself.

// eslint-disable-next-line strict
declare type RefObject<T> = {current: null | T};
