import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { AUTH_TOKEN } from "constants/AuthConstant";
import AuthService from "services/AuthService";
import apiBaseUrl from "configs/config";

export const initialState = {
  loading: false,
  message: "",
  showMessage: false,
  redirect: "",
  token: localStorage.getItem("AUTH_TOKEN") || null,
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, { rejectWithValue }) => {
    const { email, password } = data;
    // console.log(username);
    try {
      // Make API call for authentication
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        const AUTH_TOKEN = result.token; // Adjust accordingly based on your API response structure
        const user_id = result.user.id; // Adjust accordingly based on your API response structure
        const user =
          result.user.profile.firstName + " " + result.user.profile.lastName;
        localStorage.setItem("AUTH_TOKEN", AUTH_TOKEN);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("user", user);
        return AUTH_TOKEN;
      } else {
        const errorResponse = await response.json();
        return rejectWithValue(
          errorResponse.message || "Authentication failed"
        );
      }
    } catch (err) {
      return rejectWithValue(err.message || "Error");
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data, { rejectWithValue }) => {
    const { email, password } = data;
    try {
      const response = await AuthService.signUp(email, password);
      console.log(response);
      //   if (response.user) {
      //     const token = response.user.refreshToken;
      //     localStorage.setItem(AUTH_TOKEN, response.user.refreshToken);
      //     return token;
      //   } else {
      //     return rejectWithValue(response.message?.replace("Firebase: ", ""));
      //   }
    } catch (err) {
      return rejectWithValue(err.message || "Error");
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  //   const response = await AuthService.signOutRequest();
  localStorage.removeItem("AUTH_TOKEN");
  localStorage.removeItem("user");
  localStorage.removeItem("user_id");

  const response = { message: "Logged out successfully" };

  return response.message;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticated: (state, action) => {
      state.loading = false;
      state.redirect = "/";
      state.token = action.payload;
    },
    showAuthMessage: (state, action) => {
      state.message = action.payload;
      state.showMessage = true;
      state.loading = false;
    },
    hideAuthMessage: (state) => {
      state.message = "";
      state.showMessage = false;
    },
    signOutSuccess: (state) => {
      state.loading = false;
      state.token = null;
      state.redirect = "/";
    },
    showLoading: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.redirect = "/";
        state.token = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.message = action.payload;
        state.showMessage = true;
        state.loading = false;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.redirect = "/";
      })
      .addCase(signOut.rejected, (state) => {
        state.loading = false;
        state.token = null;
        state.redirect = "/";
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.redirect = "/";
        state.token = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.message = action.payload;
        state.showMessage = true;
        state.loading = false;
      });
  },
});

export const {
  authenticated,
  showAuthMessage,
  hideAuthMessage,
  signOutSuccess,
  showLoading,
  signInSuccess,
} = authSlice.actions;

export default authSlice.reducer;
