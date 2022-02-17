import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CommentsArticle, CommentWrapper, CommentInfo } from './Comments.style'

export const Comments = ({ comments, loading, setComments }) => {
  const { postId } = useParams();

  return (
    <CommentsArticle>
      {loading && <div> loading... </div>}
      {comments.map(comment => (
        <CommentWrapper key={comment.id}>
          <img src="img/profile.png" alt="프로필 이미지" />
          <CommentInfo>
            <p><strong>elice </strong>{comment.title}</p>
            <span>3시간 전 </span>
            <button onClick={() => {
              async function deleteData() {
                await axios.delete("http://elice-kdt-sw-1st-team8.elicecoding.com/api/posts/" + postId + "/comment/" + comment.id);
                const response = await axios.get("http://elice-kdt-sw-1st-team8.elicecoding.com/api/posts/" + postId + "/comment");
                setComments(response.data);
              }
              deleteData();
            }}>· <strong>삭제</strong></button>
          </CommentInfo>
        </CommentWrapper>
      ))}
    </CommentsArticle>
  );
};