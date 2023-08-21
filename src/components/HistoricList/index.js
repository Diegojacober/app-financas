import { Container, TipoText, Tipo, IconView, ValorText } from "./style";
import { AntDesign } from '@expo/vector-icons';

export default function HistoricList({ data }) {
    return(
        <Container>
            <Tipo>
                <IconView tipo={data.type}>
                    <AntDesign name={data.type == 'despesa' ? "arrowdown" : 'arrowup'} size={20} color="#FFF" />
                    <TipoText>{data.type}</TipoText>
                </IconView>
            </Tipo>

            <ValorText>
                R$ {data.value}
            </ValorText>
        </Container>
    )
}
