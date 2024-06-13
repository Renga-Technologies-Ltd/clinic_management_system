import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "services/AuthService";
import { history } from "services/history";
// import { APP_PREFIX_PATH } from "configs/AppConfig";
const base_apiUrl = process.env.REACT_APP_BASE_URL;


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
      const response = await fetch(`${base_apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        // console.log(result);
        const AUTH_TOKEN = result.token; // Adjust accordingly based on your API response structure
        const user_id = result.user.id; // Adjust accordingly based on your API response structure
        const user =
          result.user.profile.firstName + " " + result.user.profile.lastName;
        const userDetails = result.user;
        const userRoles = result.user.roles;
        redirectToDashboard(userRoles);

        localStorage.setItem("AUTH_TOKEN", AUTH_TOKEN);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("user", user);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
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
const redirectToDashboard = (userRoles) => {
  console.log("logged in user roles", userRoles);
  const role = userRoles[0];
  // Assuming userRoles is an array
  const hasAdminRole = role.includes("Admin");
  const hasDoctorRole = role.includes("Doctor");
  const hasNurseRole = role.includes("Nurse");
  const hasReceptionistRole = role.includes("Reception");
  if (hasAdminRole) {
    history.push("/app/dashboards/default");
  } else if (hasDoctorRole) {
    history.push("/app/dashboards/doctor");
  } else if (hasNurseRole) {
    history.push("/app/dashboards/nurse");
  } else if (hasReceptionistRole) {
    history.push("/app/dashboards/reception");
  } else {
    // message.error("Unknown role"); // Handle unknown roles as needed
    console.log("Unknown role");
    // history.push("/app/dashboards"); // Default dashboard for unknown roles
  }
};

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
