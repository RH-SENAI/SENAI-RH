import React, { useRef, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import '../Assets/css/gp1style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {listarAtividadesValidar} from '../Pages/CadastrarAtividades/cadastrarAtividades'

export const ModallValidar = ({ showModalValidar, setShowModalValidar, atividade }) => {
    const modalRef = useRef();
    const notify_validar = () => toast.success("Atividade Validada!");

    let history = useHistory();

    const closeModal = (e) => {
        setShowModalValidar(false);
      
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModalValidar) {
                setShowModalValidar(false);
            }
        },
        [setShowModalValidar, showModalValidar]
    );

    async function validarAtividades(atividade) {
        console.log("validarAtividades chamouuuuu")
        let idAtividade = atividade.idAtividade;
        let idUsuario = atividade.idUsuario;
        await axios.patch("http://localhost:5000/api/Atividades/ValidarAtividade/" + atividade.idAtividade + "/" + atividade.idUsuario, {
            idAtividade: idAtividade,
            idUsuario: idUsuario
        }
            , {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .catch(erro => console.log(erro))

        notify_validar()
        // listarAtividadesValidar()
    };

    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {showModalValidar ? (
                <Modal
                    isOpen={showModalValidar}
                    onRequestClose={closeModal}
                    ariaHideApp={false}
                >
                    <div class="modal-body">
                        <h2 className="titulo_atividade_modal">{atividade.nomeAtividade}</h2>
                        <div className='organizar_sessao_modal'>
                            <label className='label_modal'>Descrição</label>
                            <p className="descricao_atividade_modal">{atividade.descricaoAtividade}</p>
                        </div>
                        {/* <p className="descricao_atividade_modal">{atividade.descricaoAtividade}</p>
                        <p className="descricao_atividade_modal">{atividade.descricaoAtividade}</p> */}
                        <div className="organizar_btn">
                            <button className="btn_fechar_modal" onClick={closeModal}>Fechar</button>
                            <button type="button" key={atividade.idAtividade} className="btn_validar_modal" onClick={() => validarAtividades(atividade)}>Validar</button>
                        </div>
                    </div>
                </Modal>
            ) : null}
        </>
    );

}
