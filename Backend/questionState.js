// questionState.js
let questionId = null;

export const setQuestionId = (id) => {
  questionId = id;
};

export const getQuestionId = () => {
  return questionId;
};