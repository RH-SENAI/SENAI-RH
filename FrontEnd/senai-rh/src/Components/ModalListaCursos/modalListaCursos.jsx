import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import relogio from '../../Assets/img/relogio.svg'
import local from '../../Assets/img/local.svg'
import data from '../../Assets/img/data.svg'
import estrelaSozinha from '../../Assets/img/estrelaSozinha.svg'
import modelo from '../../Assets/img/modelo.svg'
import "../../Assets/Css/modalListaCursos.css"
import api from '../../Services/api';

export const ModallCurso = ({ showModal, setShowModal, curso }) => {

    const [listaComentarioCurso, setListaComentarioCurso] = useState([])
    const [idCurso, setIdCurso] = useState(0)


    const closeModal = e => {
        console.log('showModal antes:' + showModal)
        setShowModal(false);

        console.log('showModal depois:' + showModal)
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
                console.log('I pressed');
            }
        },
        [setShowModal, showModal]
    );



    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    function listarComentarioCurso() {
        api('http://localhost:5000/api/ComentarioCursos')
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log('Lista')
                    console.log(resposta)
                    setListaComentarioCurso(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    useEffect(listarComentarioCurso, []);


    return (
        <>
            {showModal ? (
                <Modal
                    isOpen={showModal}
                    onRequestClose={closeModal}
                >

                    <div className='container_modal_cima'>
                        <div className='container_img_modal'>
                            {/* <img className='img_modal' src={'https://raw.githubusercontent.com/RH-SENAI/Senai_Rh_Api_G2/back-end-g2/StaticFiles/Images/' + curso.caminhoImagemCurso} alt="" /> */}
                            {<img  className='img_modal' src={'http://localhost:5000/img/' + curso.caminhoImagemCurso} alt="imagem do curso" />}
                            <div className='media_Avaliacao'>  <img src={estrelaSozinha} alt="" /> <p> {curso.mediaAvaliacaoCurso} </p> </div>
                        </div>
                        <div className='container_dados_modal'>
                            <div className='container_title_modal'>
                                <span>{curso.nomeCurso} </span>
                            </div>
                            <div className='dados_geral'>
                                <div className='box_dados_modal'>
                                    <div><img src={relogio} alt="relogio" /> <p>{curso.cargaHoraria} Horas</p></div>
                                    <div> <img src={data} alt="data" /> <p>
                                        {/* {curso.dataFinalizacao}  */}
                                        {Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric'
                                                }).format(new Date(curso.dataFinalizacao))}
                                        </p></div>
                                </div>
                                <div className='box_dados_modal2'>
                                    <div>
                                        <img src={local} alt="local" /> <p>{curso.idEmpresaNavigation.idLocalizacaoNavigation.idLogradouroNavigation.nomeLogradouro} </p>

                                    </div>
                                    <div>
                                        <img src={modelo} alt="" /> <p>{curso.modalidadeCurso === true ? 'Presencial' : 'EAD'}</p>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                    <section className='container_modal_baixo'>


                        <div className='container_descricao'>
                            <span>Descrição:</span>
                            <p className='texto_descricao'>{curso.descricaoCurso}</p>
                            <div className='box_empresa_modal'>
                                <span>Empresa:</span>
                                <p className='texto_empresa'>{curso.idEmpresaNavigation.nomeEmpresa}<button className='btn_inscreva'><a href={curso.siteCurso}>Inscreva-se</a></button> </p>

                            </div>
                        </div>

                        <div>

                            <hr className='vertical' />
                        </div>

                        <div className='container_comentario'>
                            <div>
                                <span>Comentario: </span>
                                <div className='box_comentarios'>

                                    {
                                        listaComentarioCurso.map((comentario) => {
                                            return (
                                                <div>
                                                    <div>

                                                        {comentario.avaliacaoComentario}
                                                    </div>
                                                    {comentario.idUsuarioNavigation.nome} :
                                                    {comentario.comentarioCurso1}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <hr className='horizontal' />
                                <form action="">
                                    <div className=''>
                                        <label htmlFor=""></label>
                                        <input className='input_comentario_avaliacao' type="number" placeholder='De 0 a 5, qual a nota para esse curso' />
                                    </div>
                                    <div className='container_input_modal'>

                                        <label htmlFor=""></label>
                                        <input className='input_comentario_modal' type="text" placeholder='Adicione um comentario' />
                                        <button className='btn_comentario'>Enviar</button>
                                    </div>
                                </form>

                            </div>
                        </div>

                    </section>
                </Modal>
            ) : null
            }
        </>
    );

}