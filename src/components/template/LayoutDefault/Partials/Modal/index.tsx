"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/src/app/context/ModalContext";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/outline";

const ModalComponent = () => {
  const { isModalOpen, closeModal, selectedItem } = useModal();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (isModalOpen && selectedItem) {
      // Verifica se o item já está nos favoritos ao abrir o modal
      const myFavorites = JSON.parse(
        localStorage.getItem("my-favorites") || "[]"
      );
      const isInFavorites = myFavorites.some(
        (item: any) => item.id === selectedItem.id
      );
      setIsFavorited(isInFavorites);
    }

    if (isModalOpen) {
      // Lógica para garantir o foco no modal ao ser aberto
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isModalOpen, selectedItem]);

  const handleFavoriteClick = () => {
    const myFavorites = JSON.parse(
      localStorage.getItem("my-favorites") || "[]"
    );

    // Adiciona ou remove o item dos favoritos
    if (isFavorited) {
      const updatedFavorites = myFavorites.filter(
        (item: any) => item.id !== selectedItem?.id
      );
      localStorage.setItem("my-favorites", JSON.stringify(updatedFavorites));
      setIsFavorited(false);
    } else {
      myFavorites.push(selectedItem);
      localStorage.setItem("my-favorites", JSON.stringify(myFavorites));
      setIsFavorited(true);
    }
  };

  const itemName = selectedItem?.name || "Item";
  const itemDescription =
    selectedItem?.description || "No description available";

  return (
    <Dialog open={isModalOpen} onClose={closeModal} className="relative z-10">
      <DialogBackdrop
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:max-w-lg sm:w-full">
          <div className="relative bg-white px-4 py-5 sm:p-6">
            {/* Estrela no canto superior direito */}
            <button
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 p-2 text-yellow-400 hover:text-yellow-500 focus:outline-none"
            >
              <StarIcon
                className={`h-6 w-6 ${
                  isFavorited ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            </button>

            <div className="sm:flex sm:items-start">
              <div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  {itemName}
                </DialogTitle>

                <p className="mt-2 text-sm text-gray-500">{itemDescription}</p>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ModalComponent;
