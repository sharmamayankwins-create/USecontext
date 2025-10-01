import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch users from API
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await fetch('http://localhost:3000/users');
  return response.json();
});

// Signup
export const signupUser = createAsyncThunk('user/signup', async (user) => {
  const newUser = { ...user, id: Date.now().toString() };
  
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
  
  if (!response.ok) throw new Error('Signup failed');
  return newUser;
});

// Update user
export const updateUserData = createAsyncThunk('user/update', async ({ id, data }) => {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) throw new Error('Update failed');
  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    currentUser: null,
    loading: false,
  },
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(u => u.email === email && u.password === password);
      if (user) {
        state.currentUser = user;
      }
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.currentUser = action.payload;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u.id === state.currentUser.id);
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...action.payload };
          state.currentUser = state.users[index];
        }
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;