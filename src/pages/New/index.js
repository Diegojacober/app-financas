import { Backgorund, Input, SubmitButton, SubmitText } from "./style";
import { SafeAreaView, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import format from "date-fns/format";

import Header from "../../components/Header";
import ResgisterTypes from "../../components/ResgisterTypes";
import { useState } from "react";
import api from '../../services/api';
import { useNavigation } from "@react-navigation/native";

export default function New() {

    const navigator = useNavigation()

    const [labelInput, setLabelInput] = useState()
    const [valueInput, setValueInput] = useState()
    const [type, setType] = useState("receita")

    const handleSubmit = () => {
        Keyboard.dismiss()

        if (isNaN(parseFloat(valueInput)) || type == null) {
            alert('Preencha todos os campos')
            return;
        }

        Alert.alert(
            'Confirmando dados',
            `Tipo: ${type} - Valor ${parseFloat(valueInput)}`,
            [
                {
                    text: 'Cancelar',
                    style: "cancel",
                },
                {
                    text: 'Continuar',
                    onPress: () => handleAdd()
                }
            ]
        )

    }

    async function handleAdd() {
        Keyboard.dismiss()
        const response = await api.post('/receive', {
            description: labelInput,
            value: Number(valueInput),
            type,
            date: format(new Date(), "dd/MM/yyyy"), 
        })

        setLabelInput('')
        setValueInput('')
        setType('receita')
        navigator.navigate('Home')
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Backgorund>
                <Header title={"Registrando"} />

                <SafeAreaView style={{ marginTop: 14, alignItems: "center" }}>
                    <Input placeholder="Descrição desse registro" value={labelInput} onChangeText={setLabelInput} />

                    <Input placeholder="Valor do registro" keyboardType="numeric" value={valueInput} onChangeText={setValueInput} />

                    <ResgisterTypes type={type} sendTypeChanged={(item) => setType(item)} />

                    <SubmitButton onPress={handleSubmit}>
                        <SubmitText> Registrar </SubmitText>
                    </SubmitButton>
                </SafeAreaView>
            </Backgorund>
        </TouchableWithoutFeedback>
    )
}
