class Dep {
  depList = {};
  sub(eventType, callback) {
    if (!this.depList[eventType]) {
      this.depList[eventType] = [callback];
      return false;
    }
    this.depList[eventType].push(callback)
  }
  pub(eventType) {
    if (!this.depList[eventType]) {
      return false;
    }
    this.depList[eventType].forEach((call) => {
      call();
    })
  }
}
export default Dep;