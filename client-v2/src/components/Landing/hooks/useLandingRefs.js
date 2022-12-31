import { useElementIsInViewport } from "../../../hooks/useElementIsInViewport";

export function useLandingRefs(latestRecipesRef, mostViewedRecipesRef, commentsRef) {
    const latestRecipesAreInViewport = useElementIsInViewport(latestRecipesRef, '-10px');
    const mostViewedRecipesAreInViewport = useElementIsInViewport(mostViewedRecipesRef, '-10px');
    const commentsAreInViewport = useElementIsInViewport(commentsRef, '-10px');

    return [latestRecipesAreInViewport, mostViewedRecipesAreInViewport, commentsAreInViewport];
}