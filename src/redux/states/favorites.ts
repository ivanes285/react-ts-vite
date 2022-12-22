import { LocalStorageType, Person } from "@/models";
import { getLocalStorage, setLocalStorage } from "@/utilities";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Person[] = [];

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: getLocalStorage(LocalStorageType.FAVORITES) ? JSON.parse(getLocalStorage(LocalStorageType.FAVORITES) as string) : initialState,
  reducers: {
  
    addFavorite: (state, action) => {
      setLocalStorage(LocalStorageType.FAVORITES, action.payload);
      return action.payload;    
    },
    deleteFavorite: (state,action) =>{
     const filteredFavorite = state.filter((item:Person) => item.id !== action.payload.id);
      setLocalStorage(LocalStorageType.FAVORITES, filteredFavorite);
      return filteredFavorite;
    }
  },
});

export const {addFavorite, deleteFavorite} = favoriteSlice.actions
