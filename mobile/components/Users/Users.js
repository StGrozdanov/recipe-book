import { FlatList } from "react-native";
import User from "./User";
import { userStyles } from "./UserStyleSheet";

const DATA = [
    { id: 1, username: 'shushan', email: 'some@email', avatar: 'some avatar', coverPhoto: 'some photo', status: 'online' },
    { id: 2, username: 'ani', email: 'some@email', avatar: 'some avatar', coverPhoto: 'some photo', status: 'online' },
    { id: 3, username: 'Pesho', email: 'some@email', avatar: 'some avatar', coverPhoto: 'some photo', status: 'offline' },
    { id: 4, username: 'Mery', email: 'some@email', avatar: 'some avatar', coverPhoto: 'some photo', status: 'offline' },
    { id: 5, username: 'Debilno', email: 'some@email', avatar: 'some avatar', coverPhoto: 'some photo', status: 'offline' },
];


export default function Users() {
    return (
        <FlatList
            style={userStyles.container}
            data={DATA}
            renderItem={({ item }) => (
                <User
                    username={item.username}
                    email={item.email}
                    avatar={item.avatar}
                    coverPhoto={item.coverPhoto}
                    status={item.status}
                    isEven={item.id % 2 === 0}
                    isFirst={DATA[0].id === item.id}
                    isLast={DATA[DATA.length - 1].id === item.id}
                />
            )}
        />
    );
}