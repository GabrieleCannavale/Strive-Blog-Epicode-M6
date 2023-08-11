import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';


const initialState = {
	postsArrayRedux: [],
	status: "idle",
}

const postSlice = createSlice({
	name: "blogPosts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			/* .addCase(postBlogPosts.fulfilled, (state, action) => {
				state.status = "idle";
				state.response = action.payload;
			})
			.addCase(postBlogPosts.rejected, (state) => {
				state.status = "error";
			})
			.addCase(postBlogPosts.pending, (state) => {
				state.status = "pending";
			}) */
			.addCase(getBlogPost.fulfilled, (state, action) => {
				state.postsArrayRedux = action.payload;
			})
			.addCase(deleteBlogPost.fulfilled, (state, action) => {
				state.postsArrayRedux = state.postsArrayRedux.filter(
					(post) => post._id !== action.payload);
			});
	}
});

//! POST POST
export const postBlogPosts = createAsyncThunk(
	"blogPost/POST",
	async (postPayload, {dispatch}) => {
		const form = new FormData();
		form.append("category", postPayload.category);
		form.append("title", postPayload.title);
		form.append("cover", postPayload.cover);
		form.append("readTimeValue", postPayload.readTime.value);
		form.append("readTimeUnit", postPayload.readTime.unit);
		form.append("author", postPayload.author);
		form.append("content", postPayload.content);
		try {
			const res = await axios.post("http://localhost:5051/posts/create", form, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			})
			.then(() => dispatch(getBlogPost()) )
			console.log(res);
			return res.data;

		} catch (error) {
			console.log(error);
		}

	});

//! GET POSTS	




export const getBlogPost = createAsyncThunk(
	'blogPost/GET',
	async () => {
		try {
			const res = await axios.get('http://localhost:5051/posts');
			if (!res.ok) {
				console.log(`HTTP error! status: ${res.status}`);
			};
			//console.log(res.data);
			return res.data.posts;
		} catch (error) {
			console.error(error);
		}
	}
);

//! DELETE POST
 export const deleteBlogPost = createAsyncThunk(
	'blogPost/DELETE',
	async (postId) => {
		try {
			const res = await axios.delete(`http://localhost:5051/posts/${postId}`)

			return res.data.posts;

		} catch(error) {
			console.log(error)
		}
	}); 

export default postSlice.reducer;

