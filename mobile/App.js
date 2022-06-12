import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Login} />
        <Stack.Screen name='Dashboard' component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}