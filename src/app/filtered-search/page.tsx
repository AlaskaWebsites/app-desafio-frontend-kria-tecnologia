"use client";

import { useState, useEffect, useCallback } from "react";
import { searchRepositories } from "@/api/github/Octokit/filtered-search";
import Pagination from "./Partials/Pagination";
//ultima page criada junto o chatgpt(meu amorzinho)

const FilteredSearch = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [sortBy, setSortBy] = useState("stars");
  const [direction, setDirection] = useState("desc");

  const fetchRepositories = async () => {
    if (!query) return;

    // Valida se a query não excede o limite de 256 caracteres
    if (query.length > 256) {
      setError("A busca não pode ter mais de 256 caracteres.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await searchRepositories(
        query,
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
    } catch {
      setError("Erro ao carregar os repositórios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [query, page, sortBy, direction]);

  const handleNext = useCallback(() => {
    if (nextPage) setPage(nextPage);
  }, [nextPage]);

  const handlePrevious = useCallback(() => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  }, [page]);

  // const handleSortChange = (newSortBy) => setSortBy(newSortBy);
  // const handleDirectionChange = (newDirection) => setDirection(newDirection);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg m-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Busca Filtrada
      </h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pesquisar repositórios por nome"
        className="mb-4 p-2 border border-gray-300 rounded-md text-[rgb(17_24_39)]"
      />
      {error && <p className="text-red-500">{error}</p>}
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
  );
};

export default FilteredSearch;
