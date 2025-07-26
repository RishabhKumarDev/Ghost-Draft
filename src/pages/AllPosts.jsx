import databaseSevices from "../appwrite/databaseConfig";
import { PostCard, Container } from "../components/index";
import { useState, useEffect } from "react";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await databaseSevices.getPosts();
        if (posts.success) {
          setPosts(posts.data.documents);
        } else {
          throw new Error(posts.error.message);
        }
      } catch (error) {
        console.error("AllPosts :: getPosts ::", error);
      }
    };

    getPosts();
  }, []);
  return (
    <div className=" w-full py-8">
      <Container>
        <div className=" flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className=" p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
