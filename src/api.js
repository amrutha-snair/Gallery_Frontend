import axios from "axios";

const API = axios.create({
    baseURL: "http://52.55.81.211:8005",
});

export const fetchImages = () => API.get("/images");

export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const deleteImage = (id) => API.delete(`/images/${id}`);
