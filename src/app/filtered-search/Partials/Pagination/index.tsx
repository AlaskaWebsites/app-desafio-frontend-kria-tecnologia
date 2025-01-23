import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useModal } from "@/src/app/context/ModalContext"; // Importe o hook de contexto do modal

const Pagination = ({
  items = [],
  onNext,
  onPrevious,
  loading,
  disablePrevious,
  currentPage,
  disableNext,
}) => {
  const { openModal } = useModal(); // Função para abrir o modal

  const handleItemClick = (item) => {
    openModal(item); // Abre o modal passando o item
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
              className="border p-4 cursor-pointer"
              onClick={() => handleItemClick(item)} // Adiciona o clique para abrir o modal
            >
              <h3>{item.name}</h3>
              <p>{item.description || "Sem descrição disponível"}</p>
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
          <ChevronLeftIcon className="h-5 w-5 text-[rgb(17_24_39)]" />
          Previous
        </button>

        <p className="text-sm font-medium text-[rgb(17_24_39)]">
          Página {currentPage}
        </p>

        <button
          onClick={onNext}
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${
            loading || disableNext
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-50"
          }`}
          disabled={loading || disableNext}
        >
          Next
          <ChevronRightIcon className="h-5 w-5 text-[rgb(17_24_39)]" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
