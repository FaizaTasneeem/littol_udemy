import { create } from 'zustand';

export const userStore = create((set) => ({
    user: null,
    accessToken: null,
    previewUrl: null,
    setUser: (user) => set({user}),
    setAccessToken: (accessToken) => set({accessToken}),
    setPreviewUrl: (previewUrl) => set({previewUrl}),
}));

export const courseStore = create((set) => ({
    courseList: [],
    filteredCourseList: [],
    showModal: false,
    setCourseList: (courseList) => set({courseList}),
    setFilteredCourseList: (filteredCourseList) => set({filteredCourseList}),
    setShowModal: (showModal) => set({showModal})
}));
