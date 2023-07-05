
import { useState, useEffect } from "react";


export const useNome = () => {
  const [nomes, setNome] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/nomefuncionario")
      .then((response) => response.json())
      .then((data) => setNome(data));
  }, []);

  return {
    nomes,
  };
};

