"use client";

import { useState, useEffect, useCallback } from "react";
import { useModal } from "@/src/app/context/ModalContext";
import Pagination from "./Partials/Pagination";

interface Repository {
  id: number;
  name: string;
  description?: string;
  languages_url?: string;
  updated_at?: string;
  owner: {
    login: string;
  };
}

const MyFavorites = () => {
  const { selectedItem } = useModal();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<number | null>(null);

  useEffect(() => {
    if (selectedItem) {
      setLoading(true);
      setError(null);

      try {
        const dataFromLocalStorage = JSON.parse(
          localStorage.getItem("my-favorites") || "[]"
        );

        setRepositories(dataFromLocalStorage);
        setNextPage(dataFromLocalStorage.length > 10 ? 2 : null);
        setLoading(false);
      } catch {
        setError("Erro ao carregar os favoritos.");
        setLoading(false);
      }
    }
  }, [selectedItem]);

  const handleNext = useCallback(() => {
    if (nextPage) setPage(nextPage);
  }, [nextPage]);

  const handlePrevious = useCallback(() => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg my-6 sm:my-8 md:my-12 lg:my-16">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Meus Favoritos
      </h2>
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

export default MyFavorites;
