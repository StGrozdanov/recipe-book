import { FlatList, Image, RefreshControl } from "react-native";
import { userStyles } from "../Users/UserStyleSheet";
import { summary } from "../../helpers/contentSummary";
import { useCallback, useEffect, useState } from "react";
import { useDataParamSort } from '../../hooks/useDataParamSort';
import { useRoute } from "@react-navigation/native";
import { getAllCommentsAdmin } from "../../services/commentService";
import { useSearchContext } from "../../hooks/useSearchContext";
import Table from "../Table/Table";
import SuccessModal from "../ModalDialogue/SuccessModal";

export default function Comments() {
    const [refreshData, setRefreshData] = useState(false);
    const [commentData, setCommentData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { search } = useSearchContext();
    const route = useRoute();
    const sortedData = useDataParamSort(commentData, route.params.itemId);

    useEffect(() => {
        if (search && search.collection == 'Comments') {
            setIsLoading(true);
            const results = search.results.map(comment => {
                comment.Owner = comment.ownerId;
                comment.Location = comment.id;
                return comment;
            });
            setCommentData(results);
            setIsLoading(false);
        }
    }, [search]);

    useEffect(() => {
        setIsLoading(true);
        getAllCommentsAdmin()
            .then(res => {
                const results = res.content.map(comment => {
                    comment.Owner = comment.ownerId;
                    comment.Location = comment.id;
                    return comment;
                });
                setCommentData(results);
                setIsLoading(false);
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
        <>
            <FlatList
                refreshControl={<RefreshControl refreshing={refreshData} onRefresh={onRefresh} />}
                style={userStyles.container}
                keyExtractor={item => item.id}
                data={sortedData}
                renderItem={({ item }) => (
                    <Table
                        name={summary(item.content, 20)}
                        pictureType={'avatar'}
                        pictureSource={item.ownerAvatarUrl}
                        data={item}
                        isEven={item.id % 2 === 0}
                        isFirst={sortedData[0].id === item.id}
                        isLast={sortedData[sortedData.length - 1].id === item.id}
                        blockAction={'user'}
                        deleteAction={'comment'}
                        removeComment={removeComment}
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