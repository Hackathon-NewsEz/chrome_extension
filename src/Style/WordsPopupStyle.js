import styled from 'styled-components'

export const RootLayout = styled.div`
    width: 400px;
    border-radius: 10px;
    background: #F1F3F5;

    display: flex;
    flex-direction: column;
    align-items: center;

    .header{
        color: #000;
        font-family: Noto Sans KR;
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        width: 90%;
        margin: 0.8rem 0;
    }

    .line{
        width: 100%;
        height: 1px;
        background: #343A40;
    }

    .graytext{
        color: #495057;
        font-family: Noto Sans KR;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        width: 90%;
    }
`

export const InputContainer = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    margin: 0.3rem;
    width: 95%;
    .inputbutton{
        width: 20%;
        height: 40px;
        background: #CED4DA;
        color: #495057;
        font-family: Noto Sans KR;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        border-radius: 10px;
        border: 0px;
        margin-left: 0.3rem;


    }

`
export const StyledInput = styled.input`
    width: 80%;
    height: 38px;
    background: #FFF;
    border-radius: 10px;
    border: 0px;

    font-family: Noto Sans KR;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    padding-left: 5px;

`

export const StyledLi = styled.li`
    width: 300px;
    color: #495057;

    font-family: Noto Sans KR;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`

export const SubmitButton = styled.button`
    width: 95%;
    height: 40px;
    background: #CED4DA;
    color: #495057;
    
    font-family: Noto Sans KR;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border-radius: 10px;
    border: 0px;
    margin: 0.3rem;
`