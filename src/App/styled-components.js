import styled from "styled-components";

const colorList = {
    lavenderGray: "#7E6C6C",
    coral: "#F87575",
    melon: "#FFA9A3",
    lightBlue: "#B9E6FF",
    cornflower: "#5c95ff",
}

const Separator = styled.div`
  margin: 5px 0;
`

const AppHeader = styled.header`
  background-color: ${colorList.coral};
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const InstructionWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const ListHeader = styled.h4`
  color: ${colorList.coral};
`;

const ChecklistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`;

const ModalWrapper = styled.div`
    margin: 50px 30% auto 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    flex-direction: column;
    padding-bottom: 10px;
    border: 5px solid ${colorList.lightBlue};
`;

const PeachButton = styled.button`
  max-width: 100;
  background-color: ${colorList.melon};
  color: white;
  border: 0px;
  border-radius: 5px;
`;

const BlueButton = styled.button`
    background-color: ${colorList.cornflower};
    color: white;
    border-radius: 5px;
    border: 0px;
`;

const ChoreName = styled.p`
    color: ${colorList.cornflower};
    padding-right: 5px;
`;

export {colorList, ChoreName, AppHeader, InstructionWrapper, ListHeader, ChecklistWrapper, ModalWrapper, PeachButton, BlueButton, Separator };
