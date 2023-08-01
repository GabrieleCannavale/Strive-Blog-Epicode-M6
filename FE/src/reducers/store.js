import authorSlice from "./authorSlice";
import postSlice from "./postSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		blogPost: postSlice,
		author: authorSlice
	}
})

export default store