import React, { useState } from "react";
import mockData from "../mock-data/mock-db.json";
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

function App() {
  const [data, setData] = useState(mockData);
  const { weeklyCount, longerCount, lastIn, completedToday, chores } = data;

  // rotation timing
  const today = new Date().toDateString();
  const newDay = (new Date(today) - new Date(lastIn)) / 86400000 > 0;
  const [weekCount, setWeekCount] = useState(
    newDay ? weeklyCount + 1 : weeklyCount
  );
  const [longCount, setLongCount] = useState(
    newDay ? longerCount + 1 : longerCount
  );

  // modals
  const [weekModalOpen, setweekModalOpen] = useState(false);
  const [dailyModalOpen, setdailyModalOpen] = useState(false);
  const [longerModalOpen, setlongerModalOpen] = useState(false);
  const [infoModalOpen, setinfoModalOpen] = useState(false);

  // chore lists
  const { daily, weekly, longer } = chores;
  const [done, setdone] = useState(completedToday);
  const [unDone, setunDone] = useState([...chores.daily, chores.weekly[weekCount], chores.longer[longCount]]);

  const updateList = (type, update) => {
    const newState = {
      ...data,
      chores: {
        ...data.chores,
        [type]: update,
      },
    };
    setData(newState);
  };

  const changeCheck = (chore, wasChecked) => {
    setdone(
      wasChecked ? done.filter((i) => i !== chore) : [...done, chore]
    );
    setunDone(
      wasChecked ? [...unDone, chore] : unDone.filter((i) => i !== chore)
    );
  }

  return (
    <div>
      <AppHeader>
        <h2>Clean Routine</h2>
        <InstructionWrapper>
          <BlueButton
              onClick={() => setinfoModalOpen(true)}
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
        <ListHeader>Today</ListHeader>
        <CheckItems list={unDone} isChecked={false} changeCheck={changeCheck}/>
        <CheckItems list={done} isChecked={true} changeCheck={changeCheck}/>
        <PeachButton
          style={{
            maxWidth: 100,
            backgroundColor: colorList.melon,
            color: "white",
          }}
          onClick={() => {
            const newWeekCount = weekCount + 1;
            const newLongCount = longCount + 1;
            const incompleted = unDone.filter(u => !daily.includes(u));
            setWeekCount(newWeekCount);
            setLongCount(newLongCount);
            setdone([]);
            setunDone(
               [...chores.daily, chores.weekly[newWeekCount], chores.longer[newLongCount], ...incompleted]
            );
          }}
        >
          Refresh
        </PeachButton>
        <Separator>
        <ListHeader>Edit Chore Lists</ListHeader>
        <ListUpdateModal
          label="Daily"
          isOpen={dailyModalOpen}
          setModalOpen={setdailyModalOpen}
          chores={daily}
          setChores={(v) => updateList("daily", v)}
        />
        <ListUpdateModal
          isOpen={weekModalOpen}
          setModalOpen={setweekModalOpen}
          chores={weekly}
          label="Weekly"
          setChores={(v) => updateList("weekly", v)}
        />
        <ListUpdateModal
          isOpen={longerModalOpen}
          setModalOpen={setlongerModalOpen}
          chores={longer}
          label="General Rotation"
          setChores={(v) => updateList("longer", v)}
        />
        </Separator>       
          <Instructions
            isOpen={infoModalOpen}
            closeModal={() => setinfoModalOpen(false)}
          />
      </div>
    </div>
  );
}

export default App;
