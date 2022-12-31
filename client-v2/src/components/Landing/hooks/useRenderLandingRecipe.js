import { capitalizatorUtil } from "../../../utils/capitalizatorUtil";
import RecipeCard from "../../RecipeCard/RecipeCard";

const animationDelayMap = { 0: '500ms', 1: '1.5s', 2: '2.5s' }

export function useRenderLandingRecipe(recipes, animationCondition) {
    const landingRecipes = recipes.map((recipe, index) => {
        recipe.recipeName = capitalizatorUtil(recipe.recipeName);
        recipe.animationDelay = animationDelayMap[index];
        return (
            <RecipeCard
                key={recipe.id}
                {...recipe}
                animation={animationCondition}
            />
        )
    });

    return landingRecipes;
}