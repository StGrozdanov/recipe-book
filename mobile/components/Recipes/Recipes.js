import { FlatList, RefreshControl } from "react-native";
import { userStyles } from "../Users/UserStyleSheet";
import Table from "../Table/Table";
import { useCallback, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDataParamSort } from "../../hooks/useDataParamSort";

const DATA = [
    { id: 1, name: 'Кекс', Owner: 'redirect', Location: 'redirect', Status: 'Approved', imgUrl: 'https://www.supichka.com/files/images/2565/bananov_keks_s_karamelena_glazura.jpg' },
    { id: 2, name: 'Болонезе', Owner: 'redirect', Location: 'redirect', Status: 'Approved', imgUrl: 'https://cdn.pro-nails.ru/kuchnia/9457043/spaghetti_bolognese_przepis_oryginalny_na_sos_pomidorowy_do_makaronu.jpg.webp' },
    { id: 3, name: 'Мусака', Owner: 'redirect', Location: 'redirect', Status: 'Pending', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFigbee7U_EsyaP0GE6Gs-s6SQVV9tvG14fA&usqp=CAU' },
    { id: 4, name: 'Баклава', Owner: 'redirect', Location: 'redirect', Status: 'Pending', imgUrl: '' },
    { id: 5, name: 'Тиквеник', Owner: 'redirect', Location: 'redirect', Status: 'Approved', imgUrl: '' },
    { id: 6, name: 'Тутманик', Owner: 'redirect', Location: 'redirect', Status: 'Approved', imgUrl: '' },
    { id: 7, name: 'Картофена крем супа', Owner: 'redirect', Location: 'redirect', Status: 'Pending', imgUrl: '' },
    { id: 8, name: 'Малиново суфле', Owner: 'redirect', Location: 'redirect', Status: 'Approved', imgUrl: '' },
    { id: 9, name: 'Рикота-рол с шамфъстък', Owner: 'redirect', Location: 'redirect', Status: 'Pending', imgUrl: '' },
    { id: 10, name: 'Тирамису', Owner: 'redirect', Location: 'redirect', Status: 'Approved', imgUrl: '' },
    { id: 11, name: 'Ябълкова натрошенка', Owner: 'redirect', Location: 'redirect', Status: 'Approved', imgUrl: '' },
    { id: 12, name: 'Салата цезар', Owner: 'redirect', Location: 'redirect', Status: 'Approved', imgUrl: '' },
    { id: 13, name: 'Брускети с доматени кюфтенца по италиански', Owner: 'redirect', Location: 'redirect', Status: 'Pending', imgUrl: '' },
    { id: 14, name: 'Телешки бургер', Owner: 'redirect', Location: 'redirect', Status: 'Approved', imgUrl: '' },
    { id: 15, name: 'Палачинки', Owner: 'redirect', Location: 'redirect', Status: 'Approved', imgUrl: '' },
];

export default function Recepies() {
    const [refreshData, setRefreshData] = useState(false);
    const route = useRoute();
    const sortedData = useDataParamSort(DATA, route.params.itemId);

    const onRefresh = useCallback(() => {
        setRefreshData(true);
        setTimeout(() => {
            setRefreshData(false)
        }, 2000)
    }, []);

    return (
        <FlatList
            refreshControl={<RefreshControl refreshing={refreshData} onRefresh={onRefresh} />}
            style={userStyles.container}
            keyExtractor={item => item.id}
            data={sortedData}
            renderItem={({ item }) => (
                <Table
                    name={item.name}
                    pictureType={'food'}
                    pictureSource={item.imgUrl}
                    data={item}
                    isEven={item.id % 2 === 0}
                    isFirst={sortedData[0].id === item.id}
                    isLast={sortedData[sortedData.length - 1].id === item.id}
                    approveAction={item.Status == 'Approved' ? false : 'recipe'}
                    removeAction={'recipe'}
                />
            )}
        />
    );
}