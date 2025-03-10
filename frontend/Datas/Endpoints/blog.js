import { get } from "../Config/Config";

export const BlogApi = {
    getBlogs: (data) => get(`blogs/list`, { params: data }),
    getBlogBySlug: (data) => get(`blogs/${data?.slug}`, { params: data }),
}