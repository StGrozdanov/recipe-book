import { View, ScrollView } from "react-native";
import { dashboardStyles } from "./DashboardStyleSheet";
import { getRecepiesCount } from "../../services/recipeService";
import { getTotalCommentsCount } from "../../services/commentService";
import { getTotalUsersCount } from "../../services/userService";
import { getVisitationsToday } from "../../services/visitationsService";
import { findTheMostActiveUser } from "../../services/recipeService";
import { useEffect, useState } from "react";
import StatsCard from "../StatsCard/StatsCard";
import Chart from "../StatisticChart/Chart";
import UserCard from "../UserCard/UserCard";

const chartData = {
    labels: ["Март", "Април", "Май", "Юни", "Юли", "Август"],
    datasets: [
        {
            data: [
                1340, 1200, 500, 1700, 1500, 2100,
            ],
        }
    ],
}

export default function Dashboard() {
    const [totalRecipes, setTotalRecipes] = useState(null);
    const [totalComments, setTotalComments] = useState(null);
    const [totalUsers, setTotalUsers] = useState(null);
    const [visitationsToday, setVisitationsToday] = useState(null);
    const [mostActiveUser, setMostActiveUser] = useState({});

    const totalRecipesData = getRecepiesCount();
    const totalCommentsData = getTotalCommentsCount();
    const totalUsersData = getTotalUsersCount();
    const visitationsTodayData = getVisitationsToday();
    const mostActiveUserData = findTheMostActiveUser();

    useEffect(() => {
        Promise.all([
            totalRecipesData,
            totalCommentsData,
            totalUsersData,
            visitationsTodayData,
            mostActiveUserData,
        ]).then(response => {
            const [totalRecipes, totalComments, totalUsers, visitationsToday, mostActiveUser] = response;
            setTotalRecipes(totalRecipes.recipesCount);
            setTotalComments(totalComments.count);
            setTotalUsers(totalUsers.usersCount);
            setVisitationsToday(visitationsToday.visitationsCount);
            setMostActiveUser(mostActiveUser);
        }).catch(err => console.log(err.message));
    }, [totalRecipes, totalComments, totalUsers, visitationsToday, mostActiveUser.username]);

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={dashboardStyles.statsCardContainer}>
                <StatsCard text={"ПУБЛИКАЦИИ"} value={totalRecipes} />
                <StatsCard text={"ПОТРЕБИТЕЛИ"} value={totalUsers} />
                <StatsCard text={"КОМЕНТАРИ"} value={totalComments} />
                <StatsCard text={"ПОСЕЩЕНИЯТА ДНЕС"} value={visitationsToday} />
            </View>
            <Chart title={"Посещения за последните 6 месеца"} data={chartData} />
            <UserCard {...mostActiveUser} />
        </ScrollView>
    );
}