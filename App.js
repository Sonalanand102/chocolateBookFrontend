import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from './screens/Home';
import KhataList from './screens/KhataList';
import Orders from './screens/Orders';
import FirstPage from './screens/FirstPage';
import SecondPage from './screens/SecondPage';
import ThirdPage from './screens/ThirdPage';

// Import Custom Sidebar
import CustomSidebarMenu from './CustomSidebarMenu';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: "#ffffff",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#fff",
        overlayColor: "#FFF7E4",
        headerStyle: {
          backgroundColor : "#2E1503",
        },
        itemStyle: {marginVertical: 5},
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="AddToKhata"
        options={{drawerLabel: 'Add to Khata', title: 'Add to Khata'}}
        component={Home}
      />
      <Drawer.Screen
        name="GoToKhata"
        options={{drawerLabel: 'Go to Khata', title: 'Go to Khata'}}
        component={KhataList}
      />
      <Drawer.Screen
        name="ChocolatesList"
        options={{drawerLabel: 'Chocolates', title: 'Chocolates'}}
        component={SecondPage}
      />
      <Drawer.Screen
        name="AddChocolates"
        options={{drawerLabel: 'Add Chocolates', title: 'Add Chocolates'}}
        component={ThirdPage}
      />
      <Drawer.Screen
        name="Orders"
        options={{drawerLabel: 'Orders', title: 'Orders'}}
        component={Orders}
      />
    </Drawer.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
