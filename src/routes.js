import About from "./sections/About.svelte"
import Experience from "./sections/Experience.svelte"
import Work from "./sections/Work.svelte"

const routes = {
    "/": About,
    "/experience": Experience,
    "/work": Work
}

export { routes }