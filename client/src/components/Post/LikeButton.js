import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likePost } from '../../actions/post.action';




const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState([]);
    const dispatch = useDispatch();


    const like = () => {
        dispatch(likePost(post.id))
        if (liked.includes(post.id)) {
            setLiked(
                liked.filter((id) => {
                    return id !== post.id;
                })
            );
        } else {
            setLiked([...liked, post.id])
        }
    };


    return (
        <div>
            <div>
                <div className="block-comments"
                    onClick={like}
                    tabIndex="0"
                    aria-label={
                        `Ajouter un j'aime actuellement  
                        ${post.Likes.length} 
                        qui on aimé cette publication`
                    }>
                    <i className="far fa-heart"></i>
                    <p aria-hidden="true"
                        style={{ marginLeft: "3px" }}>
                        {post.Likes.length}
                    </p>
                </div>
            </div>
        </div>
    )
};

export default LikeButton;
