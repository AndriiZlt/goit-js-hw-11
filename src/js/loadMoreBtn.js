export default class LoadMoreBtn {
  constructor(selector) {
    this.ref = this.getRef(selector);
  }

  getRef(selector) {
    return document.querySelector(selector);
  }

  enable() {
    this.ref.disabled = false;
  }

  disable() {
    this.ref.disabled = true;
  }

  show() {
    this.ref.classList.remove('is-hidden');
  }

  hide() {
    this.ref.classList.add('is-hidden');
  }
}
