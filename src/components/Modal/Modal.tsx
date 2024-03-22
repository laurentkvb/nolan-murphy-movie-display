import React from "react";
import { Movie } from "../../types/types.ts";
import { CloseButton, ModalBackground, ModalContent } from "./Modal.styles.tsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, movie }) => {
  if (!isOpen || !movie) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>Close</CloseButton>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
      </ModalContent>
    </ModalBackground>
  );
};
