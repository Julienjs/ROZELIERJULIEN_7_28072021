import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../actions/post.action';
import { isEmpty } from '../Utils'
import CardAllPosts from './CardAllPosts';
import "./Post.css"
import image from '../../logo/icon.png';




const AllPosts = () => {
    const [count, setCount] = useState(5);
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const AllPosts = useSelector((state) => state.postReducer);

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadPost(true);
        }
    };

    useEffect(() => {
        if (loadPost) {
            dispatch(getAllPosts(count));
            setLoadPost(false)
            setCount(count + 5);
        }
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore)
    }, [loadPost, dispatch, count]);


    return (
        <section id="section-post">
            <div className="section-title-post">
                <img src={image} alt="logo" width="40px" />
                <h2 tabIndex="0" aria-label="section fil d'actualité">Fil d'actualité</h2>
            </div>
            {AllPosts.length === 0 &&
                <>
                    <p>Il n'y a pas de publication...</p>
                    <p>Soyez le premier à publier !</p>
                    <img width="350px" src={image} alt="logo entreprise"></img>
                </>
            }
            {!isEmpty(AllPosts[0]) &&
                AllPosts.map((post) => {
                    return <CardAllPosts post={post} key={post.id} />
                })
            }


        </section >
    )
};
export default AllPosts;
