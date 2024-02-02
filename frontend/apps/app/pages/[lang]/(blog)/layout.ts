import { html } from "../../../utils/html"
import { Footer } from "./footer"
import { Header } from "./header"

export const layout = ()=>{
    return html`
        ${Header("link")}
        <!--slot-->
        ${Footer()}
    `
}