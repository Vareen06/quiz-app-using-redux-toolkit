import { createSlice } from "@reduxjs/toolkit";

// const saveLoacalStorage=(state)=>{
//     try{
//       const data=JSON.stringify(state)
//       localStorage.setItem("quizState",data)
//     }catch(e){
//       console.log("first")
//     }
// }

const initialState = {
  data: [],
  value: "",
  input: "",
  nameEntered: false,
  currentIndex: 0,
  currentScore: false,
  score: 0,
  selectedAnswers: {},
  // disabledQuestion:false,
  questions: [
    {
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false },
      ],
    },
    {
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
  ],
};

export const quizSlice = createSlice({
  name: "Quiz",
  initialState,
  reducers: {
    addName: (state, action) => {
      state.value = [action.payload];
      // console.log(state.value)
      state.input = "";
      state.nameEntered = true;
    },
    handleInputChange: (state, action) => {
      state.input = action.payload;
    },
    nextPage: (state, action) => {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex += 1;
      }

      // console.log(state.selectedAnswer)
      // const Answer= action.payload.find(Option=>Option.isCorrect === true);
      // console.log(Answer)
      // console.log(state.selectedAnswer)
      // if(Answer.answerText === state.selectedAnswer){
      //   state.score += 1
      //   state.currentScore=0
      //   console.log(state.score)
      // }

      // state.selectedAnswer=''
      // console.log("12")
    },

    selectAnswer: (state, action) => {
      const selectedAnswer = action.payload;
      // console.log(selectedAnswer);
      const correctAnswer = state.questions[
        state.currentIndex
      ].answerOptions.find((option) => option.isCorrect).answerText;
      const previousAnswer = state.selectedAnswers[state.currentIndex];
      // console.log(previousAnswer);

      // Update the selected answer
      state.selectedAnswers[state.currentIndex] = selectedAnswer;

      // Adjust the score based on changes
      if (
        previousAnswer === correctAnswer &&
        selectedAnswer !== correctAnswer
      ) {
        state.score--;
        // console.log(state.score);
      } else if (
        previousAnswer !== correctAnswer &&
        selectedAnswer === correctAnswer
      ) {
        state.score++; // console.log(state.selectedAnswer)
        // console.log(state.score);
      }
    },
    previousPage: (state, action) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      }
      // state.selectedAnswer=''
    },
    showScore: (state, action) => {
      state.currentScore = true;

      // state.data.push({
      //     candidateName:state.value,
      //     candidateScore:state.score
      // })
      const candidate = { name: state.value, score: state.score };
      const existingCandidates =
        JSON.parse(localStorage.getItem("candidates")) || [];

      // Update local state and local storage
      const updatedCandidates = [...existingCandidates, candidate];
      localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
      // state.data = updatedCandidates;
      // console.log(state.data);
    },
    savedCandidate:(state,action)=>{
      state.data=action.payload
      console.log(state.data)
    }
  },
});

export const {
  addName,
  handleInputChange,
  nextPage,
  previousPage,
  selectAnswer,
  showScore,
  savedCandidate,
} = quizSlice.actions;

export default quizSlice.reducer;
