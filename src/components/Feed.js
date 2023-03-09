import React, { useEffect, useState } from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import StoryReel from "./StoryReel";
import Post from "./Post";
import db from "./firebase";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
// import { orderBy } from "firebase/firestore";
function Feed() {
  const [posts, setPosts] = useState([]);
  const postRef = collection(db, "posts");

  useEffect(() => {
    // onSnapshot(postRef, (snapshot) => {
    //   const items = [];
    //   snapshot.docs.forEach((doc) => {
    //     items.push(doc.data());
    //     console.log(items);
    //   });
    //   //console.log(items);
    //   setPosts(items);
    //   //console.log(items);
    // });
    const getPosts = async () => {
      const data = await getDocs(postRef);
      setPosts(
        data.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }))
      );
    };
    getPosts();
  }, []);

  return (
    <div className="feed">
      {/* <StoryReel /> */}
      <MessageSender />
      {posts.map((post) => {
        return (
          <Post
            key={post.data.id}
            profilePic={post.data.profilePic}
            message={post.data.message}
            timeStamp={post.data.timeStamp}
            username={post.data.username}
            image={post.data.image}
          />
        );
      })}
    </div>
  );
}

export default Feed;
