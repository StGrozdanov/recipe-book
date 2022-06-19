import { FlatList } from "react-native";
import { userStyles } from "./UserStyleSheet";
import Table from "../Table/Table";

const DATA = [
    { id: 1, username: 'shushan', Email: 'some@email', Avatar: 'some avatar', Cover: 'some photo', Status: 'online', Role: 'Administrator' },
    { id: 2, username: 'ani', Email: 'some@email', Avatar: 'some avatar', Cover: 'some photo', Status: 'online', Role: 'Administrator' },
    { id: 3, username: 'Pesho', Email: 'some@email', Avatar: 'some avatar', Cover: 'some photo', Status: 'offline', Role: 'Moderator' },
    { id: 4, username: 'Mery', Email: 'some@email', Avatar: 'some avatar', Cover: 'some photo', Status: 'offline', Role: 'User' },
    { id: 5, username: 'Debilno', Email: 'some@email', Avatar: 'some avatar', Cover: 'some photo', Status: 'offline', Role: 'User' },
];

export default function Users() {
    return (
        <FlatList
            style={userStyles.container}
            key={DATA.id}
            data={DATA}
            renderItem={({ item }) => (
                <Table
                    name={item.username}
                    pictureType={'avatar'}
                    data={item}
                    isEven={item.id % 2 === 0}
                    isFirst={DATA[0].id === item.id}
                    isLast={DATA[DATA.length - 1].id === item.id}
                />
            )}
        />
    );
}