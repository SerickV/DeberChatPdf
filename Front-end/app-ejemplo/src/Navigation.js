import React from "react";
import {Text, View} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Menu from "./Components/home/Menu";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ListComponent from "./Components/list/List";
import Userform from "./Components/list/Userform";
import Openia from "./Components/OpenIA/Openia";
import Pdf from "./Components/ChatPDF/Pdf";

const Tab = createBottomTabNavigator()

const navigation = () => {
    return(
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={Menu} options={{
                tabBarLabel: "Home",
            }}>
            </Tab.Screen>
            <Tab.Screen name="List" component={ListComponent} options={{
                tabBarLabel: "Listado",
            }}>
            </Tab.Screen>
            <Tab.Screen name="Userform" component={Userform} options={{
                tabBarLabel: "Userform",
            }}>
            </Tab.Screen>
            <Tab.Screen name="Openia" component={Openia} options={{
                tabBarLabel: "Openia",
            }}>
            </Tab.Screen>
            <Tab.Screen name="Pdf" component={Pdf} options={{
                tabBarLabel: "Pdf",
            }}>
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default navigation