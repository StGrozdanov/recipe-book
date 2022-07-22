import { FlatList, RefreshControl } from "react-native";
import { userStyles } from "../Users/UserStyleSheet";
import { useCallback, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDataParamSort } from "../../hooks/useDataParamSort";
import { summary } from "../../helpers/contentSummary";
import { getAllRecipesAdmin } from "../../services/recipeService";
import Table from "../Table/Table";

export default function Recepies() {
    const [refreshData, setRefreshData] = useState(false);
    const [recipeData, setRecipeData] = useState([]);
    const route = useRoute();
    const sortedData = useDataParamSort(recipeData, route.params.itemId);

    useEffect(() => {
        getAllRecipesAdmin()
        .then(res => {
            const results = res.content.map(recipe => {
                recipe.Owner = recipe.ownerId;
                recipe.Location = recipe.id;
                recipe.Status = recipe.statusName;
                return recipe;
            });
            setRecipeData(results);
        })
        .catch(error => console.log(error.message));
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshData(true);
        getAllRecipesAdmin()
        .then(res => {
            const results = res.content.map(recipe => {
                recipe.Owner = recipe.ownerId;
                recipe.Location = recipe.id;
                recipe.Status = recipe.statusName;
                return recipe;
            });
            setRecipeData(results);
        })
        .then(setRefreshData(false))
        .catch(error => console.log(error.message));
    }, []);

    function removeRecipe(recipeId) {
        setRecipeData(recipeData.filter(recipe => recipe.id !== recipeId));
    }

    return (
        <FlatList
            refreshControl={<RefreshControl refreshing={refreshData} onRefresh={onRefresh} />}
            style={userStyles.container}
            keyExtractor={item => item.id}
            data={sortedData}
            renderItem={({ item }) => (
                <Table
                    name={summary(item.recipeName, 20)}
                    pictureType={'food'}
                    pictureSource={item.imageUrl.charAt[0] !== 'h' ? item.imgUrl : item.imageUrl}
                    data={item}
                    isEven={item.id % 2 === 0}
                    isFirst={sortedData[0].id === item.id}
                    isLast={sortedData[sortedData.length - 1].id === item.id}
                    approveAction={item.statusName == 'одобрена' ? false : 'recipe'}
                    deleteAction={'recipe'}
                    removeRecipe={removeRecipe}
                />
            )}
        />
    );
}