import { configureStore } from '@reduxjs/toolkit'
import { activeBoardSliceReducer } from './activeBoard/activeBoardSlice'

export const store = configureStore({
  reducer: {
    activeBoard: activeBoardSliceReducer
  }
})