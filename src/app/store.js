import { configureStore } from "@reduxjs/toolkit";
import quizreducer from "../features/quizSlice";

export const store=configureStore({
    reducer:{
        quiz: quizreducer,
    },
})