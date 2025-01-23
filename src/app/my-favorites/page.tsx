"use client";

import { useState, useEffect, useCallback } from "react";
import { useModal } from "@/src/app/context/ModalContext"; // Usando o hook do ModalContext
import Pagination from "./Partials/Pagination"; // O componente de paginação

const MyFavorites = () => {
  const { selectedItem } = useModal(); // Acessando o item selecionado do contexto
  const [repositories, setRepositories] = useState<any[]>([]); // Lista de repositórios (ou favoritos)
  const [loading, setLoading] = useState(false); // Indicador de carregamento
  const [error, setError] = useState<string | null>(null); // Estado de erro
  const [page, setPage] = useState(1); // Página atual
  const [nextPage, setNextPage] = useState<number | null>(null); // Página seguinte (para paginação)

  // Carrega os dados do contexto e atualiza o estado de repositórios
  useEffect(() => {
    if (selectedItem) {
      setLoading(true);
      setError(null);

      try {
        // Tenta obter dados do localStorage
        const dataFromLocalStorage = JSON.parse(
          localStorage.getItem("my-favorites") || "[]"
        );

        // Filtra ou usa diretamente os dados obtidos
        setRepositories(dataFromLocalStorage);

        // Verifica se existem mais de 10 itens para habilitar a próxima página
        setNextPage(dataFromLocalStorage.length > 10 ? 2 : null);

        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar os favoritos.");
        setLoading(false);
      }
    } else {
      console.log("Nenhum item selecionado");
    }
  }, [selectedItem]); // Recarrega os dados sempre que o selectedItem mudar

  const handleNext = useCallback(() => {
    if (nextPage) setPage(nextPage); // Avança para a próxima página
  }, [nextPage]);

  const handlePrevious = useCallback(() => {
    if (page > 1) setPage((prevPage) => prevPage - 1); // Retrocede para a página anterior
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg my-6 sm:my-8 md:my-12 lg:my-16">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Meus Favoritos
      </h2>
      {error && <p className="text-red-500">{error}</p>}

      <Pagination
        items={repositories} // Passa os itens de favoritos para a paginação
        onNext={handleNext}
        onPrevious={handlePrevious}
        loading={loading}
        currentPage={page}
        disablePrevious={page === 1}
        disableNext={nextPage === null}
      />
    </div>
  );
};

export default MyFavorites;
