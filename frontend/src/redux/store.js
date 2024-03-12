import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { sectionReducer } from './sectionRelated/sectionSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        section: sectionReducer
    },
});

export default store;
