import { FlatList, RefreshControl } from "react-native";
import { userStyles } from "../Users/UserStyleSheet";
import { summary } from "../../helpers/contentSummary";
import { useCallback, useEffect, useState } from "react";
import { useDataParamSort } from '../../hooks/useDataParamSort';
import { useRoute } from "@react-navigation/native";
import { getAllCommentsAdmin } from "../../services/commentService";
import Table from "../Table/Table";
import { useSearchContext } from "../../hooks/useSearchContext";

export default function Comments() {
    const [refreshData, setRefreshData] = useState(false);
    const [commentData, setCommentData] = useState([]);
    const { search } = useSearchContext();
    const route = useRoute();
    const sortedData = useDataParamSort(commentData, route.params.itemId);

    useEffect(() => {
        if (search && search.collection == 'Comments') {
            const results = search.results.map(comment => {
                comment.Owner = comment.ownerId;
                comment.Location = comment.id;
                return comment;
            });
            setCommentData(results);
        }
    }, [search]);

    useEffect(() => {
        getAllCommentsAdmin()
        .then(res => {
            const results = res.content.map(comment => {
                comment.Owner = comment.ownerId;
                comment.Location = comment.id;
                return comment;
            });
            setCommentData(results);
        })
        .catch(error => console.log(error.message));
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshData(true);
        getAllCommentsAdmin()
        .then(res => {
            const results = res.content.map(comment => {
                comment.Owner = comment.ownerId;
                comment.Location = comment.id;
                return comment;
            });
            setCommentData(results);
        })
        .then(setRefreshData(false))
        .catch(error => console.log(error.message));
    }, []);

    function removeComment(commentId) {
        setCommentData(commentData.filter(comment => comment.id !== commentId));
    }

    return (
        <FlatList
            refreshControl={<RefreshControl refreshing={refreshData} onRefresh={onRefresh} />}
            style={userStyles.container}
            keyExtractor={item => item.id}
            data={sortedData}
            renderItem={({ item }) => (
                <Table
                    name={summary(item.content, 20)}
                    pictureType={'avatar'}
                    pictureSource={item.imgUrl}
                    data={item}
                    isEven={item.id % 2 === 0}
                    isFirst={sortedData[0].id === item.id}
                    isLast={sortedData[sortedData.length - 1].id === item.id}
                    blockAction={'user'}
                    deleteAction={'comment'}
                    removeComment={removeComment}
                />
            )}
        />
    );
}