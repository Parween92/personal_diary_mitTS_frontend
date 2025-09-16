import Home from "./pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import PostDetails from "./pages/PostDetails.jsx";
import PostForm from "./pages/PostForm.jsx";
import PostEdit from "./pages/PostEdit.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/posts" element={<PostForm onSuccess={() => {}} />} />
          <Route path="/posts/:id/edit" element={<PostEdit />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
