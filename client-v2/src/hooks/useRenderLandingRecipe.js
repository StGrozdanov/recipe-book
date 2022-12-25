import LandingRecipeCard from "../components/Landing/modules/LandingRecipeCard/LandingRecipeCard";

const animationDelayMap = {
    0: '250ms',
    1: '700ms',
    2: '1s',
}

export function useRenderLandingRecipe(recipes, animationCondition) {
    const landingRecipes = recipes.map((recipe, index) => {
        recipe.animationDelay = animationDelayMap[index];
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