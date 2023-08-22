import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
	authorsArrayRedux: [],
	status: "idle",
};

const authorSlice = createSlice({
	name: "authors",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
		.addCase(getAuthors.fulfilled, (state, action) => {
			state.authorsArrayRedux = action.payload;
		});
	}
});

//! AUTHOR POST
export const authorPost = createAsyncThunk(
	"author/register",

	async (author) => {
		//console.log(author)
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
			//console.log(res)
			return res.data;

		} catch (error) {
			console.log(error)
		}
	}
);

//!GET AUTHORS
export const getAuthors = createAsyncThunk(
	"authors/get",
	async () => {
		try {
			const res = await axios.get(`http://localhost:5051/authors`);
			if (!res) {
				console.log(`HTTP status: ${res.status}`);
			}
			//console.log(res.data);
			return res.data.authors;
		} catch (error) {
			console.log(error);
			throw error;
		}
	});



export default authorSlice.reducer;