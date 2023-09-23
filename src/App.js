import { Route, Routes } from "react-router-dom";
import { CardDetailPage, HomePage, NotFound, OrderPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<CardDetailPage />} />
      <Route path="/order/:slug/:checkin/:checkout/:numberOfGuests" element={<OrderPage />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
