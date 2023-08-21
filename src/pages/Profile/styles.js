import styled from "styled-components/native";


export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #f0f4ff;
    align-items: center;
`

export const Message = styled.Text`
font-size: 18px;
margin-top: 24px;
font-weight: bold;
`

export const Name = styled.Text`
font-size: 24px;
margin-bottom: 24px;
margin-top: 8px;
padding: 0 14px;
color: #121212;
`


export const NewLink = styled.TouchableOpacity`
    background-color: #3b3dbf;
    width: 90%;
    height: 45px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    margin-bottom: 14px;
`


export const NewText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`


export const LogoutButton = styled.TouchableOpacity`
    width: 90%;
    height: 45px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border-color: #c62c36;
    border-width: 1px;
`


export const LogoutText = styled.Text`
    color:  #c62c36;
    font-size: 18px;
    font-weight: bold;
`


