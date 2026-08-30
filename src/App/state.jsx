import mockData from "../mock-data/mock-db.json";


function initState() {
  const { weeklyCount, longerCount, lastIn, completedToday, chores } = mockData;

  // rotation timing
  const today = new Date().toDateString();
  const newDay = (new Date(today) - new Date(lastIn)) / 86400000 > 0;
  const weekCount = newDay ? weeklyCount + 1 : weeklyCount;
  const longCount = newDay ? longerCount + 1 : longerCount;

  return {
    data: mockData,
    weekCount,
    longCount,
    done: completedToday,
    unDone: [...chores.daily, chores.weekly[weekCount], chores.longer[longCount]],
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_LIST": {
      const { listType, update } = action;
      return {
        ...state,
        data: {
          ...state.data,
          chores: {
            ...state.data.chores,
            [listType]: update,
          },
        },
      };
    }
    case "CHANGE_CHECK": {
      const { chore, wasChecked } = action;
      return {
        ...state,
        done: wasChecked ? state.done.filter((i) => i !== chore) : [...state.done, chore],
        unDone: wasChecked ? [...state.unDone, chore] : state.unDone.filter((i) => i !== chore),
      };
    }
    case "REFRESH": {
      const { chores } = state.data;
      const newWeekCount = state.weekCount + 1;
      const newLongCount = state.longCount + 1;
      const incompleted = state.unDone.filter((u) => !chores.daily.includes(u));
      return {
        ...state,
        weekCount: newWeekCount,
        longCount: newLongCount,
        done: [],
        unDone: [
          ...chores.daily,
          chores.weekly[newWeekCount],
          chores.longer[newLongCount],
          ...incompleted,
        ],
      };
    }
    default:
      return state;
  }
}

export { initState, reducer };