import LandingRecipeCard from "../modules/LandingRecipeCard/LandingRecipeCard";

const defaultaAnimationsDelayMap = {
    0: '1s',
    1: '1.3s',
    2: '1.7s',
}

export function useRenderLandingRecipe(recipes, animationCondition, animationDelayMap) {
    const landingRecipes = recipes.map((recipe, index) => {
        recipe.animationDelay = animationDelayMap ? animationDelayMap[index] : defaultaAnimationsDelayMap[index];
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