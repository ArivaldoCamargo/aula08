
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Form from "./components/form";
import Table from "./components/table";
import { useState } from "react";
import { ToastContainer } from "react-toastify";


const client = new QueryClient();

function App() {
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    matricula: "",
    curso: "",
    bimestre: "",
  });

  function clearState() {
    setFormData({
      id: "",
      nome: "",
      matricula: "",
      curso: "",
      bimestre: "",
    });
  }

  return (
    <QueryClientProvider client={client}>
      <h1 className="text-red-600 text-3xl font-bold text-center p-12">Diário Eletrônico</h1>

      <Form
        formData={formData}
        setFormData={setFormData}
        clearState={clearState}
      />

      <Table formData={formData} setFormData={setFormData} />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;