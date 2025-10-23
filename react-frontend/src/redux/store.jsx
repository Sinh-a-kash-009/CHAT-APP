import { createSlice,configureStore } from "@reduxjs/toolkit";
import { create } from "zustand";

const trackerSlice = createSlice({
    name: "tracker",
    initialState: {
        trackerItems: [] // Single array of objects: [{task, deadline}, ...]
    },
    reducers: {
        addTracker: (state, action) => {
            const {task, date} = action.payload;
            state.trackerItems.push({task, deadline: date});
        },
        deleteTracker: (state, action) => {
            state.trackerItems = [];    
        },
        
    }
});
export const { addTracker,deleteTracker} = trackerSlice.actions;
const store = configureStore({
    reducer: {
        tracker: trackerSlice.reducer
    }
});
const items1 = [
    { label: "HOME", link: "/home" },
    { label: "GROUP", link: "/group/:id" },
    { label: "TRACKER", link: "/tracker" }
];
const items2 = [
    { label: "GROUP", link: "/group/:id" },
    { label: "HOME", link: "/home" },
    { label: "TRACKER", link: "/tracker" }
];
const items3 = [
    { label: "TRACKER", link: "/tracker" },
    { label: "HOME", link: "/home" },
    { label: "GROUP", link: "/group/:id" },
];



const useThemeStore = create((set) => ({
  theme: localStorage.getItem("streamify-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("streamify-theme", theme);
    set({ theme });
  },
}));

export { items1,items2,items3, store,useThemeStore };