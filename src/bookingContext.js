import format from "date-fns/format";

export const actions = {
  GET_ALL_BOOKINGS: "GET_ALL_BOOKINGS",
  FETCH_BOOKING_WORKING_DATA: "FETCH_BOOKING_WORKING_DATA",
  NOTIFY_AGENT_ABOUT_ACTION_TO_TAKE: "NOTIFY_AGENT_ABOUT_ACTION_TO_TAKE",
  SAVE_PROGRESS: "SAVE_PROGRESS"
};
function saveWorkingData(firebaseAction, agent, data) {
  return firebaseAction("saveWorkingData", [agent, data]);
}
function getWorkingDataRecords(firebaseAction, value, { updateState, state }) {
  let { pending_bookings, agent = "Biola" } = state.context.state;
  if (pending_bookings.length > 0) {
    return new Promise(resolve => resolve(pending_bookings));
  }
  return getWorkingData(firebaseAction, agent, updateState).catch(err => {
    throw err;
  });
}
const getAllBookings = (params, { getAdapter, state, updateState }) => {
  return getAdapter().getAllBookingsFilter({
    ...params
  });
};
export function autoSave(firebaseAction, state) {
  let { pending_bookings, agent = "Biola" } = state.context.state;
  return saveWorkingData(firebaseAction, agent, pending_bookings);
}
function getWorkingData(firebaseAction, agent, updateState) {
  return firebaseAction("getWorkingData", [agent, [], []]).then(data => {
    updateState({ pending_bookings: data });
    return data;
  });
}
function notifyAgentAboutAction(
  firebaseAction,
  { order, verified = false, ...rest },
  { getAdapter, state, updateState }
) {
  let date = format(new Date(), "D/MM/YYYY");

  let { agent = "Biola", pending_bookings } = state.context.state;
  let wk = verified
    ? pending_bookings.filter(x => x.order !== order)
    : [...pending_bookings, { order, date, ...rest }];
  updateState({ pending_bookings: wk }, s => {
    autoSave(firebaseAction, s);
  });
  return new Promise(resolve => resolve(wk));
}
function saveProgress(firebaseAction, value, { state }) {
  autoSave(firebaseAction, state);
}
const dispatch = (action, existingOptions = {}, firebaseFunc) => {
  function firebaseAction(key, args) {
    return firebaseFunc.loadFireStore().then(() => firebaseFunc[key](...args));
  }
  let options = {
    [actions.GET_ALL_BOOKINGS]: getAllBookings,
    [actions.FETCH_BOOKING_WORKING_DATA]: getWorkingDataRecords.bind(
      null,
      firebaseAction
    ),
    [actions.NOTIFY_AGENT_ABOUT_ACTION_TO_TAKE]: notifyAgentAboutAction.bind(
      null,
      firebaseAction
    ),
    [actions.SAVE_PROGRESS]: saveProgress.bind(null, firebaseAction),
    ...existingOptions
  };
  return options;
};

const componentDidMount = ({ updateState, state }, firebaseFunc) => {
  let { agent = "Biola" } = state.context.state;
  function firebaseAction(key, args) {
    return firebaseFunc.loadFireStore().then(() => firebaseFunc[key](...args));
  }
  getWorkingData(firebaseAction, agent, updateState).then(data => {
    updateState({ pending_bookings: data });
  });
};
export default {
  dispatch,
  actions,
  componentDidMount,
  state: {
    pending_bookings: []
  },
  keys: {
    analytics: "booking_analytics",
    storage: "booking_working_data"
  }
};
