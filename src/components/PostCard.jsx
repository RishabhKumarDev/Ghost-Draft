import { Link } from "react-router-dom";
import storageServices from "../appwrite/storageConfig";
import { useEffect, useState } from "react";

function PostCard({ $id, title, featuredImage }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const loadPreview = async () => {
      try {
        const img = await storageServices.getFilePreview(featuredImage);
        if (img.success) {
          setImageUrl(img.data);
        } else {
          console.error(" PostCard :: loadPreview ", img.error);
        }
      } catch (error) {
        console.error("PostCard :: loadPreview", error);
      }
    };

    if (featuredImage) loadPreview();
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className=" w-full rounded-lg bg-gray-100 p-4">
        <div className=" w-full justify-center mb-4">
          {imageUrl ? (
            <img
              className=" rounded-xl"
              src={`${imageUrl}`}
              alt="some photo dude..."
            />
          ) : (
            <div className="h-48 bg-gray-300 animate-pulse" />
          )}
        </div>
        <h2 className=" text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
