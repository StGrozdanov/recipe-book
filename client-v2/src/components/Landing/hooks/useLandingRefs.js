import { useElementIsInViewport } from "../../../hooks/useElementIsInViewport";

export function useLandingRefs(latestRecipesRef, mostViewedRecipesRef) {
    const latestRecipesAreInViewport = useElementIsInViewport(latestRecipesRef);
    const mostViewedRecipesAreInViewport = useElementIsInViewport(mostViewedRecipesRef);

    return [latestRecipesAreInViewport, mostViewedRecipesAreInViewport]
}