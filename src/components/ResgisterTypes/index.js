import { useState } from "react";
import { RegisterContainer, RegisterTypeButton, RegisterLabel } from "./styled";
import { AntDesign } from '@expo/vector-icons';


export default function ResgisterTypes({ type, sendTypeChanged }) {
    const [typeChecked, setTypeChecked] = useState(type)

    function changeType(name) {
        if (name === 'receita') {
            setTypeChecked('receita')
            sendTypeChanged('receita')
        } else {
            setTypeChecked('despesa')
            sendTypeChanged('despesa')
        }
    }
    
    return (
        <RegisterContainer>
            <RegisterTypeButton checked={ typeChecked === 'receita' ? true : false } onPress={() => changeType('receita')}>
                <AntDesign name="arrowup" size={25} color="#121212" />
                <RegisterLabel>Receita</RegisterLabel>
            </RegisterTypeButton>

            <RegisterTypeButton checked={ typeChecked === 'despesa' ? true : false } onPress={() => changeType('despesa')}>
                <AntDesign name="arrowdown" size={25} color="#121212" />
                <RegisterLabel>Despesa</RegisterLabel>
            </RegisterTypeButton>
        </RegisterContainer>
    )
}
