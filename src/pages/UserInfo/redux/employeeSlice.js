import { createSlice } from '@reduxjs/toolkit';
import { getEmployeesAsync } from './employeeThunk';

const initialState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployeesAsync.fulfilled, (state, action) => {
      state.employees = action.payload;
    });
  },
});

export const employeeReducer = employeeSlice.reducer;
