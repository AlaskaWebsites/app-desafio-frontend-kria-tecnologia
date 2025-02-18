"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useModal } from "@/src/app/context/ModalContext"; // Adicionando o contexto do modal

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

interface PaginationProps {
  items: Repository[];
  onNext: () => void;
  onPrevious: () => void;
  loading: boolean;
  disablePrevious: boolean;
  currentPage: number;
  disableNext: boolean;
}

const Pagination = ({
  items,
  onNext,
  onPrevious,
  loading,
  disablePrevious,
  currentPage,
  disableNext,
}: PaginationProps) => {
  const { openModal } = useModal(); // Pegando a função openModal do contexto

  const handleItemClick = (item: Repository) => {
    // Função que abre o modal passando o item clicado
    openModal(item); // Passando o objeto Repository completo
  };

  return (
    <div className="flex flex-col">
      <div className="space-y-4 text-[rgb(17_24_39)]">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            Carregando...
          </div>
        ) : items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="border p-4 cursor-pointer" // Adicionando a interação de clique
              onClick={() => handleItemClick(item)} // Abrindo o modal ao clicar
            >
              <h3 className="truncate">{item.name}</h3>
              <p className="truncate">
                {item.description || "Sem descrição disponível"}
              </p>
              <p className="truncate">
                <strong>Linguagem:</strong>{" "}
                {item.languages_url ? (
                  <a
                    href={item.languages_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate"
                  >
                    {item.languages_url}
                  </a>
                ) : (
                  "Não disponível"
                )}
              </p>
              <p className="truncate">
                <strong>Última atualização:</strong>{" "}
                {item.updated_at && !isNaN(new Date(item.updated_at).getTime())
                  ? new Date(item.updated_at).toLocaleDateString()
                  : "Não disponível"}
              </p>
              <p className="truncate">
                <strong>Dono:</strong> {item.owner.login}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhum repositório como favorito.</p>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <button
          onClick={onPrevious}
          disabled={disablePrevious}
          className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
            disablePrevious
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-[rgb(17_24_39)] hover:bg-gray-50"
          }`}
        >
          <ChevronLeftIcon className="h-5 w-5 text-[rgb(17_24_39)]" />
          Previous
        </button>

        <p className="text-sm font-medium text-[rgb(17_24_39)]">
          Página {currentPage}
        </p>

        <button
          onClick={onNext}
          disabled={disableNext}
          className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
            disableNext
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-[rgb(17_24_39)] hover:bg-gray-50"
          }`}
        >
          Next
          <ChevronRightIcon className="h-5 w-5 text-[rgb(17_24_39)]" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
