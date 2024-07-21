import { Layout } from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CategoriesHome } from "./components/CategoriesHome";
import { SettingsHome } from "./components/SettingsHome";


const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
      path: "/categories",
      element: <CategoriesHome />,
    },
    {
      path: "/settings",
      element: <SettingsHome />
    },
  ]);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </QueryClientProvider>
    </div>
  );
}

export default App;
