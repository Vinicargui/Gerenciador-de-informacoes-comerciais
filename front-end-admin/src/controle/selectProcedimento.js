import { useState, useEffect } from "react";
export const useNomeProcedimento = () => {
  const [procedimentos, setNome] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/nomeProcedimento")
      .then((response) => response.json())
      .then((data) => setNome(data));
  }, []);

  return {
    procedimentos,
  };
};
