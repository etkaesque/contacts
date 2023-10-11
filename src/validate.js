class Validation {
  static validateTextSpecial(text) {
    let textPattern = /^[\p{L}\p{M}\p{S}\sĄąČčĘęĖėĮįŠšŲųŪūŽž.]+$/u;

    if (textPattern.test(text.trim())) {
      return true;
    } else {
      return false;
    }
  }
  static validateTextLength(text) {
    return text.length < 3 ? true : false;
  }
  static validateEmpty(text) {
    if (typeof text === "string") {
      return text.trim() === "" ? true : false;
    } else {
        console.log(text)
      return text.length === 0;
    }
  }
}
export default Validation;
