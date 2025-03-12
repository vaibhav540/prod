import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let baseURL = import.meta.env.VITE_FUNCTION_URL;

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ email, password, type, config, status }, { rejectWithValue }) => {
      try {
          const query = `
          INSERT INTO atgeir-accelerators.sf_to_bq.user_credentials 
          (id, email, password, type, config, status) 
          VALUES (
            '${Date.now()}', 
            '${email}', 
            '${password ?? "NA"}', 
            '${type}', 
            '${config}', 
            ${status !== undefined ? status : true}
          );
          `.replace(/\s+/g, ' ');

          console.log("Running Query:", query);

          const response = await axios.post(`${baseURL}`, { query });

          return response.data;
      } catch (error) {
          if (error.response && error.response.status === 400) {
              return rejectWithValue(error.response.data.message);
          } else {
              return rejectWithValue("An unexpected error occurred. Please try again.");
          }
      }
  }
);
export const checkUserExists = createAsyncThunk(
  "user/checkUserExists",
  async ({ email }, { rejectWithValue }) => {
      try {
        const query = `
        SELECT email, type, password
        FROM \`atgeir-accelerators.sf_to_bq.user_credentials\`
        WHERE email = '${email}'
    `.replace(/\s+/g, ' ');
    
     console.log("email: ",query, email);
     
          const response = await axios.post(`${baseURL}`, { query });
          return response.data; 
      } catch (error) {
          return rejectWithValue("Failed to check user existence.");
      }
  }
);

  
const userSlice=createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        addUser(state, action) {
            state.users.push(action.payload);
        },
        deleteUser(state, action) {
            state.users = state.users.filter(user => user.id!== action.payload);
        },
        updateUser(state, action) {
            state.users = state.users.map(user =>
                user.id === action.payload.id? action.payload : user
            );
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; 
        });
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.successMessage = null;
          });
          builder.addCase(checkUserExists.fulfilled, (state, action) => {
            state.userCheck = action.payload; 
        });
    }
})

export const userSuccessMessage = (state) => state.user?.successMessage || null;
export const selectLoading = (state) => state.user.loading ;

export const { addUser,deleteUser,updateUser} = userSlice.actions;
export default userSlice.reducer;