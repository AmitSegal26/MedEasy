const makeTitle = (word) =>
  word && typeof word == "string"
    ? word.replace(/^./, word[0].toUpperCase())
    : word;
export default makeTitle;
