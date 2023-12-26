import { type RenderOptions, render } from "@builder.io/qwik";
import Root from "./root";

export default (opts: RenderOptions) => render(document, <Root />, opts);
