import newHistory from "../../Classes/CustomHistory";

const HISTORY = {
  setNewPage: (input) => newHistory.enterNewLocation(input),
  changeToNext: () => newHistory.changeToNext(),
  changeToPrev: () => newHistory.changeToPrev(),
  getCurrentPage: () => newHistory.getCurrentPage(),
  getHistory: () => newHistory.getHistory(),
  removeLastPage: () => newHistory.removeLastPage(),
  removePagesAfterFailureAuth: () => newHistory.removePagesAfterFailureAuth(),
};

export default HISTORY;
