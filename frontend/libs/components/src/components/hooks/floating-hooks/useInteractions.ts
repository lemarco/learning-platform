import { useStore } from "@builder.io/qwik";

export interface ElementProps {
  reference?: React.HTMLProps<Element>;
  floating?: React.HTMLProps<HTMLElement>;
  item?: React.HTMLProps<HTMLElement> | ((props: ExtendedUserProps) => React.HTMLProps<HTMLElement>);
}

const ACTIVE_KEY = "active";
const SELECTED_KEY = "selected";

export type ExtendedUserProps = {
  [ACTIVE_KEY]?: boolean;
  [SELECTED_KEY]?: boolean;
};
function mergeProps<Key extends keyof ElementProps>(
  userProps: (React.HTMLProps<Element> & ExtendedUserProps) | undefined,
  propsList: Array<ElementProps>,
  elementKey: Key,
): Record<string, unknown> {
  const map = new Map<string, Array<(...args: unknown[]) => void>>();
  const isItem = elementKey === "item";

  let domUserProps = userProps;
  if (isItem && userProps) {
    const { [ACTIVE_KEY]: _, [SELECTED_KEY]: __, ...validProps } = userProps;
    domUserProps = validProps;
  }

  return {
    ...(elementKey === "floating" && { tabIndex: -1 }),
    ...domUserProps,
    ...propsList
      .map((value) => {
        const propsOrGetProps = value ? value[elementKey] : null;
        if (typeof propsOrGetProps === "function") {
          return userProps ? propsOrGetProps(userProps) : null;
        }
        return propsOrGetProps;
      })
      .concat(userProps)
      .reduce((acc: Record<string, unknown>, props) => {
        if (!props) {
          return acc;
        }

        // biome-ignore lint/complexity/noForEach: <explanation>
        Object.entries(props).forEach(([key, value]) => {
          if (isItem && [ACTIVE_KEY, SELECTED_KEY].includes(key)) {
            return;
          }

          if (key.indexOf("on") === 0) {
            if (!map.has(key)) {
              map.set(key, []);
            }

            if (typeof value === "function") {
              map.get(key)?.push(value);

              acc[key] = (...args: unknown[]) => {
                return map
                  .get(key)
                  ?.map((fn) => fn(...args))
                  .find((val) => val !== undefined);
              };
            }
          } else {
            acc[key] = value;
          }
        });

        return acc;
      }, {}),
  };
}

export function useInteractions(propsList: Array<ElementProps> = []) {
  const deps = propsList;
  const getReferenceProps = (userProps?: Omit<React.HTMLProps<HTMLElement>, "selected" | "active"> & ExtendedUserProps) =>
    mergeProps(userProps, propsList, "reference");
  const getFloatingProps = (userProps?: Omit<React.HTMLProps<HTMLElement>, "selected" | "active"> & ExtendedUserProps) =>
    mergeProps(userProps, propsList, "floating");
  const getItemProps = (userProps?: Omit<React.HTMLProps<HTMLElement>, "selected" | "active"> & ExtendedUserProps) =>
    mergeProps(userProps, propsList, "item");
  return { getReferenceProps, getFloatingProps, getItemProps };
}
