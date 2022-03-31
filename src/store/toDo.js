import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "./actionType";
const toDoSlice = createSlice({
  name: "toDo",
  initialState: {
    toDoList: [],
    specialToDo: {},
    CurrentWeather: {},
    weatherList: [],
    mode: false,
  },
  reducers: {
    weatherRequest: (state, action) => {},
    weatherRequestFalid: (state, action) => {},
    toDoCreate: (state, action) => {
      state.toDoList.unshift(action.payload);
    },
    toDoDelete: (state, action) => {
      state.toDoList = state.toDoList.filter(
        (key) => key.id !== action.payload
      );
    },
    toDoEdit: (state, action) => {
      const index = state.toDoList.findIndex(
        (key) => key.id === action.payload.id
      );
      state.toDoList[index] = action.payload;
    },

    modeChange: (state, action) => {
      state.mode = !state.mode;
    },
    CourentWeatherSet: (state, action) => {
      state.CurrentWeather = action.payload;
    },
    weatherListSet: (state, action) => {
      state.weatherList = action.payload;
    },
  },
});

export const {
  weatherRequest,
  weatherRequestFalid,
  CourentWeatherSet,
  modeChange,
  toDoCreate,
  toDoDelete,
  toDoEdit,
  weatherListSet,
} = toDoSlice.actions;

export default toDoSlice.reducer;

export const createToDo = (toDo) => {
  return {
    type: toDoCreate.type,
    payload: toDo,
  };
};
export const deleteToDo = (toDo) => {
  return {
    type: toDoDelete.type,
    payload: toDo,
  };
};
export const editToDo = (toDo) => {
  return {
    type: toDoEdit.type,
    payload: toDo,
  };
};

export const setCurrentWeather = (weather) =>
  apiCallBegan({
    url: `data/2.5/weather?lat=${weather.lat}&lon=${weather.lon}&exclude=current&appid=45ce8911132bba34bd32be0b34b539b1&units=metric`,
    method: "get",
    onStart: weatherRequest.type,
    onSuccess: CourentWeatherSet.type,
    onError: weatherRequestFalid.type,
  });

export const setWeatherList = (weather) =>
  apiCallBegan({
    url: `data/2.5/onecall?lat=${weather.lat}&lon=${weather.lon}&units=metric&appid=45ce8911132bba34bd32be0b34b539b1&units=metric`,
    method: "get",
    onStart: weatherRequest.type,
    onSuccess: weatherListSet.type,
    onError: weatherRequestFalid.type,
  });

export const changeMode = () => {
  return {
    type: modeChange.type,
  };
};

export const selectToDoList = createSelector(
  (state) => state.entities.toDo,
  (toDo) => toDo.toDoList.filter((key) => key.archiveAt.length < 1)
);

export const selectArchiveList = createSelector(
  (state) => state.entities.toDo,
  (toDo) => toDo.toDoList.filter((key) => key.archiveAt.length > 1)
);

export const selectCurrentWeather = createSelector(
  (state) => state.entities.toDo,
  (toDo) => toDo.CurrentWeather
);

export const selectWeatherList = createSelector(
  (state) => state.entities.toDo,
  (toDo) => toDo.weatherList
);
