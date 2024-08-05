import { useState, useEffect } from "react";
import ArticleForm from "./ArticleForm";
import ArticleTable from "./ArticleTable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ArticleContainer() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        content: '',
        image_path: null
    });

    const fetchArticles = async (page) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/article?page=${page}`);
            const data = await response.json();
            setArticles(data.data);
            setTotalPages(data.meta.last_page);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchArticles(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleEditClick = (article) => {
        setFormData({
            id: article.id,
            title: article.title,
            content: article.content,
            image_path: null // We don't have the image path, and it's not needed for editing unless changed
        });
    };

    const handleFormSubmit = async (data, isEdit) => {
        const url = isEdit ? `/api/article/${data.id}` : '/api/article';
        const method = isEdit ? 'PUT' : 'POST';
        const responseMessage = isEdit ? 'Article updated successfully' : 'New article created successfully';

        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        try {
            const response = await fetch(url, {
                method,
                body: isEdit ? JSON.stringify(data) : formData,
                headers: {
                    'Accept': 'application/json',
                    ...(isEdit && { 'Content-Type': 'application/json' })
                }
            });
            if (response.ok) {
                fetchArticles(currentPage); // Refresh articles list
                toast.success(responseMessage);
                resetForm();
            } else {
                console.error("Error submitting article:", response.statusText);
            }
        } catch (error) {
            console.error("Error submitting article:", error);
        }
    };

    const resetForm = () => {
        setFormData({ id: null, title: '', content: '', image_path: null });
    };

    return (
        <>
            <ArticleForm
                formData={formData}
                setFormData={setFormData}
                handleFormSubmit={handleFormSubmit}
                resetForm={resetForm}
            />
            <ArticleTable
                articles={articles}
                onEditClick={handleEditClick}
                deleteArticle={deleteArticle}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                loading={loading}
            />
            <ToastContainer />
        </>
    );

    async function deleteArticle(id) {
        try {
            const response = await fetch(`/api/article/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setArticles(articles.filter((article) => article.id !== id));
            } else {
                console.error("Error deleting article:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting article:", error);
        }
    }
}
