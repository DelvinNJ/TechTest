import React from "react";

export default function ArticleForm({ formData, setFormData, handleFormSubmit, resetForm }) {
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const isEdit = formData.id !== null;
        handleFormSubmit(formData, isEdit);
    };

    return (
        <div className="w-40 mr-10">
            <form onSubmit={onSubmit}>
                <div className="form-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" placeholder="Article title" required
                        value={formData.title}
                        onChange={handleChange} />
                </div>
                <div className="form-field">
                    <label htmlFor="content">Content</label>
                    <textarea name="content" rows="5" placeholder="Content" id="content"
                        value={formData.content}
                        onChange={handleChange}>
                    </textarea>
                </div>
                <div className="form-field">
                    <label htmlFor="image_path">Image</label>
                    <input type="file" id="image_path" name="image_path"
                        onChange={handleChange} />
                </div>
                <div className="form-field justify-end">
                    <input type="reset" className="input-button" onClick={resetForm} value="Cancel" />
                    <input className="input-button" type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
}
