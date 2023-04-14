import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContext from './Context/UserContext';
import ProfileContext from './Context/ProfileContext';
import CommentContext from './Context/CommetContext'
import authReducer from './redux/store';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import User from './Context/UserContext';
import ProflePicContext from './Context/ProflePicContext';

const persistConfig = { key: "root", storage, version: 1, blacklist: ['chats', 'currentChat', 'messages', 'loading']};
const persistedReducer = persistReducer(persistConfig, authReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ProfileContext>
<Provider store={store}>
<PersistGate loading={null} persistor={persistStore(store)}>

         <UserContext>
          <CommentContext>
            
          <User>
            <ProflePicContext>
         <App/>

            </ProflePicContext>
          </User>
          </CommentContext>
         </UserContext>


</PersistGate>
</Provider>

        </ProfileContext>
  
   
    </React.StrictMode> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
