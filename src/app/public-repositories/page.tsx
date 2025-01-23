"use client";

import Pagination from "./Partials/Pagination";
import { getPublicRepositories } from "@/api/github/Octokit/PublicRepositories";
import { useEffect, useState } from "react";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  // Adicione outras propriedades conforme necessário
}

const PublicRepositories = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [since, setSince] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getPublicRepositories(10, since);

        if (response.data.length > 0) {
          setRepositories(response.data);
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
  }, [since]);

  const handleNext = () => {
    if (repositories.length > 0) {
      const nextSince = repositories[repositories.length - 1]?.id;
      setSince(nextSince);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      alert("A API não suporta navegação reversa.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-lg rounded-lg m-2 xs:m-6 sm:m-6 lg:m-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
          Repositórios Públicos
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-4">
          <Pagination
            items={repositories}
            onNext={handleNext}
            onPrevious={handlePrevious}
            loading={loading}
            disablePrevious={page === 1}
            currentPage={page}
          />
        </div>
      </div>
    </div>
  );
};

export default PublicRepositories;
