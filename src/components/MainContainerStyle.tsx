import styled from "styled-components";

export const StyledMainContainer = styled.div`
    border:5px dashed gray;
    width:60%;
    margin:auto;
    border-radius:10px;
    padding: 5px
`
export const StyledMainHeading = styled.div`
    text-align:center
`
export const StyledFormContainer = styled.div`
   text-align:center 
`
export const StyledForm = styled.div`
    width:100%;
    text-align:center;
`
export const StyledInput = styled.input`
    border-top:none;
    border-left:none;
    border-right:none;
    background-color:#EBEFFB;
    padding:10px;
    margin:10px;
    border-bottom:5px dashed gray;
`
export const StyledButton = styled.button`
    background-color:#486688;
    padding:12px;
    border-radius:15px;
    color:#ffffff;
`
export const StyledMainInfoDisplay = styled.div`
    background-color:#F4F2F3;
    width:75%;
    margin:10px auto 10px ;
    padding: 10px;
    border: 1px solid gray;
    border-radius:10px;
`

export const StyledLocationInfo = styled.span`
    font-size:20pt;
    color:#4B4245;
`

export const StyledTimeInfo = styled.span`
    font-size:12pt;
    color:#A5A3A4;
`

export const StyledTempInfo = styled.span`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    gap:10px;

`

export const StyledTempNumber = styled.p`
    font-size:42pt;
    transform:scale(0.75,1);
    color:black;

`

export const StyledCelSymbol = styled.span`
    font-size:42pt;
    transform:scale(0.75,1);
`
export const StyledAdditionalInfo = styled.div`
    width:75%;
    margin:10px auto 10px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
`
export const StyledAdditionalInfoElement = styled.div`
    display:flex;
    padding:10px;
    border-bottom:5px dashed gray;
    justify-content:space-between;
    width:100%;
    align-item:center;
`
export const StyledAdditionalInfoColumns = styled.div`
    width:40%;
`