import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        sclass: sclassReducer
    },
});

export default store;
