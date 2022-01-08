import { AuthProvider } from "./src/context/AuthContext";
import { RegProvider } from "./src/context/RegContext";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BlockerHome from "./src/screens/BlockerHome";
import ProfileScreen from "./src/screens/ProfileScreen";
import SignupScreen from "./src/screens/SignupScreen";
import SuccessScreen from "./src/screens/SuccessScreen";
import LogoutScreen from "./src/screens/LogoutScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Inicio" component={NavigationTab} />
      <Drawer.Screen name="Mi perfil" component={ProfileScreen} />
      <Drawer.Screen name="Cerrar sesión" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

const NavigationTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={BlockerHome}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <NavigationContainer>
        <AuthProvider>
          <RegProvider>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: "white" },
              }}
            >
              <Stack.Screen name="Home" component={NavigationDrawer} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="Success" component={SuccessScreen} />
              <Stack.Screen name="Logout" component={LogoutScreen} />
            </Stack.Navigator>
          </RegProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
