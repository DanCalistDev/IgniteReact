import styles from "./Post.module.css";
import { format, formatDistanceToNow } from "date-fns";

import { ptBR } from 'date-fns/locale';


import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { ChangeEvent, FormEvent, useState } from "react";



interface author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'Link';
  content: string;

}

export interface PostType {
  id:number;
  author: author;
  publishedAt: Date;
  content: Content[];
}

interface IPost {
post: PostType;

}


export function Post({post }: IPost) {
  //**Hooks
  const [comments, setComments] = useState(["Muito legal, hein!"]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(
    post.publishedAt,
    "dd 'de' LLLL 'ás' HH:mm'h",
    {
      locale: ptBR,
    }
  );



  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const handleCreateNewComment = (e:FormEvent) => {
    e.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText("");
  };

  const handleNewCommentTextChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.target.setCustomValidity("")   //liberando o usuário do erro de campo obrigatório
    setNewCommentText(e.target.value);
  };

  const deleteComment = (commentToDelete: string) => {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment != commentToDelete;
    });

    setComments(commentsWithoutDeletedOne);
  };

  const handleNewCommentInvalid = (event: FormEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    target.setCustomValidity("Esse campo é obrigatório");
    //Agora eu passo para a função que cria o novo comentario, a mesma função (event.target.setCustomValidity("")),
    // só que agora vazia, informando que não está mais com erro e que o usuário digitou algo.
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {post.content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}> {line.content}</p>;
          }
          if (line.type === "Link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          onChange={handleNewCommentTextChange}
          value={newCommentText}
          placeholder="Deixe um comentário"
          required
          onInvalid={handleNewCommentInvalid}
        />

        <footer>
          <button type="submit" disabled={newCommentText.length === 0}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
