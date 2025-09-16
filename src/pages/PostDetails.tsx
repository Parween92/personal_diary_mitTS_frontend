import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../components/AllRequest";

type Post = {
  id: string;
  title: string;
  author: string;
  status: string;
  cover: string;
  content: string;
  category?: keyof typeof categoryIcons;
};
import { BiArrowBack } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

const categoryIcons = {
  Adventure: "🧗‍♂️",
  Relaxation: "🌴",
  Culture: "🏛️",
  Nature: "🌲",
};

export default function PostDetails() {
  //Deklarationen und teilweise Type Narrowing
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // NUR JS ohne Narrowing/Prüfung
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const res = await getPostById(id);
  //       setPost(res.data.data);
  //     } catch (err) {
  //       console.error("Error loading post:", err);
  //       setError("Post not found.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchPost();
  // }, [id]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError("Post not found.");
        setLoading(false);
        return;
      }
      try {
        const res = await getPostById(id);
        setPost(res.data.data);
      } catch (err) {
        console.error("Error loading post:", err);
        setError("Post not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading)
    return <p className="text-gray-600 text-center m-10">Loading Post...</p>;
  if (error) return <p className="text-gray-600 text-center m-10">{error}</p>;
  if (!post) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-8 lg:my-12">
      <div
        className="text-white p-4 sm:p-6 lg:p-8 rounded-lg relative flex flex-col justify-between shadow-lg"
        style={{
          background:
            "linear-gradient(to right, rgba(168, 85, 247, 0.7), rgba(59, 130, 246, 0.7))",
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold italic text-text">{post.title}</h1>
            <button
              onClick={() => navigate(`/posts/${id}/edit`)}
              className="hover:bg-hover flex items-center justify-center gap-2 font-bold bg-primary
               text-white px-4 py-2 rounded transition-colors duration-200 self-start"
            >
              <FiEdit size={18} />
              <span className="hidden sm:inline">Edit</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h2 className="text-lg sm:text-lg font-bold text-accent">
              by {post.author}
            </h2>
            <span className="text-sm sm:text-base text-accent">
              📋Post is <strong>{post.status}</strong>
            </span>
          </div>

          <div className="w-full">
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded"
            />
          </div>

          <p className="text-base sm:text-lg text-text leading-relaxed">
            {post.content}
          </p>

          <p className="text-base sm:text-lg text-accent">
            Category:{" "}
            {post.category ? (
              <>
                {categoryIcons[post.category] || "❓"} {post.category}
              </>
            ) : (
              "No category"
            )}
          </p>
        </div>

        <div className="flex gap-4 mt-6 sm:mt-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 bg-[var(--secondary)] 
            hover:bg-[var(--primary)] text-white px-4 py-2 rounded font-bold 
            transition-colors duration-200 w-full sm:w-auto"
          >
            <BiArrowBack size={20} />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
