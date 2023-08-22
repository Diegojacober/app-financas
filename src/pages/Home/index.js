import { useContext } from "react";
import { View, Modal, TouchableOpacity } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { Entypo } from '@expo/vector-icons';

import { Background, ListBalance, Area, Title, List } from './styles';
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useIsFocused } from "@react-navigation/native";
import BalanceItem from "../../components/BalanceItem";
import HistoricList from "../../components/HistoricList";
import CalendarModal from "../../components/CalendarModal";


export default function Home() {

    const { user, signOut } = useContext(AuthContext);

    const navigation = useNavigation();

    const [listBalance, setListBalance] = useState([]);

    const [dateMovements, setDateMovements] = useState(new Date())

    const [movements, setMovements] = useState([])

    const [modalVisible, setModalVisible] = useState(false)
    
    const isFocused = useIsFocused();

    useEffect(() => {
        let isActive = true;

        async function getMovements() {
            let date = new Date(dateMovements)
            let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
            let dateFormated = format(onlyDate,  "dd/MM/yyyy")

            const receives = await api.get('/receives', {
                params: {
                    date: dateFormated,
                }
            })

            const balance = await api.get('/balance', {
                params: {
                    date: dateFormated
                }
            })

            if (isActive) {
                setMovements(receives.data)
                setListBalance(balance.data)
            }
        }

        getMovements()

        //component did unmount
        return () => {
            isActive = false
        }

    }, [isFocused, dateMovements])


    async function handelDelete(id) {
        await api.delete('/receives/delete', {
            params: {
                item_id: id
            }
        })
        .then(() => {
            setDateMovements(new Date())
        })
        .catch(e => console.log(e))
    }

    async function filterDateMovements(dateSelected) {
        setDateMovements(dateSelected)
    }



    return (
        <Background>
            <Header title={'Minhas movimentações'} />

            <ListBalance data={listBalance} horizontal={true} showsHorizontalScrollIndicator={false} keyExtractor={i => i.tag}
                renderItem={({ item }) => (<BalanceItem data={item} />)} />

            <Area>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <Entypo name="calendar" size={30} color="#121212" />
                </TouchableOpacity>
                <Title>Ultimas movimentações</Title>
            </Area>

            <List data={movements} keyExtractor={item => item.id} 
            renderItem={({ item }) => <HistoricList data={item} deleteItem={handelDelete}/>}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:20}}
            />

            <Modal 
            visible={modalVisible}
            animationType="fade"
            transparent={true}
            >
                <CalendarModal setVisible={() => setModalVisible(false)}
                handleFilter={filterDateMovements}
                />
            </Modal>
        </Background>
    )
}
