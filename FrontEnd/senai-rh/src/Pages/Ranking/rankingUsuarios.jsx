import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Assets/css/gp1style.css'
import { Link, useHistory } from 'react-router-dom'
import { Modall } from '../../components/Modal'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header/headerAdm'
import FotoRank from '../../Assets/img/fotoRank.svg'
import Trofeu from '../../Assets/img/Trofeus.svg'
import moedas from '../../Assets/img/moedinha.svg'


export default function TodasAtividades() {
    const [listaUsuariosRank, setListaUsuariosRank] = useState([]);
    const [idAtividade, setIdAtividade] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModalValidar, setShowModalValidar] = useState(false);
    const [idAtividadeModal, setIdAtividadeModal] = useState()
    const [isLoading, setIsLoading] = useState(false);

    const OpenModal = () => {
        setShowModal(prev => !prev);
    }

    function listarUsuariosRank() {
        axios.get("http://apirhsenaigp1.azurewebsites.net/api/Usuarios/Ranking"
            , {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaUsuariosRank(resposta.data)
                    console.log(resposta.data)
                }
            })

            .catch(erro => console.log(erro))
    };


    useEffect(listarUsuariosRank, []);

    return (
        <div className="G1_tela_atividades_container">
            {/* <Modall atividade={listaAtividades.find(atividade => atividade.idAtividade == idAtividadeModal)} showModal={showModal} setShowModal={setShowModal} /> */}
            <Header />
            <main className="container_atividades">
                <div className="G1_organizar_main">
                    <h1 className="G1_titulo_atividades">Ranking</h1>
                    <div className="G1_">
                        {listaUsuariosRank.map((usuario) => {
                            return (
                                <div key={usuario.idUsuario}>
                                    <div className="G1_usuario_card">
                                        <p className="G1_posicao">1</p>
                                        <img className="" src={FotoRank} alt="Foto do Usuario" />
                                        <p className="G1_nome_usuario">{usuario.nome}</p>
                                        <div className="G1_organizar_trofeus">
                                            <img src={Trofeu} alt="Trofeu" />
                                            <p className="G1_num_trofeu" >{usuario.trofeus}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
        </div>
    );

}