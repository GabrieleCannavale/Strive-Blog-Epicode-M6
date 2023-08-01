import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
	response: null,
	status: "idle",
}

const postSlice = createSlice({
	name: "blogPosts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(postBlogPosts.fulfilled, (state, action) => {
				state.status = "idle";
				state.response = action.payload;
			})
			.addCase(postBlogPosts.rejected, (state) => {
				state.status = "error";
			})
			.addCase(postBlogPosts.pending, (state) => {
				state.status = "pending";
			});
	}
});

export default postSlice.reducer;

export const postBlogPosts = createAsyncThunk(
	"blogPost/POST",
	async (postPayload) => {
		const data = new FormData();
		data.append("category", postPayload.category);
		data.append("title", postPayload.title);
		data.append("cover", postPayload.cover);
		data.append("readTimeValue", postPayload.readTime.value);
		data.append("readTimeUnit", postPayload.readTime.unit);
		data.append("author", postPayload.author);
		data.append("content", postPayload.content);
		try {
			const res = await fetch("http://localhost:5051/posts/create", {
			method: "POST",
			body: data,

			headers: {
				"Content-Type": "multipart/form-data"
			}

		})

		console.log(res);

		
		} catch (error) {
			console.log(error);
		}
		
	});

/* export const postBlogPosts = createAsyncThunk(
	"blogPost/post",
	async (postPayload) => {

		const res = await fetch("http://localhost:6060/posts/create", {
			method: "POST",
			body: JSON.stringify(postPayload),
		});

		return await res.json();
	}); */

/* export const upCover = createAsyncThunk(
	"cover/uploadCover",
	async (file) => {
		const res = await fetch("http://localhost:6060/posts/internalUpload", {
			headers: {
				"Content-Type": "multipart/form-data"
			},
			method: "POST",
			body: file,
		});
		return await res.json();
	}
) */