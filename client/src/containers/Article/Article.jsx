import { Main, PostArticleWrapper } from "./Article.style";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import PostArticle from "../../components/PostArticle";
import Comment from "../../components/Comment";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Article() {
  const [article, setArticle] = useState({});
  const { postId } = useParams();

  const handleLikeClick = async () => {
    console.log("Like");
  };

  const handleCommentClick = async () => {
    console.log("Comment");
  };

  const handleEditClick = async () => {
    console.log("Edit");
  };

  const handleTrashClick = async () => {
    // await axios.put("")
    console.log("Trash");
  };

  const getPost = () => {
    axios
      .get(`/api/posts?postId=${postId}`)
      .then(res => {
        setArticle(res.data.post);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <Main>
      <Header />

      <PostArticleWrapper>
        {/* {console.log(Boolean(article))}
        {console.log(article.author)} */}
        {article.author && (
          <PostArticle
            title={article.title}
            profileImgUrl={article.author.profileImg}
            author={article.author.name}
            date={article.createdAt}
            likeNum={article.likes || 0}
            contents={article.contents}
          />
        )}
        <SideBar
          likeHandler={handleLikeClick}
          commentHandler={handleCommentClick}
          trashHandler={handleTrashClick}
          postId={postId}
        />
      </PostArticleWrapper>
      <Comment />
    </Main>
  );
}