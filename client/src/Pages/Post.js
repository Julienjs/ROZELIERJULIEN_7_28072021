import React from 'react';
import AllPosts from '../components/Post/AllPosts';
import NewPostForm from '../components/Post/NewPostForm';

const Post = () => {
    return (
        <main id="main-section">
            <NewPostForm />
            <AllPosts />
        </main>
    )
};

export default Post;
