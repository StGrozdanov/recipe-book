import { FlatList } from "react-native";
import { userStyles } from "../Users/UserStyleSheet";
import Table from "../Table/Table";

const DATA = [
    { id: 1, name: 'Кекс', Owner: 'some@email', Location: 'some avatar', Status: 'Approved'},
    { id: 2, name: 'Болонезе', Owner: 'some@email', Location: 'some avatar', Status: 'Approved'},
    { id: 3, name: 'Мусака', Owner: 'some@email', Location: 'some avatar', Status: 'Pending'},
    { id: 4, name: 'Баклава', Owner: 'some@email', Location: 'some avatar', Status: 'Pending'},
    { id: 5, name: 'Тиквеник', Owner: 'some@email', Location: 'some avatar', Status: 'Approved'},
    { id: 6, name: 'Тутманик', Owner: 'some@email', Location: 'some avatar', Status: 'Approved'},
    { id: 7, name: 'Картофена крем супа', Owner: 'some@email', Location: 'some avatar', Status: 'Pending'},
    { id: 8, name: 'Малиново суфле', Owner: 'some@email', Location: 'some avatar', Status: 'Approved'},
    { id: 9, name: 'Рикота-рол с шамфъстък', Owner: 'some@email', Location: 'some avatar', Status: 'Pending'},
    { id: 10, name: 'Тирамису', Owner: 'some@email', Location: 'some avatar', Status: 'Approved'},
    { id: 11, name: 'Ябълкова натрошенка', Owner: 'some@email', Location: 'some avatar', Status: 'Approved'},
    { id: 12, name: 'Салата цезар', Owner: 'some@email', Location: 'some avatar', Status: 'Approved'},
    { id: 13, name: 'Брускети с доматени кюфтенца по италиански', Owner: 'some@email', Location: 'some avatar', Status: 'Pending'},
    { id: 14, name: 'Телешки бургер', Owner: 'some@email', Location: 'some avatar', Status: 'Approved'},
    { id: 15, name: 'Палачинки', Owner: 'some@email', Location: 'some avatar', Status: 'Approved'},
];

export default function Recepies() {
    return (
        <FlatList
            style={userStyles.container}
            key={DATA.id}
            data={DATA}
            renderItem={({ item }) => (
                <Table
                    name={item.name}
                    pictureType={'food'}
                    data={item}
                    isEven={item.id % 2 === 0}
                    isFirst={DATA[0].id === item.id}
                    isLast={DATA[DATA.length - 1].id === item.id}
                />
            )}
        />
    );
}