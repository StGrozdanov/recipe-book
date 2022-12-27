import LandingRecipeCard from "../modules/LandingRecipeCard/LandingRecipeCard";

const animationDelayMap = { 0: '500ms', 1: '1s', 2: '1.5s' }
const mostViewedAnimationDelayMap = { 0: '1s', 1: '2.5s', 2: '4.5s' }

export function useRenderLandingRecipe(recipes, animationCondition, isMostViewed) {
    const landingRecipes = recipes.map((recipe, index) => {
        recipe.animationDelay = isMostViewed ? mostViewedAnimationDelayMap[index] : animationDelayMap[index];
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