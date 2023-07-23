import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Post, PostType } from './components/Post';


import './global.css';
import styles from './App.module.css';

export function App() { 

const posts: PostType[] = [
  {
    id:1,
    author:{
      avatarUrl: "https://github.com/maykbrito.png",
      name: 'Mayk Brito',
      role: 'Educator @Rocketseat'
    } ,
    content: [
      {type:'paragraph', content: 'Fala galeraa 👋'},
      {type:'paragraph', content: 'Acabei de subir mais um projeto no meu portifólio. É um projeto que fiz no NLW Return, evento da Rocketseat.O nome do projeto é DoctorCare 🚀 '},
      {type:'Link', content: '👉 jane.design/doctorcare'},

    ],
    publishedAt: new Date('2023-06-07 12:36:00')
  },
  {
    id:2,
    author:{
      avatarUrl: "https://github.com/diego3g.png",
      name: 'Diego',
      role: 'CTO @Rocketseat'
    } ,
    content: [
      {type:'paragraph', content: 'Fala meus amigos!!! 👋'},
      {type:'paragraph', content: 'Acabei de subir também o meu projeto para o meu portifólio. É um projeto que fiz no NLW Return, evento da Rocketseat.O nome do projeto é DoctorCare 🚀 '},
      {type:'Link', content: '👉 jane.design/doctorcare'},

    ],
    publishedAt: new Date('2023-06-07 12:36:00')
  }
]

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
       <Sidebar />
        <main>

       {posts.map(post => {
          return (
           <Post 
           key={post.id}
           post={post}
           
           />
            )
            
        })
       }
        </main>
        </div>
    </div>
  );
}
