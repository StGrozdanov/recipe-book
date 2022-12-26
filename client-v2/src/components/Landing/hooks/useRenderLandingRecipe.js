import LandingRecipeCard from "../modules/LandingRecipeCard/LandingRecipeCard";

const defaultaAnimationsDelayMap = { 0: '1s', 1: '1.3s', 2: '1.7s' }
const mostViewedAnimationsDelayMap = { 0: '1.5s', 1: '3s', 2: '4.5s' }

export function useRenderLandingRecipe(recipes, animationCondition, isMostViewed) {
    const landingRecipes = recipes.map((recipe, index) => {
        recipe.animationDelay = isMostViewed ? mostViewedAnimationsDelayMap[index] : defaultaAnimationsDelayMap[index];
        return (
            <LandingRecipeCard
                key={recipe.id}
                {...recipe}
                animation={animationCondition}
            />
        )
    });

    return landingRecipes;
}