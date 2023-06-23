import { Table } from "reactstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";

const Lagenda = () => {
  const [agenda, setAgenda] = useState([]);

  const getAgenda = async () => {
    try {
      const response = await axios.get("http://localhost:3002/agenda");
      const data = response.data;
      console.log(data);
      setAgenda(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAgenda();
  }, []);

  async function Deletar(e) {
    await axios.delete(`http://localhost:3002/agenda/${e}`);
    await getAgenda();
  }

  return (
    <div className="titulo">
      <h1>Agendamentos</h1>
      <div className="containerc">
        <Table>
          <thead>
            <tr>
              <th>procedimento</th>
              <th>cliente</th>
              <th>funcionaria</th>
              <th>data</th>
              <th>horario</th>
              <th>editar</th>
              <th>deletar</th>
            </tr>
          </thead>

          {agenda.length > 0 &&
            agenda.map((a) => (
              <tbody>
                <tr key={a.id}>
                  <td>{a.procedimento}</td>
                  <td>{a.cliente}</td>
                  <td>{a.funcionario}</td>
                  <td>{a.data}</td>
                  <td>{a.horario}</td>

                  <td>
                    <Link to={`/${a._id}`}>
                      <BsPencil />
                    </Link>
                  </td>

                  <td>
                    <button onClick={() => Deletar(a._id)}>
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
export default Lagenda;
