"use client";

import { useCallback, useEffect, useState } from "react";
import Pagination from "./Partials/Pagination";
import { getUserRepositories } from "@/api/github/Octokit/ListRepositoriesForTheAuthenticatedUser";

interface Repository {
  id: number;
  name: string;
  description?: string;
}

const MyRepositories = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<
    "full_name" | "updated" | "created" | "pushed"
  >("full_name");
  const [direction, setDirection] = useState<"desc" | "asc">("desc");
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
          setNextPage(
            response.nextPage ? parseInt(response.nextPage, 10) : null
          );
        } else {
          setError("Nenhum repositório encontrado.");
        }
      } catch {
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

  const handleSortChange = (
    newSortBy: "full_name" | "updated" | "created" | "pushed"
  ) => {
    setSortBy(newSortBy); // Atualiza o critério de ordenação
  };

  const handleDirectionChange = (newDirection: "desc" | "asc") => {
    setDirection(newDirection); // Atualiza a direção de ordenação
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg m-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Meus Repositórios
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4 text-[rgb(17_24_39)]">
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => handleSortChange("created")}
            className="px-4 py-2 border rounded-md text-sm"
          >
            Ordenar por Data de Criação
          </button>
          <button
            onClick={() => handleSortChange("updated")}
            className="px-4 py-2 border rounded-md text-sm"
          >
            Ordenar por Última Atualização
          </button>
          <button
            onClick={() => handleSortChange("pushed")}
            className="px-4 py-2 border rounded-md text-sm"
          >
            Ordenar por Último Push
          </button>
          <button
            onClick={() => handleSortChange("full_name")}
            className="px-4 py-2 border rounded-md text-sm"
          >
            Ordenar por Nome
          </button>
          <button
            onClick={() => handleDirectionChange("desc")}
            className="px-4 py-2 border rounded-md text-sm"
          >
            Ordem Decrescente
          </button>
          <button
            onClick={() => handleDirectionChange("asc")}
            className="px-4 py-2 border rounded-md text-sm"
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
