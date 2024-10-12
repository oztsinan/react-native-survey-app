import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Routes } from "./Routes";
import { BottomTabHomeScreen } from "@/screens/BottomTab/Home/BottomTabHomeScreen";
import { BottomTabSurveyScreen } from "@/screens/BottomTab/Survey/BottomTabSurveyScreen";
import { BottomTabProfileScreen } from "@/screens/BottomTab/Profile/BottomTabProfileScreen";
import { BottomTabParams } from "./RootStackParams";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import { useTheme } from "@/hook/useTheme";
import { cn } from "@/utils/cn";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";

const BottomTab = () => {
  const Tab = createBottomTabNavigator<BottomTabParams>();
  const { bottom } = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();

  const screenWidth = Dimensions.get("window").width;
  const bottomTabBackgroundColor =
    colorScheme == "light" ? "#1d1d1b" : "#1E201E";

  return (
    <Tab.Navigator
      initialRouteName={Routes.BOTTOM_TAB_HOME}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          width: 300,
          position: "absolute",
          left: screenWidth / 2 - 150,
          borderTopWidth: 0,
          paddingBottom: 0,
          marginBottom: bottom ?? 25,
          height: 65,
          borderRadius: 100,
          backgroundColor: bottomTabBackgroundColor,
        },
        tabBarItemStyle: {
          height: 50,
          margin: "auto",
        },
        tabBarActiveTintColor: "#9593FF",
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name={Routes.BOTTOM_TAB_SURVEY}
        component={BottomTabSurveyScreen}
        options={{
          title: "Survey",
          tabBarLabel: (props) => <TabBarLabel {...props} />,
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="graph" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.BOTTOM_TAB_HOME}
        component={BottomTabHomeScreen}
        options={{
          tabBarIcon: (props) => <Entypo name="home" size={25} color="white" />,
          tabBarButton: (props) => <HomeTabBarButton {...props} />,
          tabBarLabelStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name={Routes.BOTTOM_TAB_PROFILE}
        component={BottomTabProfileScreen}
        options={{
          title: "Profile",
          tabBarLabel: (props) => <TabBarLabel {...props} />,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account"
              size={25}
              color={focused ? "#9593FF" : "white"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const TabBarLabel = ({
  color,
  children,
}: {
  color: string;
  children: string;
}) => {
  return (
    <Text
      className={cn("text-xs font-semibold font-comfortaa")}
      style={{
        color: color,
      }}
    >
      {children}
    </Text>
  );
};

const HomeTabBarButton = ({
  accessibilityState,
  children,
  onPress,
}: BottomTabBarButtonProps) => {
  //ToDo : to be refactored
  const isFocused = accessibilityState?.selected;
  const { colors } = useTheme();
  const { colorScheme } = useColorScheme();
  const bottomTabBackgroundColor =
    colorScheme == "light" ? "#1d1d1b" : "#1E201E";

  return (
    <TouchableOpacity
      style={{
        backgroundColor: isFocused ? colors?.primary : bottomTabBackgroundColor,
      }}
      activeOpacity={1}
      className="size-14 rounded-full items-center justify-center -top-7"
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default BottomTab;
