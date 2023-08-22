import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';


const initialState = {
	postsArrayRedux: [],
	status: "idle",
	singlePost: {}
}

const postSlice = createSlice({
	name: "blogPosts",
	initialState,
	reducers: {
		filterPosts: (state, action) => {
			state.postsArrayRedux = state.postsArrayRedux.filter((post) => {
				return post.title.toLowerCase().includes(action.payload.toLowerCase());
			})
		}
	},
	extraReducers: (builder) => {
		builder
			//*GET CASES
			.addCase(getBlogPost.fulfilled, (state, action) => {
				state.postsArrayRedux = action.payload;
			})

			//*GET BY ID CASES
			.addCase(blogPostById.fulfilled, (state, action) => {
				state.singlePost = action.payload;
			})
			
			//*DELETE CASES
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
			//console.log(res);
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

//! GET SINGLE POST BY ID
export const blogPostById = createAsyncThunk(
	"blogPosts/getById",
	async (id) => {
	  try {
		const res = await axios.get(`http://localhost:5051/posts/` + id);
		if (!res) {
		  console.log(`HTTP error! status: ${res.status}`);
		}
		//console.log(res.data);
		return res.data.postById;
	  } catch (error) {
		console.log(error);
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

export const { filterPosts } = postSlice.actions;	
export default postSlice.reducer;

