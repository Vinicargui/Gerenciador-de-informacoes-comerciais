import loader from "../../imagens/loading.svg";
import "./style.css";

function Loading() {
  return (
    <div className="container-load">
      <img src={loader} alt="loading" className="load-image" />
    </div>
  );
}

export default Loading;
