import { getEmployees } from './employeeService';
const { createAsyncThunk } = require('@reduxjs/toolkit');

export const getEmployeesAsync = createAsyncThunk(
  'employees/getEmployeesAsync',
  async () => {
    const res = await getEmployees();
    return res;
  }
);
