import { useState, useEffect } from "react";
import "../../assets/css/perfil.css"
import Header from "../../components/header/headerFuncionario"
import Footer from "../../components/footer"
import grafico from "../../assets/img/grafico.png"
import estrela from "../../assets/img/star.png"
import iconPerfil from "../../assets/img/telaPerfil.png"

export default function Perfil() {
    const [Nome, setNome] = useState('')

    return (
        <div>
            <Header />
            <div className="container">

                <main class="container_org">
                    <div className="containerBox">
                        <div className="textoEFoto">
                            <div className="fotoPerfilVazia">
                                <img src="/static/media/Perfil.665c6f4f69a27632e71f989e2539ea7e.svg" alt="Imagem de perfil vazia" />
                            </div>
                        </div>

                        <div className="nomeUsuario">
                            <p>Nome</p>
                        </div>
                        <div className="cargo">
                            <p>Cargo</p>
                        </div>
                        <div className="classificacao">
                            <img className="nota" src={estrela} alt="nota" />
                            <img className="nota" src={estrela} alt="nota" />
                            <img className="nota" src={estrela} alt="nota" />
                            <img className="nota" src={estrela} alt="nota" />
                            <img className="nota" src={estrela} alt="nota" />
                        </div>
                    </div>

                    <div className="containerBox2">
                        <div className="boxGrafico">
                            <img className="graficos" src={grafico} alt="Gráficos" />

                        </div>
                        <p>Produtividade</p>

                        <div className="boxGrafico">
                            <img className="graficos" src={grafico} alt="Gráficos" />

                        </div>
                        <p>Satisfação</p>
                        <img className="imagem" src={iconPerfil} alt="Garota segurando um gráfico" />

                    </div>
                </main>
            </div>

            <Footer />
        </div >
    )
}