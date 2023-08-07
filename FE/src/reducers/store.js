import authorSlice from "./authorSlice";
import postSlice from "./postSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		blogPosts: postSlice,
		author: authorSlice
	}
})

export default store