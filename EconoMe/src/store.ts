
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/reducer';

export default function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}