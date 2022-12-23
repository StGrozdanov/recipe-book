export function smoothScroll(viewportPositionDivisor = 2.5) {
    const SCROLL_DOWN_RECIPE_CATALOGUE_VIEWPORT_VALUE = document.body.clientHeight / viewportPositionDivisor;

    window.scrollTo({
        top: SCROLL_DOWN_RECIPE_CATALOGUE_VIEWPORT_VALUE,
        behavior: "smooth"
    });
}