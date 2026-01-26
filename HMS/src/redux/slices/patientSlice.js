import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/patients";

export const addPatient = createAsyncThunk(
  "patients/addPatient",
  async (patientData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/add`, patientData);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async ({ page, limit }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}?page=${page}&limit=${limit}`,
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async ({ id, patientData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, patientData);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deletePatient = createAsyncThunk(
  "patients/deletePatient",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    patients: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    isError: false,
    isSuccess: false,
    isAddSuccess: false,
    isUpdateSuccess: false,
    isDeleteSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isAddSuccess = false;
      state.isUpdateSuccess = false;
      state.isDeleteSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAddSuccess = true;
      })
      .addCase(addPatient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchPatients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.patients = action.payload.patients;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdateSuccess = true;
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isDeleteSuccess = true;
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = patientSlice.actions;
export default patientSlice.reducer;
