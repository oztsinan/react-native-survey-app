import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Routes } from "./Routes";
import { BottomTabHomeScreen } from "@/screens/BottomTab/Home/BottomTabHomeScreen";
import { BottomTabSurveyScreen } from "@/screens/BottomTab/Survey/BottomTabSurveyScreen";
import { BottomTabProfileScreen } from "@/screens/BottomTab/Profile/BottomTabProfileScreen";
import { BottomTabParams } from "./RootStackParams";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const BottomTab = () => {
  const Tab = createBottomTabNavigator<BottomTabParams>();
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          width: 300,
          margin: "auto",
          paddingBottom: 0,
          marginBottom: bottom ?? 25,
          height: 65,
          borderRadius: 100,
          backgroundColor: "black",
        },
        tabBarLabelStyle: {
          fontWeight: "600",
          color: "white",
          paddingBottom: 0,
          padding: 0,
          margin: 0,
        },
        tabBarItemStyle: {
          height: 50,
          margin: "auto",
        },
      }}
    >
      <Tab.Screen
        name={Routes.BOTTOM_TAB_SURVEY}
        component={BottomTabSurveyScreen}
        options={{
          headerTitle: "Survey",
          tabBarLabel: "Survey",
          tabBarIcon: ({ focused }) => (
            <SimpleLineIcons name="graph" size={25} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.BOTTOM_TAB_HOME}
        component={BottomTabHomeScreen}
        options={{
          tabBarLabelStyle: {
            display: "none",
          },
          tabBarIcon: ({ focused }) => (
            <Entypo name="home" size={25} color="white" />
          ),
          tabBarButton: (props) => {
            return (
              <TouchableOpacity
                className="bg-red-500 size-14 rounded-full items-center justify-center -top-7"
                onPress={props.onPress}
              >
                {props.children}
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name={Routes.BOTTOM_TAB_PROFILE}
        component={BottomTabProfileScreen}
        options={{
          headerTitle: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="account" size={25} color="white" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
