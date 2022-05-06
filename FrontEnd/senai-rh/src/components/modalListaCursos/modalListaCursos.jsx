import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import relogio from '../../assets/img/relogio.svg'
import local from '../../assets/img/local.svg'
import data from '../../assets/img/data.svg'
import estrelaSozinha from '../../assets/img/estrelaSozinha.svg'
import modelo from '../../assets/img/modelo.svg'
import "../../assets/css/modalListaCursos.css"
import api from '../../services/api';

export const ModallCurso = ({ showModal, setShowModal, curso }) => {

    const [listaComentarioCurso, setListaComentarioCurso] = useState([])
    const [idCurso, setIdCurso] = useState(0)


    const closeModal = e => {
        // console.log('showModal antes:' + showModal)
        setShowModal(false);

        // console.log('showModal depois:' + showModal)
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
                // console.log('I pressed');
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
        api('/ComentarioCursos')
            .then(resposta => {
                if (resposta.status === 200) {
                    // console.log('Lista')
                    // console.log(resposta)
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

                    <div className='container_modal_cima_g2'>
                        <div className='container_img_modal_g2'>
                            {<img  className='img_modal_g2' src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/' + curso.caminhoImagemCurso} alt="imagem do desconto" />}
                            <div className='media_Avaliacao_g2'>  <img src={estrelaSozinha} alt="" /> <p> {curso.mediaAvaliacaoCurso} </p> </div>
                        </div>
                        <div className='container_dados_modal_g2'>
                            <div className='container_title_modal_g2'>
                                <span>{curso.nomeCurso} </span>
                            </div>
                            <div className='dados_geral_g2'>
                                <div className='box_dados_modal_g2'>
                                    <div><img src={relogio} alt="relogio" /> <p>{curso.cargaHoraria} Horas</p></div>
                                    <div> <img src={data} alt="data" /> <p>
                                        {/* {curso.dataFinalizacao}  */}
                                        {Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric'
                                                }).format(new Date(curso.dataFinalizacao))}
                                        </p></div>
                                </div>
                                <div className='box_dados_modal2_g2'>
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
                    <section className='container_modal_baixo_g2'>


                        <div className='container_descricao_g2'>
                            <span>Descrição:</span>
                            <p className='texto_descricao_g2'>{curso.descricaoCurso}</p>
                            <div className='box_empresa_modal_g2'>
                                <span>Empresa:</span>
                                <p className='texto_empresa_g2'>{curso.idEmpresaNavigation.nomeEmpresa}<button className='btn_inscreva_g2'><a href={curso.siteCurso}>Inscreva-se</a></button> </p>

                            </div>
                        </div>

                        <div>

                            <hr className='vertical_g2' />
                        </div>

                        <div className='container_comentario_g2'>
                            <div>
                                <span>Comentario: </span>
                                <div className='box_comentarios_g2'>

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
                                <hr className='horizontal_g2' />
                                <form action="">
                                    <div className=''>
                                        <label htmlFor=""></label>
                                        <input className='input_comentario_avaliacao_g2' type="number" placeholder='De 0 a 5, qual a nota para esse curso' />
                                    </div>
                                    <div className='container_input_modal_g2'>

                                        <label htmlFor=""></label>
                                        <input className='input_comentario_modal_g2' type="text" placeholder='Adicione um comentario' />
                                        <button className='btn_comentario_g2'>Enviar</button>
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