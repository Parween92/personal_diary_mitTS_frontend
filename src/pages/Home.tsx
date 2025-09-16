import { useEffect, useState } from "react";
import { getAllPosts } from "../components/AllRequest";
import PostForm from "./PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [Posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const response = await getAllPosts();
      setPosts(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllPosts();
  }, []);

  // Callback handleSuccess an PostForm übergeben:
  // --> um nach erfolgreichem Post neue Posts zu laden & Formular zu schließen
  const handleSuccess = () => {
    setShowForm(false);
    fetchAllPosts();
  };

  return (
    <div className="w-full">
      {/*Wenn showForm true ist, wird <PostForm /> angezeigt. */}
      {showForm && (
        <div className="mb-8">
          <PostForm onSuccess={handleSuccess} />
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">
              Loading your diary entries...
            </p>
          </div>
        </div>
      ) : (
        <>
          {Posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Welcome to Your Personal Diary!
                </h2>
                <p className="text-gray-500 text-lg mb-6">
                  No posts yet. Start writing your first diary entry!
                </p>
                <div className="text-6xl mb-4">📝</div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
              {Posts.map((post) => (
                <PostCard
                  key={(post as any).id}
                  post={post}
                  onDeleteSuccess={fetchAllPosts}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
