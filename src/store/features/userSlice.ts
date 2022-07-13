import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: { username: "John Doe" },
  reducers: {},
});

export default userSlice.reducer;
