import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Form } from "react-bootstrap";
import axios from 'axios';

const initialState = {
	author: null,
	status: "idle",
};

const authorSlice = createSlice({
	name: "authors",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
		.addCase(authorPost.fulfilled, (state, action) => {
			console.log("POST FULFILLED")
		})
	} 
});


export const authorPost = createAsyncThunk(
	"author/register",

	async (author) => {
		console.log(author)
		const form = new FormData()

		form.append("name", author.name);
		form.append("secondName", author.secondName);
		form.append("password", author.password);
		form.append("email", author.email);
		form.append("birthDate", author.birthDate);
		form.append("avatar", author.avatar);

		console.log(...form);
		try {
			const res = await axios.post('http://localhost:5051/register/authors', form, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			})
			console.log(res)
			return res.data;

		} catch (error) {
			console.log(error)
		}
	}
);


export default authorSlice.reducer;