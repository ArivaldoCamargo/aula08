import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getAlunos from "../../requests/aluno";
import { removerAluno } from "../../requests/aluno";
import { toast } from "react-toastify";
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import Modal from 'react-modal';
import { useState } from 'react';
import "./modal.css";

export default function Table(props) {
  const queryClient = useQueryClient();
  const { formData, setFormData } = props;
  const [showModal, setShowModal] = useState(false);
  const [deletingAlunoId, setDeletingAlunoId] = useState(null);

  const { data, isFetching } = useQuery(["@alunos"], getAlunos, {
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation(removerAluno, {
    onSuccess: () => {
      queryClient.invalidateQueries(["@alunos"]);
      toast.success("Apagado com sucesso!");
      setShowModal(false);
      setDeletingAlunoId(null);
    },
    onError: () => {
      toast.error("Erro ao apagar aluno");
    },
  });

  if (isFetching) {
    return <h3>Buscando alunos...</h3>;
  }

  function apagarAluno(id) {
    setDeletingAlunoId(id);
    setShowModal(true);
  }

  function preencherCampos(aluno) {
    setFormData({ ...aluno, id: aluno._id });
  }

  function confirmarExclusao() {
    mutate(deletingAlunoId);
  }

  function cancelarExclusao() {
    setShowModal(false);
    setDeletingAlunoId(null);
  }
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  
  return (
    <div className="font-poppins">
      <h2 className="text-red-600 text-3xl font-bold  p-6">Listagem de Alunos</h2>
      <h3 className="text-red-600 text-2xl font-bold text-right  p-6">Alunos Cadastrados: {data.length}</h3>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2  px-4 font-semibold text-left">Ordem</th>
            <th className="py-2  px-4 font-semibold text-left">Nome</th>
            <th className="py-2  px-4 font-semibold text-left">Matrícula</th>
            <th className="py-2  px-4 font-semibold text-left">Curso</th>
            <th className="py-2  px-4 font-semibold text-left">Bimestre</th>
            <th className="py-2  px-4 font-semibold text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((aluno, index) => (
            <tr className="border-b">
             
                <td>{index + 1}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.matricula}</td>
                <td>{aluno.curso}</td>
                <td>{aluno.bimestre}</td>
                <td>
                <div className="button-group px-2">
              <button onClick={() => {
                preencherCampos(aluno);
                scrollToTop(); 
              }}>
                <AiOutlineEdit color="blue" size={20} />
              </button>
                    <button onClick={() => apagarAluno(aluno._id)}>
                      <AiOutlineDelete color="red" size={20} />
                    </button>
                  </div>
                </td>
             
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
  isOpen={showModal}
  onRequestClose={cancelarExclusao}
  className="modal-container"
  overlayClassName="modal-overlay"
  contentLabel="Modal de Exclusão"
>
  <h2 className="modal-title">Deseja realmente excluir?</h2>
  <div className="modal-buttons">
    <button onClick={confirmarExclusao}>Sim</button>
    <button onClick={cancelarExclusao}>Cancelar</button>
  </div>
</Modal>

    </div>
  );
}
