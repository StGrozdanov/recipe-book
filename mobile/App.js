import registerNNPushToken from 'native-notify';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Panel from './components/ApplicationPanel/Panel';
import Users from './components/Users/Users';
import Recipes from './components/Recipes/Recipes';
import Comments from './components/Comments/Comments';
import Settings from './components/Settings/Settings';
import UserProfile from './components/UserProfile/UserProfile';
import Notifications from './components/Notifications/Notifications';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import { SearchProvider } from './contexts/SearchContext';
import {NOTIFY_APP_ID, NOTIFY_APP_TOKEN} from "@env"

const Stack = createNativeStackNavigator();

export default function App() {
  registerNNPushToken(NOTIFY_APP_ID, NOTIFY_APP_TOKEN);
  return (
    <AuthProvider>
      <ThemeProvider>
        <SearchProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>

              <Stack.Screen name='Home' component={LoadingScreen} />
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name="Dashboard">
                {(props) => <Panel {...props} content={<Dashboard />} />}
              </Stack.Screen>
              <Stack.Screen name="Users" initialParams={{ itemId: 0 }}>
                {(props) => <Panel {...props} content={<Users />} />}
              </Stack.Screen>
              <Stack.Screen name="Profile" initialParams={{ itemId: 0 }}>
                {(props) => <Panel {...props} content={<UserProfile />} />}
              </Stack.Screen>
              <Stack.Screen name="Recipes" initialParams={{ itemId: 0 }}>
                {(props) => <Panel {...props} content={<Recipes />} />}
              </Stack.Screen>
              <Stack.Screen name="Comments" initialParams={{ itemId: 0 }}>
                {(props) => <Panel {...props} content={<Comments />} />}
              </Stack.Screen>
              <Stack.Screen name="Settings">
                {(props) => <Panel {...props} content={<Settings />} />}
              </Stack.Screen>
              <Stack.Screen name="Notifications">
                {(props) => <Panel {...props} content={<Notifications />} />}
              </Stack.Screen>

            </Stack.Navigator>
          </NavigationContainer>
        </SearchProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}