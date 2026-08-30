import React, { useReducer, useState } from "react";
import {
  AppHeader,
  ListHeader,
  colorList,
  PeachButton,
  Separator,
  BlueButton,
  InstructionWrapper,
} from "./styled-components";
import ListUpdateModal from "./list-editing/list-updater";
import Instructions from "./instructions";
import CheckItems from "./check-item";
import './styles.css';
import { initState, reducer } from "./state";
import { Modal } from "@mui/material";


function App() {
  const [state, dispatch] = useReducer(reducer, undefined, initState);
  const { data, done, unDone } = state;
  const { daily, weekly, longer } = data.chores;
  const [modalOpen, setModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const changeCheck = (chore, wasChecked) => dispatch({ type: "CHANGE_CHECK", chore, wasChecked });

  return (
    <div>
      <AppHeader>
        <h2>Clean Routine</h2>
        <InstructionWrapper>
          <BlueButton
              onClick={() => setInfoModalOpen(true)}
            >
              How do I use this app?
            </BlueButton>
        </InstructionWrapper>
      </AppHeader>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
        }}
      >
        <Modal open={infoModalOpen} onClose={() => setInfoModalOpen(false)}>
          <Instructions closeModal={() => setInfoModalOpen(false)} isOpen={infoModalOpen}/>
          </Modal>
        <ListHeader>Today</ListHeader>
        <CheckItems list={unDone} isChecked={false} changeCheck={changeCheck}/>
        <CheckItems list={done} isChecked={true} changeCheck={changeCheck}/>
        <PeachButton
          style={{
            maxWidth: 100,
            backgroundColor: colorList.melon,
            color: "white",
          }}
          onClick={() => dispatch({ type: "REFRESH" })}
        >
          Refresh
        </PeachButton>
        <Separator>
        <PeachButton onClick={() => setModalOpen(true)}>
          Edit Chores
        </PeachButton>
        <ListUpdateModal
          isOpen={modalOpen}
          setModalOpen={setModalOpen}
          dispatch={dispatch}
          chores={data.chores}
        />
        </Separator>
      </div>
    </div>
  );
}

export default App;
