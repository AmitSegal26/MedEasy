/*
 * this is a class is built as a creativesolution to handle history (especially for when
 * clicking 'cancel' on the component FormButton)
 */
//! doing any other function to go back would not work due to the states(Router) taking place for the [window.history] object
class CustomHistory {
  #locations;
  #currentPage;
  #indexOfCurrent;
  constructor() {
    this.#locations = [window.location.href];
    this.#currentPage = this.#locations[0];
    this.#indexOfCurrent = 0;
  }
  #checkArray() {
    if (!this) {
      return true;
    }
    if (this && !this.#locations) {
      return true;
    }
    // Return false if the check passes
    return false;
  }
  enterNewLocation(newLocation) {
    if (this.#checkArray()) {
      return;
    }
    if (newLocation == "") {
      return;
    }
    this.#locations.push(newLocation);
    this.#indexOfCurrent = this.#locations.length - 1;
    this.#currentPage = newLocation;
    return this.#currentPage;
  }
  changeToNext() {
    if (this.#checkArray()) {
      return;
    }
    this.#indexOfCurrent++;
    if (this.#indexOfCurrent >= this.#locations.length) {
      this.#indexOfCurrent = this.#locations.length - 1;
      return;
    }
    this.#currentPage = this.#locations[this.#indexOfCurrent];
    return this.#currentPage;
  }
  changeToPrev() {
    if (this.#checkArray()) {
      return;
    }
    this.#indexOfCurrent--;
    if (this.#indexOfCurrent < 0) {
      this.#indexOfCurrent = 0;
      return;
    }
    this.#currentPage = this.#locations[this.#indexOfCurrent];
    return this.#currentPage;
  }
  getCurrentPage() {
    return this.#currentPage;
  }
  getHistory() {
    return this.#locations;
  }
  removeLastPage() {
    if (this.#checkArray()) {
      return this.#currentPage;
    }
    this.#locations.shift();
    if (this.#checkArray()) {
      return this.#currentPage;
    }
    this.#locations.pop();
    return this.#locations;
  }
  removePagesAfterFailureAuth() {
    if (this.#checkArray()) {
      return this.#currentPage;
    }
    this.#locations.shift();
    if (this.#checkArray()) {
      return this.#currentPage;
    }
    this.#locations.shift();
    return this.#locations;
  }
}

let newHistory = new CustomHistory();
export default newHistory;
