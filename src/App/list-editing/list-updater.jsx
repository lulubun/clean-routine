import React, { useState } from "react";
import {
  List,
  ListItem,
  Modal,
} from "@mui/material";
import EditingBox from "./edit-box";
import EditButton from "./edit-button";
import { ModalWrapper, PeachButton, BlueButton, ChoreName, ListSection, ListSectionTitle } from "../styled-components";

const updateList = (listType, update) => dispatch({ type: "UPDATE_LIST", listType, update });


const IteratedChoreList = ({ choreKind, choreSet, setChores, editingChore, setEditingChore }) => {
  return (
    <ListSection>
      <ListSectionTitle>
      {choreKind}
      </ListSectionTitle>
      <List>
        {choreSet &&
          choreSet.map((w, i) => {
            const isBeingEdited = editingChore === w;
            return (
              <ListItem key={`$Chores-${w}`}>
                {isBeingEdited ?
                  (<EditingBox
                    chore={w}
                    choreKind={choreKind}
                    setChores={updateList}
                  />) : (<ChoreName>{w}</ChoreName>)}
                {!isBeingEdited && <EditButton onClick={() => setEditingChore(w)}></EditButton>}
              </ListItem>
            )
          })}
      </List>
    </ListSection>
  );
};

const ListUpdateModal = (props) => {
  const { label, isOpen, setModalOpen, chores } = props;  
  const [editingChore, setEditingChore] = useState('')
  const handleModalClose = () => {
    setModalOpen(false);
    setEditingChore('');
  }

  return (
      <Modal open={isOpen} onClose={handleModalClose}>
        <ModalWrapper>
          <h4>Chores</h4>
          <EditingBox
            setChores={updateList}
          />
          {chores && Object.keys(chores).map((k) => {
            return (
              <IteratedChoreList
                editingChore={editingChore}
                setEditingChore={setEditingChore}
                key={`chores-${k}`}
                choreKind={k}
                choreSet={chores[k]}
                setChores={(updated) => updateList(k, updated)}
              />
            )
          })}
          <BlueButton
            onClick={handleModalClose}
          >
            Close
          </BlueButton>
        </ModalWrapper>
      </Modal>
  );
};
export default ListUpdateModal;
