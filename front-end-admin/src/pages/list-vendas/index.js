import { Table, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";
import VendasPDF from "../../relatorios/vendas";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";

const ListaVendas = () => {
  const [vendas, setVendas] = useState([]);

  const getVendas = async () => {
    try {
      const response = await axios.get("http://localhost:3002/vendas");
      const data = response.data;
      setVendas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVendas();
  }, []);

  async function Deletar(e) {
    await axios.delete(`http://localhost:3002/venda/${e}`);
    await getVendas();
  }

  return (
    <div className="titulo">
      <h1>Vendas Realizadas</h1>
      <Button
        onClick={(e) => VendasPDF(vendas)}
        className="btn"
        color="danger"
        size="lg"
      >
        Gerar PDF
      </Button>
      <div className="container">
        <Table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Funcionaria</th>
              <th>Procedimento</th>
              <th>Valor</th>
              <th>Forma pagamento</th>
            </tr>
          </thead>

          {vendas.length > 0 &&
            vendas.map((v) => (
              <tbody>
                <tr key={v.id}>
                  <td>{v.cliente}</td>
                  <td>{v.funcionario}</td>
                  <td>{v.procedimento}</td>
                  <td>{v.valor}</td>
                  <td>{v.formaPagamento}</td>
                  <td>
                    <button onClick={() => Deletar(v._id)}>
                      <BsFillTrashFill />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      </div>
    </div>
  );
};
export default ListaVendas;
