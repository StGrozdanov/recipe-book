import { FlatList, Image, RefreshControl } from "react-native";
import { userStyles } from "../Users/UserStyleSheet";
import { useCallback, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDataParamSort } from "../../hooks/useDataParamSort";
import { summary } from "../../helpers/contentSummary";
import { getAllRecipesAdmin } from "../../services/recipeService";
import { useSearchContext } from "../../hooks/useSearchContext";
import Table from "../Table/Table";
import SuccessModal from "../ModalDialogue/SuccessModal";

export default function Recepies() {
    const [refreshData, setRefreshData] = useState(false);
    const [recipeData, setRecipeData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { search } = useSearchContext();
    const route = useRoute();
    const sortedData = useDataParamSort(recipeData, route.params.itemId);

    useEffect(() => {
        if (search && search.collection == 'Recipes') {
            setIsLoading(true);
            const results = search.results.map(recipe => {
                recipe.Owner = recipe.ownerId;
                recipe.Location = recipe.id;
                recipe.Status = recipe.statusName;
                return recipe;
            });
            setRecipeData(results);
            setIsLoading(false);
        }
    }, [search]);

    useEffect(() => {
        setIsLoading(true);
        getAllRecipesAdmin()
            .then(res => {
                const results = res.content.map(recipe => {
                    recipe.Owner = recipe.ownerId;
                    recipe.Location = recipe.id;
                    recipe.Status = recipe.statusName;
                    return recipe;
                });
                setRecipeData(results);
                setIsLoading(false);
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
        <>
            <FlatList
                refreshControl={<RefreshControl refreshing={refreshData} onRefresh={onRefresh} />}
                style={userStyles.container}
                keyExtractor={item => item.id}
                data={sortedData}
                renderItem={({ item }) => (
                    <Table
                        name={summary(item.recipeName, 20)}
                        pictureType={'food'}
                        pictureSource={item.imageUrl}
                        data={item}
                        isEven={item.id % 2 === 0}
                        isFirst={sortedData[0].id === item.id}
                        isLast={sortedData[sortedData.length - 1].id === item.id}
                        approveAction={item.statusName == 'одобрена' ? false : 'recipe'}
                        deleteAction={'recipe'}
                        removeRecipe={removeRecipe}
                        setSuccessMessage={setSuccessMessage}
                        setShowSuccessMessage={setShowSuccessMessage}
                    />
                )}
            />
            {
                isLoading &&
                <Image
                    source={require('../../assets/admin-panel-loading.gif')}
                    style={{ position: 'absolute', top: '35%', width: '100%', height: '10%', }}
                />
            }
            <SuccessModal
                visible={showSuccessMessage}
                setVisible={setShowSuccessMessage}
                message={successMessage}
            />
        </>
    );
}