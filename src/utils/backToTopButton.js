export function buttonToTop() {
    const backToTopButton = document.querySelector(".button-to-top");

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 400,
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