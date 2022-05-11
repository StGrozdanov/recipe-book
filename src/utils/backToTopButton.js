export function buttonToTop() {
    const backToTopButton = document.querySelector(".button-to-top");

    backToTopButton.addEventListener("click", () => {
        let topPosition;

        if (window.matchMedia('(max-device-width: 700px)').matches) {
            topPosition = 0;
        } else {
            topPosition = 400;
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