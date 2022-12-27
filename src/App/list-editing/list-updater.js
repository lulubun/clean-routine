import React, { useState } from "react";
import {
  List,
  ListItem,
  Modal,
} from "@material-ui/core";
import EditingBox from "./edit-box";
import { ModalWrapper, PeachButton, BlueButton, ChoreName} from "../styled-components";

const ListUpdateModal = (props) => {
  const { label, isOpen, setModalOpen, chores, setChores } = props;
  const [editingChore, seteditingChore] = useState('')
  return (
    <div>
      <PeachButton
          onClick={() => setModalOpen(true)}
          >
          {label}
        </PeachButton>
    <Modal open={isOpen} onBackdropClick={() => setModalOpen(false)}>
      <ModalWrapper>
        <h4>{label}</h4>
        <List>
          {chores &&
            chores.map((w, i) => {
              const isBeingEdited = editingChore === w;
              return (
              <ListItem key={`${label}-${w}`}>
                {isBeingEdited ?
                (<EditingBox
                  allChores={chores}
                  chore={w}
                  setChores={setChores}
                  idx={i}
                />) : (<ChoreName>{w}</ChoreName>)}
                {!isBeingEdited && <PeachButton onClick={() => seteditingChore(w)}>Edit</PeachButton>}
              </ListItem>
            )})}
          <ListItem>
            <EditingBox
              allChores={chores}
              placeholder="Add a new chore"
              setChores={setChores}
              idx={chores.length}
            />
          </ListItem>
        </List>
        <BlueButton
          onClick={() => {
            setModalOpen(false);
          }}
        >
          Save
        </BlueButton>
      </ModalWrapper>
    </Modal>
    </div>
  );
};
export default ListUpdateModal;
