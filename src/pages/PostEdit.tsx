import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../components/AllRequest";
import { MdSave } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import Swal from "sweetalert2";

const categoryIcons = {
  Adventure: "🧗‍♂️",
  Relaxation: "🌴",
  Culture: "🏛️",
  Nature: "🌲",
};

export default function PostEdit() {
  //Deklaration in TS von useParams mit optionaler id
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    cover: "",
    content: "",
    category: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        //Narrowing in TS
        if (!id) {
          setError("Post not found.");
          setLoading(false);
          return;
        }
        const res = await getPostById(id);
        setPost(res.data.data);
        setFormData({
          title: res.data.data.title,
          author: res.data.data.author,
          cover: res.data.data.cover,
          content: res.data.data.content,
          category: res.data.data.category,
          status: res.data.data.status,
        });
      } catch (err) {
        console.error("Error loading post:", err);
        setError("Post not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  //Typdeklaration in TS
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //Typdeklaration in TS
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.author ||
      !formData.title ||
      !formData.content ||
      !formData.cover ||
      !formData.status
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      if (!id) return;
      await updatePost(id, formData);
      setError(null);
      setSuccess(true);

      setTimeout(() => setSuccess(false), 3000);

      Swal.fire({
        toast: true,
        position: "center",
        icon: "success",
        title: "Post has been updated",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });

      navigate("/");
    } catch (err) {
      console.error("Error updating:", err);
      setError("Update failed.");
    }
  };

  if (loading)
    return <p className="text-gray-600 text-center m-10">Loading Post...</p>;
  if (error && !formData.title)
    return <p className="text-[var(--primary)]">{error}</p>;
  if (!post) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <form
        className="my-6 sm:my-8 lg:my-12 border border-[var(--primary)] p-4 sm:p-6 lg:p-8 rounded-lg
         bg-white shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-gray-600">
          Edit post
        </h2>

        {error && <p className="text-[var(--primary)] mb-4">{error}</p>}

        <div className="space-y-4">
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Autor*in"
            className="w-full border border-gray-400 text-gray-600 px-3 py-2 rounded
             focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Titel"
            required
            className="w-full border border-gray-400 text-gray-600 px-3 py-2 rounded 
            focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Inhalt"
            required
            rows={4}
            className="w-full border border-gray-400 text-gray-600 px-3 py-2 rounded 
            focus:outline-none focus:ring-2 focus:ring-[var(--primary)] min-h-[120px] resize-vertical"
          />

          <input
            name="cover"
            value={formData.cover}
            onChange={handleChange}
            placeholder="Bild-URL"
            required
            className="w-full border border-gray-400 text-gray-600 px-3 py-2 rounded 
            focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />

          {formData.cover && (
            <div className="w-full">
              <img
                src={formData.cover}
                alt="Preview"
                className="w-full max-w-md mx-auto h-40 sm:h-52 lg:h-64 object-cover border border-gray-400 rounded"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="category"
                className="text-gray-600 block font-bold mb-2"
              >
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="text-[var(--primary)] w-full border border-gray-400 px-3 py-2 rounded
                 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="">-- Select Category --</option>
                {Object.entries(categoryIcons).map(([cat, icon]) => (
                  <option key={cat} value={cat}>
                    {icon} {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="text-gray-600 block font-bold mb-2"
              >
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="text-[var(--primary)] w-full border border-gray-400 px-3 py-2 rounded focus:outline-none 
                focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="">-- Select Status --</option>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 bg-[var(--secondary)] hover:bg-[var(--primary)]
               text-white px-4 py-2 rounded font-bold transition-colors duration-200 w-full sm:w-auto"
            >
              <BiArrowBack size={20} />
              Go back
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[var(--primary)] px-4 py-2
               hover:bg-[var(--secondary)] text-white rounded font-bold transition-colors duration-200 w-full sm:w-auto"
            >
              <MdSave size={20} />
              Save
            </button>
          </div>

          {success && (
            <p className="text-[var(--primary)] text-lg sm:text-xl font-semibold mt-4 text-center">
              Post updated successfully!
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
