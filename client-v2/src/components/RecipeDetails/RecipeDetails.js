import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as recipeService from '../../services/recipeService';
import * as userService from '../../services/userService';
import { capitalizatorUtil } from "../../utils/capitalizatorUtil";
import FallbackImage from '../common/FallbackImage/FallbackImage';

export default function RecipeDetails() {
    const [recipe, setRecipe] = useState({});
    const [owner, setOwner] = useState({});
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            const recipeData = await recipeService.getSingleRecipe(params.id);
            const ownerData = await userService.getUser(recipeData.ownerId);
            recipeData.recipeName = capitalizatorUtil(recipeData.recipeName);
            setRecipe(recipeData);
            setOwner(ownerData);
        }
        fetchData();
    }, []);

    return (
        <>
            <h2>{recipe.recipeName}</h2>
            <FallbackImage src={recipe.imageUrl} alt={"/images/food.jpg"} />
            <h2>Категория: {recipe.categoryName}</h2>
            <h2>Публикувана от: {owner.username}</h2>
            <FallbackImage src={owner.avatarUrl} alt={"/images/avatar.png"} />
            <div>Продукти: {recipe.products}</div>
            <div>Стъпки на приготвяне: {recipe.steps}</div>
        </>
    );
}