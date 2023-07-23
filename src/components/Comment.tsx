import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";
import { useState } from "react";

import { ThumbsUp, Trash } from "phosphor-react";



interface ICommnet {
  content: string
  onDeleteComment: (comment: string) => void
}

export function Comment({ content, onDeleteComment }:ICommnet) {
  const [likeCount, setLikeCount] = useState(0);

  const handleDeleteComment = () => {
    onDeleteComment(content);
  };

  const handleLikeComment = () => {
    setLikeCount((state) => {   //forma mais segura de se usar
         return state + 1;
    })
  };

  // const handleLikeComment = (state) => {
  //   setLikeCount(likeCount + 1);
  // };



  return (
    <div className={styles.comment}>
      <Avatar src="https://github.com/diego3g.png" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Diego Fernandes</strong>
              <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:00">
                Cerca de 1h atrás
              </time>
            </div>

            <button title="Deletar comentário" onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
