import type {
  DOMChildConversion,
  DOMConversion,
  DOMConversionFn,
  GridSelection,
  LexicalEditor,
  EditorNode,
  NodeSelection,
  RangeSelection,
} from "../";

import {
  $cloneWithProperties,
  $sliceSelectedTextNodeContent,
} from "../selection";
import { $getRoot, $isElementNode, $isTextNode } from "../";

/**
 * How you parse your html string to get a document is left up to you. In the browser you can use the native
 * DOMParser API to generate a document (see clipboard.ts), but to use in a headless environment you can use JSDom
 * or an equivilant library and pass in the document here.
 */
export function $generateNodesFromDOM(
  editor: LexicalEditor,
  dom: Document
): Array<EditorNode> {
  const elements = dom.body ? dom.body.childNodes : [];
  let EditorNodes: Array<EditorNode> = [];
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (!IGNORE_TAGS.has(element.nodeName)) {
      const EditorNode = $createNodesFromDOM(element, editor);
      if (EditorNode !== null) {
        EditorNodes = EditorNodes.concat(EditorNode);
      }
    }
  }

  return EditorNodes;
}

export function $generateHtmlFromNodes(
  editor: LexicalEditor,
  selection?: RangeSelection | NodeSelection | GridSelection | null
): string {
  if (typeof document === "undefined" || typeof window === "undefined") {
    throw new Error(
      "To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function."
    );
  }

  const container = document.createElement("div");
  const root = $getRoot();
  const topLevelChildren = root.getChildren();

  for (let i = 0; i < topLevelChildren.length; i++) {
    const topLevelNode = topLevelChildren[i];
    $appendNodesToHTML(editor, topLevelNode, container, selection);
  }

  return container.innerHTML;
}

function $appendNodesToHTML(
  editor: LexicalEditor,
  currentNode: EditorNode,
  parentElement: HTMLElement | DocumentFragment,
  selection: RangeSelection | NodeSelection | GridSelection | null = null
): boolean {
  let shouldInclude =
    selection != null ? currentNode.isSelected(selection) : true;
  const shouldExclude =
    $isElementNode(currentNode) && currentNode.excludeFromCopy("html");
  let target = currentNode;

  if (selection !== null) {
    let clone = $cloneWithProperties<EditorNode>(currentNode);
    clone =
      $isTextNode(clone) && selection != null
        ? $sliceSelectedTextNodeContent(selection, clone)
        : clone;
    target = clone;
  }
  const children = $isElementNode(target) ? target.getChildren() : [];
  const { element, after } = target.exportDOM(editor);

  if (!element) {
    return false;
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < children.length; i++) {
    const childNode = children[i];
    const shouldIncludeChild = $appendNodesToHTML(
      editor,
      childNode,
      fragment,
      selection
    );

    if (
      !shouldInclude &&
      $isElementNode(currentNode) &&
      shouldIncludeChild &&
      currentNode.extractWithChild(childNode, selection, "html")
    ) {
      shouldInclude = true;
    }
  }

  if (shouldInclude && !shouldExclude) {
    element.append(fragment);
    parentElement.append(element);

    if (after) {
      const newElement = after.call(target, element);
      if (newElement) element.replaceWith(newElement);
    }
  } else {
    parentElement.append(fragment);
  }

  return shouldInclude;
}

function getConversionFunction(
  domNode: Node,
  editor: LexicalEditor
): DOMConversionFn | null {
  const { nodeName } = domNode;

  const cachedConversions = editor._htmlConversions.get(nodeName.toLowerCase());

  let currentConversion: DOMConversion | null = null;

  if (cachedConversions !== undefined) {
    for (const cachedConversion of cachedConversions) {
      const domConversion = cachedConversion(domNode);

      if (
        domConversion !== null &&
        (currentConversion === null ||
          currentConversion.priority < domConversion.priority)
      ) {
        currentConversion = domConversion;
      }
    }
  }

  return currentConversion !== null ? currentConversion.conversion : null;
}

const IGNORE_TAGS = new Set(["STYLE", "SCRIPT"]);

function $createNodesFromDOM(
  node: Node,
  editor: LexicalEditor,
  forChildMap: Map<string, DOMChildConversion> = new Map(),
  parentEditorNode?: EditorNode | null | undefined
): Array<EditorNode> {
  let EditorNodes: Array<EditorNode> = [];

  if (IGNORE_TAGS.has(node.nodeName)) {
    return EditorNodes;
  }

  let currentEditorNode = null;
  const transformFunction = getConversionFunction(node, editor);
  const transformOutput = transformFunction
    ? transformFunction(node as HTMLElement)
    : null;
  let postTransform = null;

  if (transformOutput !== null) {
    postTransform = transformOutput.after;
    const transformNodes = transformOutput.node;
    currentEditorNode = Array.isArray(transformNodes)
      ? transformNodes[transformNodes.length - 1]
      : transformNodes;

    if (currentEditorNode !== null) {
      for (const [, forChildFunction] of forChildMap) {
        currentEditorNode = forChildFunction(
          currentEditorNode,
          parentEditorNode
        );

        if (!currentEditorNode) {
          break;
        }
      }

      if (currentEditorNode) {
        EditorNodes.push(
          ...(Array.isArray(transformNodes)
            ? transformNodes
            : [currentEditorNode])
        );
      }
    }

    if (transformOutput.forChild != null) {
      forChildMap.set(node.nodeName, transformOutput.forChild);
    }
  }

  // If the DOM node doesn't have a transformer, we don't know what
  // to do with it but we still need to process any childNodes.
  const children = node.childNodes;
  let childEditorNodes = [];

  for (let i = 0; i < children.length; i++) {
    childEditorNodes.push(
      ...$createNodesFromDOM(
        children[i],
        editor,
        new Map(forChildMap),
        currentEditorNode
      )
    );
  }

  if (postTransform != null) {
    childEditorNodes = postTransform(childEditorNodes);
  }

  if (currentEditorNode == null) {
    // If it hasn't been converted to a EditorNode, we hoist its children
    // up to the same level as it.
    EditorNodes = EditorNodes.concat(childEditorNodes);
  } else {
    if ($isElementNode(currentEditorNode)) {
      // If the current node is a ElementNode after conversion,
      // we can append all the children to it.
      currentEditorNode.append(...childEditorNodes);
    }
  }

  return EditorNodes;
}
