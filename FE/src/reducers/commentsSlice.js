import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
	commentsArray: [],
	commentsArrayByPost: [],
	status: "idle",
	singleComment: {},
}

const commentSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
		.addCase(fetchComments.fulfilled, (state, action) => {
			state.commentsArray = action.payload;
			state.status = 'succeeded';
		})
		.addCase(fetchCommentsByPost.fulfilled, (state, action) => {
			state.commentsArrayByPost = action.payload.comments;
			state.status = 'succeeded';
		})
		.addCase(createComment.fulfilled, (state, action) => {
			state.commentsArray.push(action.payload);
			state.status = 'succeeded';
		})
	}
});


export const comments = createAsyncThunk(
	'comments/GET',
	async () => {
		try {
			const res = await axios.get('http://localhost:5051/comments');
			if (!res.ok) {
				console.log(`HTTP error! status: ${res.status}`);
			};
			console.log(res.data)
			return res.data
		} catch (error) {
			console.error(error)
		}
	}
)

//inserisci thunk qui 
export const fetchComments = createAsyncThunk(
	'comments/fetchComments',
	async () => {
		const response = await axios.get('http://localhost:5051/comments');
		return response.data;
	}
)

export const fetchCommentsByPost = createAsyncThunk(
	'comments/fetchCommentsByPost',
	async (postId) => {
		const response = await axios.get(`http://localhost:5051/comments/post/${postId}`);
		return response.data;
	}
)

export const createComment = createAsyncThunk(
	'comments/createComment',
	async (newComment) => {
		const form = new FormData();
		form.append("")
		const response = await axios.post('http://localhost:5051/comments/create', newComment);
		return response.data;
	}
)


export default commentSlice.reducer;