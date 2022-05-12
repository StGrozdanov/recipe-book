const SCROLL_TO_SCREEN_TOP_VALUE = 0;
const SCROLL_TO_RECIPE_VIEWPORT_VALUE = 400;

export function buttonToTop() {
    const backToTopButton = document.querySelector(".button-to-top");

    backToTopButton.addEventListener("click", () => {
        let topPosition;

        if (window.matchMedia('(max-device-width: 700px)').matches) {
            topPosition = SCROLL_TO_SCREEN_TOP_VALUE;
        } else {
            topPosition = SCROLL_TO_RECIPE_VIEWPORT_VALUE;
        }

        window.scrollTo({
            top: topPosition,
            behavior: "smooth"
        });
    });

    function toggleBackToTopButton() {
        if (window.scrollY > 500) {
            backToTopButton.style.visibility = "visible";
        } else {
            backToTopButton.style.visibility = "hidden";
        }
    };

    document.addEventListener("scroll", () => toggleBackToTopButton());
}