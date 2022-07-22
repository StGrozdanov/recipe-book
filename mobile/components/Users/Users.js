import { FlatList, Image, RefreshControl } from "react-native";
import { userStyles } from "./UserStyleSheet";
import Table from "../Table/Table";
import { useCallback, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDataParamSort } from "../../hooks/useDataParamSort";
import { getAllUsers } from "../../services/userService";
import socket from "../../services/socketioService";
import { getCurrentUser } from "../../services/authenticationService";
import { useSearchContext } from "../../hooks/useSearchContext";
import SuccessModal from "../ModalDialogue/SuccessModal";

export default function Users() {
    const [refreshData, setRefreshData] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { search } = useSearchContext();
    const route = useRoute();
    const sortedData = useDataParamSort(userData, route.params.itemId);

    useEffect(() => {
        if (search && search.collection == 'Users') {
            setIsLoading(true);
            const results = search.results.map(user => {
                user.Profile = user.id;
                onlineUsers.includes(user.id) ? user.Status = 'online' : user.Status = 'offline';
                return user;
            });
            setUserData(results);
            setIsLoading(false);
        }
    }, [search]);

    useEffect(() => {
        getCurrentUser().then(response => {
            socket.emit("checkForOnlineUsers", response);
        })
    }, [refreshData]);

    useEffect(() => {
        socket.on('connectedUsers', data => {
            data.forEach(user => {
                setOnlineUsers(() => {
                    onlineUsers.push(user.userId);
                });
            });
        });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getAllUsers()
            .then(res => {
                const results = res.content.map(user => {
                    user.Profile = user.id;
                    onlineUsers.includes(user.id) ? user.Status = 'online' : user.Status = 'offline';
                    return user;
                });
                setUserData(results);
                setIsLoading(false);
            })
            .catch(error => console.log(error.message));
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshData(true);
        getAllUsers()
            .then(res => {
                const results = res.content.map(user => {
                    user.Profile = user.id;
                    onlineUsers.includes(user.id) ? user.Status = 'online' : user.Status = 'offline';
                    return user;
                });
                setUserData(results);
            })
            .then(setRefreshData(false))
            .catch(error => console.log(error.message));
    }, []);

    function removeUser(userId) {
        setUserData(userData.filter(user => user.id !== userId));
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
                        name={item.username}
                        pictureSource={item.avatarUrl}
                        pictureType={'avatar'}
                        data={item}
                        isEven={item.id % 2 === 0}
                        isFirst={sortedData[0].id === item.id}
                        isLast={sortedData[sortedData.length - 1].id === item.id}
                        blockAction={'user'}
                        changeRoleAction={true}
                        deleteAction={'user'}
                        editAction={'user'}
                        removeUser={removeUser}
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