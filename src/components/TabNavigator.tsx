import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { colors } from "../theme";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  // Check if current route is a chat route
  const currentRoute = state.routes[state.index];
  const isChatRoute = currentRoute.name.includes("chat");

  // Don't render the tab bar at all if we're in a chat route
  if (isChatRoute) {
    return null;
  }

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const { tabBarIcon } = options;

        const isFocused = state.index === index;

        if (label === "Chat") return null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            {typeof tabBarIcon === "function"
              ? tabBarIcon({
                  color: isFocused ? colors.primary : colors.primaryBlack,
                  focused: isFocused,
                  size: 22,
                })
              : null}
            {/* <Text
              style={{
                color: isFocused ? colors.primary : colors.primaryBlack,
              }}
            >
              {label}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 120,
    backgroundColor: colors.primaryWhite,
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 8,
    shadowColor: colors.primaryBlack,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
});
