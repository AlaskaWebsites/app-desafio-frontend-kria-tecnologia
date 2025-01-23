"use client";

import { useCallback, useEffect, useState } from "react";
import Pagination from "./Partials/Pagination";
import { getUserRepositories } from "@/api/github/Octokit/ListRepositoriesForTheAuthenticatedUser";

const MyRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [sortBy, setSortBy] = useState("full_name");
  const [direction, setDirection] = useState("desc");
  const username = "alaskawebsites"; // Nome de usuário do GitHub

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getUserRepositories(
          username,
          10,
          page,
          sortBy,
          direction
        );

        if (response.data.length > 0) {
          setRepositories(response.data);
          setNextPage(response.nextPage);
        } else {
          setError("Nenhum repositório encontrado.");
        }
      } catch (err) {
        setError("Erro ao carregar os repositórios.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [username, page, sortBy, direction]);

  const handleNext = useCallback(() => {
    if (nextPage) {
      setPage(nextPage); // Vai para a próxima página
    }
  }, [nextPage]);

  const handlePrevious = useCallback(() => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1); // Decrementa para a página anterior
    }
  }, [page]);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy); // Atualiza o critério de ordenação
  };

  const handleDirectionChange = (newDirection) => {
    setDirection(newDirection); // Atualiza a direção de ordenação
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg m-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Meus Repositórios
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4 text-[rgb(17_24_39)]">
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => handleSortChange("created")}
            className="text-center"
          >
            Ordenar por Data de Criação
          </button>
          <button
            onClick={() => handleSortChange("updated")}
            className="text-center"
          >
            Ordenar por Última Atualização
          </button>
          <button
            onClick={() => handleSortChange("pushed")}
            className="text-center"
          >
            Ordenar por Último Push
          </button>
          <button
            onClick={() => handleSortChange("full_name")}
            className="text-center"
          >
            Ordenar por Nome
          </button>
          <button
            onClick={() => handleDirectionChange("desc")}
            className="text-center"
          >
            Ordem Decrescente
          </button>
          <button
            onClick={() => handleDirectionChange("asc")}
            className="text-center"
          >
            Ordem Crescente
          </button>
        </div>

        <Pagination
          items={repositories}
          onNext={handleNext}
          onPrevious={handlePrevious}
          loading={loading}
          currentPage={page}
          disablePrevious={page === 1}
          disableNext={nextPage === null}
        />
      </div>
    </div>
  );
};

export default MyRepositories;
