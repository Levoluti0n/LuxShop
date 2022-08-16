import React from "react";
import { Platform, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcon from "react-native-vector-icons/Ionicons";
import MComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
IonIcon.loadFont();
MComIcon.loadFont();

import PHistoryScreen from "../screens/PHistory/PHistoryScreen";
import AddressScreen from "../screens/Address/AddressScrees";
import defColors from "../helpers/defColors";
import Shop from "../screens/Shop/Shop";
import scale from "../helpers/scale";
const Tab = createBottomTabNavigator();

const TabIcons = [
    {
        icon: MComIcon,
        active: 'shopping',
        inActive: 'shopping-outline',
    },
    {
        icon: MComIcon,
        active: 'map-marker',
        inActive: 'map-marker-outline',
    },
    {
        icon: IonIcon,
        active: 'ios-stopwatch-sharp',
        inActive: 'ios-stopwatch-outline',
    },
];

const TabBar = ({ state, descriptors, navigation }) => {
    const { colors } = useTheme();
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={[styles.tab, { backgroundColor: colors.background }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
                let Icon = TabIcons[index].icon;
                return (
                    <TouchableOpacity
                        onPress={onPress}
                        activeOpacity={0.8}
                        key={index.toString()}
                        onLongPress={onLongPress}
                        accessibilityRole='button'
                        testID={options.tabBarTestID}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        style={[styles.tabPressSide,]}>
                        <View style={[index === 1 && styles.cartBox, { backgroundColor: index === 1 ? isFocused ? defColors.greenBack : defColors.gray : 'transparent' }]}>
                            <Icon
                                size={index !== 1 ? 27 : 37}
                                color={isFocused ? index == 1 ? defColors.white : defColors.greenBack : index == 1 ? defColors.white : defColors.gray}
                                name={
                                    isFocused ? TabIcons[index].active : TabIcons[index].inActive
                                }
                            />
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const TabNavigator = () => {
    const { dark, colors } = useTheme();

    return (
        <>
            <StatusBar
                barStyle={dark ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />
            <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <TabBar {...props} />}>
                <Tab.Screen name={'Shop'} component={Shop} />
                <Tab.Screen name={'Addresses'} component={AddressScreen} />
                <Tab.Screen name={'PHistory'} component={PHistoryScreen} />
            </Tab.Navigator>
        </>
    );
};



const styles = StyleSheet.create({
    tab: {
        flexDirection: 'row',
        paddingTop: 17 / scale,
        borderColor: defColors.gray,
        borderTopWidth: 0.3 / scale,
        justifyContent: 'space-around',
        paddingBottom: (Platform.OS === 'ios' ? 30 : 17) / scale,
    },
    tabPressSide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartBox: {
        padding: 17 / scale,
        marginTop: -45 / scale,
        borderRadius: 72 / 2,
        borderColor: defColors.gray,
        borderTopWidth: 0.3 / scale,
    }
});

export default TabNavigator;