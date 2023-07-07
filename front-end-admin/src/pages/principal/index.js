import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

import "./style.css";

function Principal() {
  const boaRef = useRef();
  const rece = useRef();

  useEffect(() => {
    boaRef.current.addEventListener("click", () => {
      rece.current.style.display = "none";
    });
  }, []);

  

  return (
    <div className="pp">
      <div className="containerb">
        <ul className="titulos" ref={boaRef}>
          <Link className="link" to="/funcionario">
            <li>Funcionario</li>
          </Link>
          <Link className="link" to="/cliente">
            <li>Cliente</li>
          </Link>
          <Link className="link" to="/agenda">
            <li>Agenda</li>
          </Link>
          <Link className="link" to="/procedimento">
            <li>Procedimento</li>
          </Link>
          <Link className="link" to="/venda">
            <li>Vendas</li>
          </Link>
        </ul>
      </div>
      <div className="recepcao">
        <h1 ref={rece}>Bem vindo</h1>
      </div>
    </div>
  );
}

export default Principal;
