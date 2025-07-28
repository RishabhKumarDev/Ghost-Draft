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
    console.log("fetching post in Pages :: post :: get Post");
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
        const imgUrl = await storageServices.getFilePreview(
          post?.featuredImage
        );
        if (imgUrl.success) {
          console.log("Pages :: Post :: getImagURL :: ", imgUrl.data);
          setImageUrl(imgUrl.data);
        } else {
          throw new Error(imgUrl.error.message);
        }
      } catch (error) {
        console.error("Post :: GetImageUrl :: ", error);
      }
    };

    if (post?.featuredImage) getImgURL();
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
        <div className="w-full flex justify-center mb-6 relative border border-zinc-700 rounded-xl p-4 bg-zinc-900">
          <img
            src={imageUrl}
            alt={post.title}
            className="rounded-xl w-full max-h-[500px] object-contain shadow-[0_0_30px_rgba(251,191,36,0.1)]"
          />

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
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {post.title}
          </h1>
        </div>
        <div className="browser-css text-zinc-300 leading-relaxed text-base md:text-lg space-y-4">
          {parse(post.content || "")}
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
