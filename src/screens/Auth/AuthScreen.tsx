import { Assets } from "@/constants/Assets";
import { Image } from "expo-image";
import { StyleSheet, useWindowDimensions } from "react-native";
import { BlurViewContainer } from "./components/BlurViewContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthLoginView } from "./AuthLoginView";
import { AuthRegisterView } from "./AuthRegisterView";
import React, { useState } from "react";
import { SceneMap, TabView } from "react-native-tab-view";
import { DotsIndicator } from "./components/DotsIndicator";
import { AuthRegisterPermissionsView } from "./AuthRegisterPermissionsView";

export const AuthScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "login" },
    { key: "register" },
    {
      key: "register_permissions",
    },
  ]);
  const renderScene = SceneMap({
    login: () => <AuthLoginView setIndex={setIndex} />,
    register: () => <AuthRegisterView setIndex={setIndex} />,
    register_permissions: () => <AuthRegisterPermissionsView />,
  });

  return (
    <KeyboardAwareScrollView contentContainerClassName="flex-1 justify-end" bounces={false}>
      <Image style={styles.image} source={Assets.images.background} contentFit="cover" transition={500} />

      <BlurViewContainer>
        <TabView
          renderTabBar={() => null}
          swipeEnabled={false}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
        <DotsIndicator count={routes.length} activeIndex={index} />
      </BlurViewContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
  },
});
