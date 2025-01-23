"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

interface Repository {
  id: number;
  name: string;
  description?: string;
}

interface ModalContextType {
  isModalOpen: boolean;
  selectedItem: Repository | null;
  modalType: string | null;
  openModal: (item: Repository, type?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Repository | null>(null);
  const [modalType, setModalType] = useState<string | null>(null);

  useEffect(() => {
    const savedItem = localStorage.getItem("selectedItem");
    if (savedItem) {
      try {
        setSelectedItem(JSON.parse(savedItem));
      } catch (error) {
        console.error("Erro ao parsear selectedItem do localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedItem) {
      localStorage.setItem("selectedItem", JSON.stringify(selectedItem));
    }
  }, [selectedItem]);

  const openModal = useCallback((item: Repository, type: string = "") => {
    setSelectedItem(item);
    setModalType(type);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setModalType(null);
  }, []);

  return (
    <ModalContext.Provider
      value={{ isModalOpen, selectedItem, modalType, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
