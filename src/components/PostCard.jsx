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
    <Link to={`/post/${$id}`}  className="group" >
      <div className=" w-full rounded-lg bg-zinc-900 border border-amber-100 shadow-[0_0_20px_-5px_rgba(251,191,36,0.15)] hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.25)] transition-all duration-300 p-4 hover:-translate-y-1">

        <div className=" w-full justify-center mb-4">

          {imageUrl ? (
            <img
              className=" rounded-xl"
              src={`${imageUrl}`}
              alt="some photo dude..."
            />
          ) : (
            <div className="h-48 bg-zinc-800 animate-pulse" />
          )}
        </div>
        <h2 className=" text-xl font-bold text-white group-hover:text-amber-400 transition-all duration-300">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
