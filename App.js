import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/ui/IconButton";
import { Colors } from "./constants/colors";
import { AuthContext } from "./store/auth-context";
import AuthContextProvider from "./store/auth-context";
import LoaderScreen from "./screens/LoaderScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignupScreen from "./screens/SignupScreen";
import SigninScreen from "./screens/SigninScreen";
import ForgetPassword from "./screens/ForgetPassword";

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={Colors.primary500}
        barStyle="dark-content"
      />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
          animation: "none",
        }}
      >
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({ navigation }) => ({
            title: "Your Fav Places",
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="plus"
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate("AddPlace")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddPlace"
          component={AddPlace}
          options={{
            title: "Add a new place",
          }}
        />
      </Stack.Navigator>
    </>
  );
};

const AuthStack = () => {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={Colors.gray700}
        barStyle="light-content"
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
          animation: "none",
        }}
      >
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="signin" component={SigninScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      </Stack.Navigator>
    </>
  );
};

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

const Root = () => {
  const [isTryingLogin, SetIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      SetIsTryingLogin(false);
    };
    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <LoaderScreen />;
  }

  return <Navigation />;
};

export default function App() {
  return (
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
}
