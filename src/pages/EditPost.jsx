import { useState, useEffect } from "react";
import databaseSevices from "../appwrite/databaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm, Container } from "../components/index";

function EditPost() {
  const [post, setPost] = useState(null);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const post = await databaseSevices.getPost(slug);
        if (post.success) {
          setPost(post.data);
        } else {
          throw new Error(post.error.message);
        }
      } catch (error) {
        console.error("EditPost :: getPost ::", error);
      }
    };

    if (slug) {
      getPost();
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className=" py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
