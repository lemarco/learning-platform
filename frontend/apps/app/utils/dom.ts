export const updateElementContent = (element: Element, content: string) => {
	element.innerHTML = content;
};
export const getElementById = (id: string) => document?.querySelector(id);
