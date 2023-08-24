import authorSlice from "./authorSlice";
import commentsSlice from "./commentsSlice";
import postSlice from "./postSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		blogPosts: postSlice,
		author: authorSlice,
		comments: commentsSlice
	}
})

export default store