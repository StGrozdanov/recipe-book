import { View } from 'react-native';
import { globalStyles } from './AppStyleSheet';
import Login from './components/Login/Login';

export default function App() {
  return (
    <View style={globalStyles.container}>
      <Login />
    </View>
  );
}