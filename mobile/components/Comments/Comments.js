import { FlatList, RefreshControl } from "react-native";
import { userStyles } from "../Users/UserStyleSheet";
import Table from "../Table/Table";
import { summary } from "../../helpers/contentSummary";
import { useCallback, useState } from "react";

const DATA = [
    { id: 1, content: 'ако е онова на Шушата е ТОП!', Owner: 'redirect', Location: 'redirect', imgUrl: '' },
    { id: 2, content: 'Всеки път става различна!ха ха ха', Owner: 'redirect', Location: 'redirect', imgUrl: '' },
    { id: 3, content: 'Баш неговото ще е! ТОП-ТОП!', Owner: 'redirect', Location: 'redirect', imgUrl: '' },
    { id: 4, content: 'The recipe is cool', Owner: 'redirect', Location: 'redirect', imgUrl: '' },
    { id: 5, content: '😋😍🥰', Owner: 'redirect', Location: 'redirect', imgUrl: '' },
    { id: 6, content: 'Хехе, много ясно!', Owner: 'redirect', Location: 'redirect', imgUrl: '' },
    { id: 7, content: 'Защото снощи правих кееекс!', Owner: 'redirect', Location: 'redirect', imgUrl: '' },
    { id: 8, content: 'Баси яката рецепта! Браво !', Owner: 'redirect', Location: 'redirect', imgUrl: '' },
    { id: 9, content: 'Много готина мусака', Owner: 'redirect', Location: 'redirect', imgUrl: '' },
    { id: 10, content: 'На 25/3/22 с Патюшка си направихме и ….следва продължение!', Owner: 'redirect', Location: 'redirect', imgUrl: '' },
    { id: 11, content: '… E,беше ФАМОЗНО!!! 🥰😍😚🤩😃😋', Owner: 'redirect', Location: 'redirect', imgUrl: '' },
];

export default function Comments() {
    const [refreshData, setRefreshData] = useState(false);

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
            data={DATA}
            renderItem={({ item }) => (
                <Table
                    name={summary(item.content)}
                    pictureType={'avatar'}
                    pictureSource={item.imgUrl}
                    data={item}
                    isEven={item.id % 2 === 0}
                    isFirst={DATA[0].id === item.id}
                    isLast={DATA[DATA.length - 1].id === item.id}
                    blockAction={'user'}
                    removeAction={'comment'}
                />
            )}
        />
    );
}