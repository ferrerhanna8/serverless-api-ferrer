import axios from 'axios';
import { useEffect, useState } from 'react';
import './DataForm.css';

function DataForm() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [blogs, setBlogs] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://lively-fairy-bd8278.netlify.app/.netlify/functions/api');
            setBlogs(response.data);
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures this effect runs only once after component mount

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://lively-fairy-bd8278.netlify.app/.netlify/functions/api/create', {
                title: title,
                author: author,
                message: message
            });
            console.log(response.data);
            setTitle('');
            setAuthor('');
            setMessage('');
            fetchData(); // Fetch updated data after successful submission
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    const handleDelete = (id) => {
        axios
            .delete(`https://lively-fairy-bd8278.netlify.app/.netlify/functions/api/${id}`)
            .then((response) => {
                console.log('Data deleted successfully:', response.data);
                fetchData();
                // No need to set deleteId here as we're handling individual blog deletions
            })
            .catch((error) => {
                console.error('Failed to delete data', error);
            });
    };
    

    return (
        <div className='container'>
            <div className='blog-form'>
                <h2>Create Blog Post</h2>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="author">Author:</label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button className='submit-button' type="submit">Submit</button>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter ID for Delete"
                            value={deleteId}
                            onChange={(e) => setDeleteId(e.target.value)}
                        />
                        <button onClick={() => handleDelete(deleteId)} className="delete-button">Delete</button>
                    </div>

                </form>
            </div>
            <div className='blog-post'>
                <h2>Blog Posts</h2>
                {blogs.map((blog) => (
                    <div key={blog._id}>
                        <h3>Title: {blog.title}</h3>
                        <p>Author: {blog.author}</p>
                        <p>Message: {blog.message}</p>
                        <div className='blog-footer'>
                            <em>Created At: {new Date(blog.createdAt).toLocaleString()}</em> {/* Display creation time */}
                            <button className='edit-button'>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DataForm;
