import { useElementIsInViewport } from "../../../hooks/useElementIsInViewport";

export function useLandingRefs(featuresRef, latestRecipesRef, mostViewedRecipesRef) {
    const featuresAreInViewport = useElementIsInViewport(featuresRef);
    const latestRecipesAreInViewport = useElementIsInViewport(latestRecipesRef);
    const mostViewedRecipesAreInViewport = useElementIsInViewport(mostViewedRecipesRef);

    return [featuresAreInViewport, latestRecipesAreInViewport, mostViewedRecipesAreInViewport]
}