import About from "./pages/About.svelte"
import Experience from "./pages/Experience.svelte"
import Work from "./pages/Work.svelte"

const routes = {
    "/": About,
    "/experience": Experience,
    "/work": Work
}

export { routes }