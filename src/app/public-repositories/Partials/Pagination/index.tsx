"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useModal } from "@/src/app/context/ModalContext";

interface PaginationProps {
  items: { id: number; name: string; description?: string }[];
  onNext: () => void;
  onPrevious: () => void;
  loading: boolean;
  disablePrevious: boolean;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  items = [],
  onNext,
  onPrevious,
  loading,
  disablePrevious,
  currentPage,
}) => {
  const { openModal } = useModal(); // Pega a função openModal do contexto

  const handleItemClick = (item: {
    id: number;
    name: string;
    description?: string;
  }) => {
    // Ao clicar no item, abre o modal e passa o item para o estado
    openModal(item);
  };

  return (
    <div className="flex flex-col">
      <div className="space-y-4">
        {loading ? (
          <p>Carregando...</p>
        ) : items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="border p-4 text-[rgb(17_24_39)] cursor-pointer" // Adicionando cursor-pointer aqui
              onClick={() => handleItemClick(item)} // Chama o handleItemClick ao clicar
            >
              <h3 className="text-[rgb(17_24_39)]">{item.name}</h3>
              <p className="text-[rgb(17_24_39)]">
                {item.description || "Sem descrição disponível"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhum repositório encontrado.</p>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <button
          onClick={onPrevious}
          className={`relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${
            disablePrevious
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-[rgb(17_24_39)] hover:bg-gray-50"
          }`}
          disabled={disablePrevious}
        >
          <ChevronLeftIcon
            aria-hidden="true"
            className="h-5 w-5 text-[rgb(17_24_39)]"
          />
          Previous
        </button>

        <p className="text-sm font-medium text-[rgb(17_24_39)]">
          Página {currentPage}
        </p>

        <button
          onClick={onNext}
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${
            loading || items.length === 0
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-50"
          }`}
          disabled={loading || items.length === 0}
        >
          Next
          <ChevronRightIcon
            aria-hidden="true"
            className="h-5 w-5 text-[rgb(17_24_39)]"
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
