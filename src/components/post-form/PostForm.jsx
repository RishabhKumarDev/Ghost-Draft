import { useCallback, useEffect, useState } from "react";
import storageServices from "../../appwrite/storageConfig";
import databaseService from "../../appwrite/databaseConfig";
import { Button, Select, RTE, Input } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

function PostForm({ post }) {
  const [imageURL, setImageURL] = useState(null);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const { register, handleSubmit, watch, getValues, setValue, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const submit = async (data) => {
    console.log("in PostForm now, submit function provoked")
    if (post) {
    console.log("in PostForm now, submit function provoked for updating existing post", post)

      try {
        const file = data.image[0]
          ? await storageServices.uploadFile(data.image[0])
          : null;
        if (file && file.success) {
          await storageServices.deleteFile(post.featuredImage);
        }
        console.log("file", file)
    console.log("in PostForm now,file succesful" , post)
       const updatedImage = file && file.success ? file.data.$id : post.featuredImage;
        const dbPostUpdate = await databaseService.updatePost(post.$id, {
          ...data,
          featuredImage: updatedImage,
        });
    console.log("in PostForm now,dbpost succesful")
console.log("dbPostUpdate:", dbPostUpdate);

        if (dbPostUpdate.success) {
          navigate(`/post/${dbPostUpdate.data.$id}`);
        }
      } catch (error) {
        console.error("PostForm :: Submit :: Post", error);
      }
    } else {
      try {
        const file = data.image[0]
          ? await storageServices.uploadFile(data.image[0])
          : null;

        if (file && file.success) {
          data.featuredImage = file.data.$id;

          const dbPost = await databaseService.createPost({
            ...data,
            userId: userData.$id,
          });

          if (dbPost.success) {
            navigate(`/post/${dbPost.data.$id}`);
          }else{
            console.log("Post Form :: submit ::",dbPost.error.message, dbPost)
          }
        }
      } catch (error) {
        console.error("PostForm :: Submit :: elseBlock", error);
      }
    }
  };

  const slugTransformation = useCallback((value) => {
    if (value) {
      let slug = value
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove all non-word characters except space and hyphen
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/--+/g, "-"); // Replace multi hypens with one hypen
      return slug;
    }

    return "";
  }, []);

  useEffect(() => {
    const subscribe = watch((value, { name }) => {
      if (name === "title") {
        setValue(
          "slug",
          slugTransformation(value.title, {
            shouldValidate: true,
          })
        );
      }
    });

    return () => {
      subscribe.unsubscribe();
    };
  }, [watch, slugTransformation, setValue]);

  useEffect(() => {
    const getImage = async () => {
      try {
        const img = await storageServices.getFilePreview(post.featuredImage);
        if (img.success) {
          setImageURL(img.data);
        }
      } catch (error) {
        console.error("PostForm :: getImage :: ", error);
      }
    };

    if (post && post.featuredImage) getImage();
  }, [post]);

  return (
    <form onSubmit={handleSubmit(submit)} className=" flex flex-wrap">
      <div className=" w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Enter your Title..."
          className=" mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="slug"
          {...register("slug", { required: true })}
          className=" mb-4"
          onInput={(e) => {
            setValue("slug", slugTransformation(e.target.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className=" w-1/3">
        <Input
          label="Image:"
          type="file"
          className="mb-4"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className=" w-full mb-4">
            <img src={imageURL} alt={post.title} className=" rounded-lg" />
          </div>
        )}
        <Select
          label="Status :"
          options={["active", "Inactive"]}
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className=" w-full"
        >
          {post ? "UPDATE" : "POST"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
