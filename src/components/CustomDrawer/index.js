import { DrawerItemList, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useContext } from "react";
import { View, Image, Text } from "react-native";
import { AuthContext } from "../../contexts/auth";

export default function CustomDrawer(props) {

    const { user, signOut } = useContext(AuthContext)

    return(
        <DrawerContentScrollView {...props}>
            <View style={{alignItems: "center", justifyContent: "center", marginTop: 25}}>
                <Image resizeMode="contain" style={{ width: 90, height: 90 }} source={require('../../../assets/Logo.png')}/>

                <Text style={{fontSize: 18, marginTop: 14}}>Bem vindo(a)</Text>

                <Text numberOfLines={1} style={{ fontSize: 17, fontWeight: "bold", marginBottom: 14, paddingHorizontal: 20, }}>
                    {user && user.name}
                </Text>
            </View>
            <DrawerItemList {...props}/>

            <DrawerItem {...props} label={"Sair"} onPress={() => signOut()}/>
        </DrawerContentScrollView>
    )
}
