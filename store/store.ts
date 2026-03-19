import { configureStore } from "@reduxjs/toolkit";
import { bookmarkSlice } from "./bookmarkSlice";
import { languageSlice } from "./languageSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
    bookmark: bookmarkSlice.reducer,
    theme: themeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
