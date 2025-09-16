import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

//Alle Posts
export const getAllPosts = () => axios.get(API_URL);

//Post by id
export const getPostById = (id: string) => axios.get(`${API_URL}/${id}`);

// create Post
export const createPost = (postData: Record<string, any>) =>
  axios.post(API_URL, postData);

// Update Post
export const updatePost = (id: string, updatedData: Record<string, any>) =>
  axios.put(`${API_URL}/${id}`, updatedData);

// delete Post
export const deletePost = (id: string) => axios.delete(`${API_URL}/${id}`);
