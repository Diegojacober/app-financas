import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../pages/Home";

const AppDrawer = createDrawerNavigator()

export function AppRoutes() {
    return(
        <AppDrawer.Navigator>
            <AppDrawer.Screen name="Home" component={Home} 
            options={{
                drawerActiveTintColor: '#F00',
            }}/>
        </AppDrawer.Navigator>
    )
}
