"use client";

import Pagination from "./Partials/Pagination";
import { getPublicRepositories } from "@/api/github/Octokit/PublicRepositories";
import { useEffect, useState } from "react";

const PublicRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [since, setSince] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Adiciona uma variável de página

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
      } catch (err) {
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
      setPage((prevPage) => prevPage + 1); // Incrementa a página
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1); // Decrementa a página
      // Lógica de retroceder o "since" aqui (dependendo da API)
      // A API não suporta navegação reversa, então você pode não conseguir implementar completamente isso sem alterações na API
      alert("A API não suporta navegação reversa.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg m-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Repositórios Públicos
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        <Pagination
          items={repositories}
          onNext={handleNext}
          onPrevious={handlePrevious} // Passa a função handlePrevious
          loading={loading}
          disablePrevious={page === 1} // Desabilita o botão "Previous" na primeira página
          currentPage={page} // Usa a variável de página
        />
      </div>
    </div>
  );
};

export default PublicRepositories;
