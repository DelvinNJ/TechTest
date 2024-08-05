import React from "react";

export default function ArticleTable({
    articles,
    onEditClick,
    deleteArticle,
    currentPage,
    totalPages,
    handlePageChange,
    loading
}) {
    return (
        <div className="w-60 article-table">
            <div className="text-center">
                <table className="articleTable">
                    <thead>
                        <tr>
                            <th>SNO</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4}>Loading....</td>
                            </tr>
                        ) : (articles.length ? articles.map((article, index) => (
                            <tr key={article.id}>
                                <td>{index + 1 + ((currentPage - 1) * 15)}</td>
                                <td>{article.title}</td>
                                <td><img src={article.imagePath} width={100} /></td>
                                <td>
                                    <a className="text-primary mx-2 text-decoration-none cursor-pointer"
                                        onClick={() => onEditClick(article)}>
                                        Edit
                                    </a>
                                    <a className="text-danger text-decoration-none cursor-pointer"
                                        onClick={() => deleteArticle(article.id)}>
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        )) :
                            <tr>
                                <td colSpan={4}>No articles found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="pagination">
                    <button
                        className="btn btn-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span> Page {currentPage} of {totalPages} </span>
                    <button
                        className="btn btn-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
