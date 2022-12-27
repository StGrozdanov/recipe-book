import { useElementIsInViewport } from "../../../hooks/useElementIsInViewport";

export function useLandingRefs(latestRecipesRef, mostViewedRecipesRef, commentsRef) {
    const latestRecipesAreInViewport = useElementIsInViewport(latestRecipesRef);
    const mostViewedRecipesAreInViewport = useElementIsInViewport(mostViewedRecipesRef);
    const commentsAreInViewport = useElementIsInViewport(commentsRef);

    return [latestRecipesAreInViewport, mostViewedRecipesAreInViewport, commentsAreInViewport];
}