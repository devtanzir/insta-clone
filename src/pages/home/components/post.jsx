import { PlusSquare } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Bookmark } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Heart } from "lucide-react";
import { formatPostTime } from "../../../utils/utils";
import Modal from "../../../components/shared/modal";
import PostOptionsList from "./post-options-list";
import NoPost from "../../../assets/images/no-post.webp";
import usePost from "../hooks/usePost";
import HeartFill from "../../../assets/icons/heart";

const Post = () => {
  const {
    handleDelete,
    handleDeleteButton,
    handleEdit,
    handleToggle,
    handleToggleEdit,
    handleLike,
    postId,
    open,
    openEdit,
    posts,
    showHeart,
  } = usePost();

  return (
    <>
      <div className="p-4">
        {posts.length > 0 ? (
          posts?.map((post, index) => (
            <div className="bg-black" key={post.id}>
              {/* Post Header */}
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.avatar}
                    alt={post.authorName}
                    className="size-8 rounded-full object-cover"
                  />
                  <div className="flex items-center">
                    <span className="font-semibold">{post.authorName}</span>
                    <span className="mx-1">•</span>
                    <span className="text-gray-500">
                      {formatPostTime(post.createdAt)}
                    </span>
                  </div>
                </div>
                <button onClick={() => handleDeleteButton(post.id)}>
                  <MoreHorizontal className="size-6" />
                </button>
              </div>
              <div
                className="relative"
                onDoubleClick={() => handleLike(post.id)}
              >
                <img
                  src={post.postImage}
                  alt={post.postDetails}
                  className="w-full rounded object-cover select-none"
                />
                {showHeart[post.id] && (
                  <div className="absolute inset-0 flex items-center justify-center animate-heart">
                    <Heart className="w-24 h-24 text-red-500 fill-red-500" />
                  </div>
                )}
              </div>
              {/* Post Image */}

              {/* Post Actions */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleLike(post.id)}>
                      {post.like > 0 ? (
                        <HeartFill />
                      ) : (
                        <Heart className="size-6" />
                      )}
                    </button>
                    <button>
                      <MessageCircle className="size-6" />
                    </button>
                    <button>
                      <PlusSquare className="size-6" />
                    </button>
                  </div>
                  <button>
                    <Bookmark className="size-6" />
                  </button>
                </div>
                <div className="text-left">
                  <p className="font-semibold mb-1">{post.like} likes</p>
                  <p className="text-sm line-clamp-1">
                    {post.authorName} {post.postDetails}
                  </p>
                </div>

                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full mt-3 bg-transparent text-sm placeholder-gray-600 focus:outline-none"
                />
              </div>
              {index < posts.length - 1 && (
                <div className="space-y-2 border-b-[.5px] border-gray-800" />
              )}
              <Modal open={open} handleToggle={handleToggle} options>
                <PostOptionsList
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  post={post}
                />
              </Modal>
              <Modal
                open={openEdit}
                handleToggle={handleToggleEdit}
                formValue={posts.find((post) => post.id === postId)}
              />
            </div>
          ))
        ) : (
          <img src={NoPost} alt="no post" className="rounded" />
        )}
      </div>
    </>
  );
};

export default Post;
