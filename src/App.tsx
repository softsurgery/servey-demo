import { Layout } from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CategoriesHome } from "./components/Categories/CategoryHome";
import { SettingsHome } from "./components/SettingsHome";
import { ThemeProvider } from "./components/theme-provider";

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
      element: <SettingsHome />,
    },
  ]);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Layout>
            <RouterProvider router={router}/>
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
