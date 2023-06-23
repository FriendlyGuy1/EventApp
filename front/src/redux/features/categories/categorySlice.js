import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

const initialState = {
  categories: [],
  error: "",
  loading: false,
}

export const postCategory = createAsyncThunk(
  'categories/create',
  async (categoryName, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await categoryService.postCategories(categoryName, token)
    } catch (error) {
        if (!error.response) {
          throw error;
        }
        return thunkAPI.rejectWithValue(error.response.data);
      }
  }
)

export const getCategories = createAsyncThunk(
  'categories/getAll',
  async (_, thunkAPI) => {
    try {
      return await categoryService.getCategories()
    } catch (error) {
        if (!error.response) {
          throw error;
        }
        return thunkAPI.rejectWithValue(error.response.data);
      }
  }
)

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await categoryService.removeCategory(id, token)
    } catch (error) {
        if (!error.response) {
          throw error;
        }
        return thunkAPI.rejectWithValue(error.response.data);
      }
  }
)

export const changeACategory = createAsyncThunk(
  'categories/change',
  async (chosen, thunkAPI) => {
    try {
      const id = chosen.chosenId
      const changes = {
        category: chosen.newName
      }
      const token = thunkAPI.getState().auth.user.token
      return await categoryService.changeCategory(id, changes, token)
    } catch (error) {
        if (!error.response) {
          throw error;
        }
        return thunkAPI.rejectWithValue(error.response.data);
      }
  }
)

export const categorieSlice = createSlice({
  name: 'categorie',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(postCategory.fulfilled, (state, action) => {
        state.loading = false
        state.events = action.payload
        state.error = "";
      })
      .addCase(postCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.categories = []
      })
      .addCase(getCategories.pending, (state) => {
        state.loading = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false
        state.error = ""
        state.categories = action.payload
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.categories = []
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false
        state.error = ""
        state.categories = action.payload
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(changeACategory.pending, (state) => {
        state.loading = true
      })
      .addCase(changeACategory.fulfilled, (state, action) => {
        state.loading = false
        state.error = ""
        state.categories = action.payload
      })
      .addCase(changeACategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.categories = []
      })
  }
})

export const { reset } = categorieSlice.actions
export default categorieSlice.reducer