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
    page: 1,
    courseList: [],
    filteredCourseList: [],
    setPage: (page) => set({page}),
    setCourseList: (courseList) => set({courseList}),
    setFilteredCourseList: (filteredCourseList) => set({filteredCourseList}),
}));

export const updateCourseModalStore = create((set) => ({
    showModal: false,
    setShowModal: (showModal) => set({showModal}),
    courseToUpdate: {},
    setCourseToUpdate: (courseToUpdate) => set({courseToUpdate})
}));