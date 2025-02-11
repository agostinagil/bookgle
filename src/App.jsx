import "./App.css";
import { BooksProvider } from "./contexts/BookContext";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <>
      <BooksProvider>
        <AppRoutes />
      </BooksProvider>
    </>
  );
}

export default App;
