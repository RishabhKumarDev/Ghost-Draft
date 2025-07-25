import { useState, useEffect } from "react";
import { Container, Button } from "../components/index";
import parse from "html-react-parser";
import databaseServices from "../appwrite/databaseConfig";
import storageServices from "../appwrite/storageConfig";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  // fetch post
  useEffect(() => {
    const getPost = async () => {
      try {
        const post = await databaseServices.getPost(slug);
        if (post.success) {
          setPost(post.data);
        } else {
          throw new Error(post.error.message);
        }
      } catch (error) {
        console.error("Post :: getPost ::", error);
      }
    };

    if (slug) {
      getPost();
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  // get image preview
  useEffect(() => {
    const getImgURL = async () => {
      try {
        const imgUrl = await storageServices.getFilePreview(post.featuredImage);
        if (imgUrl.success) {
          setImageUrl(imgUrl.data);
        } else {
          throw new Error(imgUrl.error.message);
        }
      } catch (error) {
        console.error("Post :: GetImageUrl :: ", error);
      }
    };

    if (post.featuredImage) getImgURL();
  }, [post]);

  // delete post
  const deletePost = async () => {
    try {
      const deletedPost = await databaseServices.deletePost(slug);
      if (deletedPost.success) {
        const imgDel = await storageServices.deleteFile(post.featuredImage);

        if (imgDel.success) navigate("/");
      } else {
        throw new Error(deletedPost.error.message);
      }
    } catch (error) {
      console.error("Post :: DeletePost :: ", error);
    }
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img src={imageUrl} alt={post.title} className="rounded-xl" />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content || "")}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
