import { Container, TipoText, Tipo, IconView, ValorText } from "./style";
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback, Alert } from "react-native";

export default function HistoricList({ data, deleteItem }) {

    function handleDeleteItem() {
        Alert.alert('Atenção', 'Você tem certeza que deseja deletar esse registro?',
        [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Continuar',
                onPress: () => deleteItem(data.id)
            }
        ])
    }

    return (
        <TouchableWithoutFeedback onLongPress={handleDeleteItem}>
            <Container>
                <Tipo>
                    <IconView tipo={data.type}>
                        <AntDesign name={data.type == 'despesa' ? "arrowdown" : 'arrowup'} size={20} color="#FFF" />
                        <TipoText>{data.type}</TipoText>
                    </IconView>
                </Tipo>

                <ValorText>
                    R$ {Number(data.value).toFixed(2)}
                </ValorText>
            </Container>
        </TouchableWithoutFeedback>
    )
}
