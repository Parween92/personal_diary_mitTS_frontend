import { useState } from "react";
import { createPost } from "../components/AllRequest";
import { MdSave } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import type { AxiosError } from "axios";

//Type Deklaration in TS
type PostFormProps = {
  onSuccess: () => void;
};
//Typdeklaration in TS
export default function PostForm({ onSuccess }: PostFormProps) {
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    content: "",
    cover: "",
    status: "",
    category: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (error) setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const categoryIcons = {
    Adventure: "🧗‍♂️",
    Relaxation: "🌴",
    Culture: "🏛️",
    Nature: "🌲",
  };

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
    //für Uni-tests: Titel muss mindestens 3 Zeichen lang sein

    if (formData.title.trim().length < 3) {
      setError("Titel muss mindestens 3 Zeichen lang sein.");
      return;
    }

    try {
      const response = await createPost(formData);
      setFormData((prev) => ({ ...prev, ...response.data }));

      setError(null);
      setSuccess(true);
      if (onSuccess) onSuccess();

      Swal.fire({
        toast: true,
        position: "center",
        icon: "success",
        title: "your Form has been submitten",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });

      //für Uni-tests: wenn klappt dann zur Startseite navigieren sonst Fehlermeldung anzeigen
      navigate("/");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const axiosErr = err as AxiosError;
      const resp = axiosErr?.response;
      const data = resp?.data as any;
      const backendMsg = data?.msg || data?.message || data?.error;
      const isBadRequest = resp?.status === 400;

      setError(
        isBadRequest
          ? backendMsg || "Bitte Vor- und Nachname, beide mit Großbuchstaben."
          : backendMsg || "Creation failed."
      );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <form
        className="my-6 sm:my-8 lg:my-12 bg-white border border-[var(--primary)] p-4 sm:p-6 lg:p-8 
      rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-gray-600">
          Create new post
        </h2>

        <div className="space-y-4">
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Autor*in"
            className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${
              error ? "border-red-500" : "border-gray-400"
            }`}
          />

          <div className="text-sm text-gray-500 mt-1">
            Bitte Vor- und Nachname, beide mit Großbuchstaben
          </div>

          {error && (
            <p className="text-red-600 text-sm font-semibold" role="alert">
              {error}
            </p>
          )}

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Titel"
            required
            className="w-full border border-gray-400 px-3 py-2 rounded focus:outline-none 
            focus:ring-2 focus:ring-[var(--primary)]"
          />

          <div className="text-sm text-gray-500 mt-1">
            Titel muss mindestens 3 Zeichen lang sein
          </div>

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Inhalt"
            required
            rows={4}
            className="w-full border border-gray-400 px-3 py-2 rounded focus:outline-none 
            focus:ring-2 focus:ring-[var(--primary)] min-h-[120px] resize-vertical"
          />

          <input
            name="cover"
            value={formData.cover}
            onChange={handleChange}
            placeholder="Bild-URL"
            required
            className="w-full border border-gray-400 px-3 py-2 rounded focus:outline-none
             focus:ring-2 focus:ring-[var(--primary)]"
          />

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
                className="text-[var(--primary)] w-full border border-gray-400 px-3 py-2 
                rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
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
                className="text-[var(--primary)] w-full border border-gray-400 px-3 py-2 rounded 
                focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="">-- Select Status --</option>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--secondary)]
             px-4 py-2 text-white rounded font-bold transition-colors duration-200 w-full sm:w-auto mt-6"
          >
            <MdSave size={20} />
            Save
          </button>

          {success && (
            <p className="text-accent text-lg sm:text-xl font-semibold text-center mt-4">
              Post saved successfully!
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
