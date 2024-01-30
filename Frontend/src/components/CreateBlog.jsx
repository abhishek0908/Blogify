import { useState } from "react";

const CreateBlog = () => {
    const [createBlog, setCreateBlog] = useState({
        title: "",
        description: ""
    });

    const [errorMessage, setErrorMessage] = useState({});

    const [submitForm, setSubmitForm] = useState(false);

    const handleChange = (e) => {
        setCreateBlog({
            ...createBlog,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('jwtToken');

        try {
            const blog = await fetch('http://localhost:3000/addblog', {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createBlog)
            });

            const resData = await blog.json();

            if (blog.ok) {
                setSubmitForm(true);
            } else {
                console.log(resData);
                setErrorMessage(resData);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="createblog">
            <form onSubmit={handleSubmit}>
                <h1>Create Blog</h1>
                <input name="title" type="text" placeholder="Enter Title" value={createBlog.title} onChange={handleChange} />
                <p>{!submitForm && errorMessage.errors && errorMessage.errors.title}</p>
                <textarea name="description" placeholder="Enter Description" className="description" type="text" value={createBlog.description} onChange={handleChange} />
                <p>{!submitForm&&errorMessage.errors && errorMessage.errors.content}</p>
                <button type="submit">Post</button>
                {submitForm && "Blog is Published"}
            </form>
        </div>
    );
}

export default CreateBlog;
