import { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index";
import databaseServices from "../appwrite/databaseConfig";
import GhostLoader from "../assets/loader/GhostLoader";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await databaseServices.getPosts();
        if (posts.success) {
          setPosts(posts.data.documents);
        } else {
          throw new Error(posts.error.message);
        }
      } catch (error) {
        console.error("Home :: GetPosts ::", error);
      }
    };

    getPosts();
  }, []);

  if (posts.length === 0) {
    return (
      <div className=" w-full py-8 mt-4 text-center">
        <Container>
          <div className=" flex flex-wrap">
            <div className=" py-2 w-full">
             <GhostLoader text="LogIN dude..."/>
            </div>
          </div>
        </Container>
      </div>
    );
  }
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

export default Home;
