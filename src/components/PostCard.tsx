import { deletePost } from "./AllRequest";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const categoryIcons = {
  Adventure: "🧗‍♂️",
  Relaxation: "🌴",
  Culture: "🏛️",
  Nature: "🌲",
};

// Deklaration mit interface nicht Type in TS
interface Post {
  id: string;
  title: string;
  author: string;
  status: string;
  cover: string;
  content: string;
  category?: keyof typeof categoryIcons;
}

interface PostCardProps {
  post: Post;
  onDeleteSuccess: () => void;
}

function PostCard({ post, onDeleteSuccess }: PostCardProps) {
  console.log("Post im Card:", post);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!post?.id) {
      console.warn("No ID ");
      return;
    }

    console.log("🔍 delete Post with ID:", post.id);
    try {
      await deletePost(post.id);
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }

      Swal.fire({
        toast: true,
        position: "center",
        icon: "success",
        title: "Post was deleted",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const goToDetails = () => navigate(`/posts/${post.id}`);
  const goToEdit = () => navigate(`/posts/${post.id}/edit`);

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all 
    duration-300 overflow-hidden border border-gray-100 w-full max-w-sm mx-auto sm:max-w-none"
    >
      {/* Image Section */}
      <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Edit Button */}
        <button
          onClick={goToEdit}
          className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-blue-500  
          flex items-center gap-2 font-bold 
                    bg-primary text-white  px-3 py-1 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Edit post"
        >
          <FiEdit size={16} />
        </button>
      </div>

      <div className="p-4 sm:p-5 md:p-6 space-y-3">
        <div className="space-y-2">
          <h1 className="text-lg sm:text-xl font-bold text-gray-600 line-clamp-2 transition-colors">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-purple-600 font-medium">{post.author}</span>
            <span className="text-gray-600">•</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                post.status === "published"
                  ? "bg-[#3b82f6] text-white"
                  : "bg-[#3b82f6] text-white"
              }`}
            >
              {post.status}
            </span>
          </div>
        </div>

        <p className="text-gray-800 text-sm sm:text-base line-clamp-3 leading-relaxed">
          {post.content}
        </p>

        <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
          <span className="text-lg">
            {categoryIcons[post.category as keyof typeof categoryIcons] || "❓"}
          </span>
          <span>{post.category || "No category"}</span>
        </div>

        <div className="flex gap-4 pt-4 border-t border-gray-100">
          <button
            onClick={goToDetails}
            className="flex items-center justify-center gap-2 bg-[var(--secondary)] hover:bg-[var(--primary)]
                      text-white px-4 py-2 rounded font-bold transition-colors duration-200"
          >
            See more details ➤
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--secondary)]
                      text-white px-4 py-2 rounded font-bold transition-colors duration-200"
          >
            <MdDeleteForever size={18} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default PostCard;
