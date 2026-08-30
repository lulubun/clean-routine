import React from "react";
import { Modal } from "@mui/material";
import { PeachButton, ChoreName, ModalWrapper } from "./styled-components";

const Instructions = (props) => {
  const { closeModal, isOpen } = props;
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <ModalWrapper>
        <ChoreName>This is a daily chore checklist</ChoreName>
        <PeachButton onClick={closeModal}>Done</PeachButton>
      </ModalWrapper>
    </Modal>
  );
};

export default Instructions;
