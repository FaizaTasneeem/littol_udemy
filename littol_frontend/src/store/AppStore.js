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
    page: 1,
    totalPages: 1,
    setCourseList: (courseList) => set({courseList}),
    setFilteredCourseList: (filteredCourseList) => set({filteredCourseList}),
    setPage: (page) => set({page}),
    setTotalPages: (totalPages) => set({totalPages}),
}));

export const updateCourseModalStore = create((set) => ({
    showModal: false,
    setShowModal: (showModal) => set({showModal}),
    courseToUpdate: {},
    setCourseToUpdate: (courseToUpdate) => set({courseToUpdate})
}));