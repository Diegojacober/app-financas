import { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { Background, ListBalance } from './styles';
import Header from "../../components/Header";

import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useIsFocused } from "@react-navigation/native";
import BalanceItem from "../../components/BalanceItem";


export default function Home() {

    const { user, signOut } = useContext(AuthContext);

    const navigation = useNavigation();

    const [listBalance, setListBalance] = useState([]);

    const [dateMovements, setDateMovements] = useState(new Date())

    const isFocused = useIsFocused();

    useEffect(() => {
        let isActive = true;

        async function getMovements() {
            dateFormated = format(dateMovements, "dd/MM/yyyy")

            const balance = await api.get('/balance', {
                params: {
                    date: dateFormated
                }
            })

            if (isActive) {
                setListBalance(balance.data)
            }
        }

        getMovements()

        //component did unmount
        return () => {
            isActive = false
        }
        
    }, [isFocused])

    

    return(
        <Background>
            <Header title={'Minhas movimentações'}/>

            <ListBalance data={listBalance} horizontal={true} showsHorizontalScrollIndicator={false} keyExtractor={i => i.tag}
            renderItem={({ item }) => (<BalanceItem data={item}/>)}/>
        </Background>
    )
}
