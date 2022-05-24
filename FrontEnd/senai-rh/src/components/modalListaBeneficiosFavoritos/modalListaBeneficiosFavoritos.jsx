import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import coracao from '../../assets/img/coracao.svg'
import relogio from '../../assets/img/relogio.svg'
import local from '../../assets/img/local.svg'
import data from '../../assets/img/data.svg'
import estrelaSozinha from '../../assets/img/estrelaSozinha.svg'
import modelo from '../../assets/img/modelo.svg'
import calendar from '../../assets/img/calendar.svg'
import map from '../../assets/img/map.svg'
import "../../assets/css/modalListaCursos.css"
import "../../assets/css/modalListaBeneficios.css"
import api from '../../services/api';
import { parseJwt } from '../../services/auth';
import coin from "../../assets/img/coin 1.png"
import axios from 'axios';
import ReactStars from "react-rating-stars-component";


export const ModallBeneficioFavoritos = ({ showModal, setShowModal, beneficios, comentario }) => {

    const [listaComentarioBeneficio, setListaComentarioBeneficio] = useState([])
    const [idDesconto, setIdDesconto] = useState(0)
    const [avaliacaoDesconto, setAvaliacaoDesconto] = useState(0)
    const [comentarioDesconto1, setComentarioDesconto1] = useState('')
    const [valorAvalicao, setValorAvalicao] = useState(1)

    const avaliacao2 = () => {
        setValorAvalicao(2)
    }
    const avaliacao3 = () => {
        setValorAvalicao(3)
    }
    const avaliacao4 = () => {
        setValorAvalicao(4)
    }
    const avaliacao5 = () => {
        setValorAvalicao(5)
    }



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

    function cadastrarComentario(event) {
        // event.preventDefault();
        console.log('beneficios.idDesconto')
        console.log(beneficios.idDesconto)
        console.log(parseJwt().jti)

        let comentarios = {
            idUsuario: parseJwt().jti,
            avaliacaoDesconto: valorAvalicao,
            comentarioDesconto1: comentarioDesconto1,
            idDesconto: beneficios.idDesconto
        }
        console.log('Comentario idDesconto')
        console.log(comentario)

        api.post('/ComentarioDescontos', comentarios, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }

        )
            .then(function (response) {
                console.log(response);
                setListaComentarioBeneficio(response.data)
            })
            .catch(erro => console.log(erro))
    }


    return (
        <>
            {showModal ? (
                <Modal
                    isOpen={showModal}
                    onRequestClose={closeModal}
                >

                    <div>
                        {/* Parte 1 */}
                        <div className='container_modal_beneficio_g2'>
                            <div className='box_img_modal_beneficio_g2'>
                                <img src={'https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/' + beneficios.idDescontoNavigation.caminhoImagemDesconto} alt="Foto do Desconto" />
                            </div>

                            <div className='box_cima_modal_beneficio_g2'>
                                <div className='title_modal_beneficio_g2'>
                                    <h1>{beneficios.idDescontoNavigation.nomeDesconto}</h1>
                                </div>

                                <div>
                                    <ReactStars
                                        count={5}
                                        // onChange={ratingChanged}
                                        size={30}
                                        edit={false}
                                        value={beneficios.idDescontoNavigation.mediaAvaliacaoDesconto}
                                        activeColor="#C20004"
                                    />
                                    {/* {beneficio.mediaAvaliacaoDesconto} */}
                                </div>

                                <div className='dados_modal_beneficio_g2'>

                                    <div className='icone_center_modal_beneficio_g2'>
                                        <img src={calendar} alt="calendário" /> <p>

                                            {Intl.DateTimeFormat("pt-BR", {
                                                year: 'numeric', month: 'numeric', day: 'numeric',
                                            }).format(new Date(beneficios.idDescontoNavigation.validadeDesconto))}
                                        </p>


                                    </div>

                                    <div className='icone_center_modal_beneficio_g2'>
                                        <img src={map} alt="mapa" /> <p> {beneficios.idDescontoNavigation.idEmpresaNavigation.idLocalizacaoNavigation.idLogradouroNavigation.nomeLogradouro} </p>
                                    </div>

                                </div>

                                <div className='container_registro_beneficio_g2'>
                                    <div className='box_dados_registro_beneficio_g2'>
                                        <span> Adicionado: </span> <p>{beneficios.idDescontoNavigation.idEmpresaNavigation.nomeEmpresa}</p>
                                    </div>
                                    <div className='box_dados_registro_beneficio_g2'>
                                        <span>Empresa:</span> <p>{beneficios.idDescontoNavigation.idEmpresaNavigation.nomeEmpresa}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='circulo_icone_coin_beneficio_g2'>
                                    <img className='icone_modal_coin_g2' src={coin} alt="preço da vantagem" /> <p> {beneficios.idDescontoNavigation.valorDesconto} </p>
                                </div>
                            </div>
                        </div>


                        {/* parte 2 */}
                        <div className='modal_baixo_beneficio_g2'>
                            <div className='container_lista_comentario_beneficio_g2'>
                                <h2>Comentários:</h2>
                                <div className='wrap_modal_comentario_beneficio_g2'>
                                    {
                                        comentario.map((c) => {
                                            return (
                                                <div className='container_lista_comentario_g2'>
                                                    <div className='box_lista_comentario_g2'>
                                                        <span>{c.idUsuarioNavigation.nome}:</span>
                                                        <p>{c.comentarioDesconto1}</p>
                                                        <ul>
                                                        <ReactStars
                                                            count={5}
                                                            size={15}
                                                            edit={false}
                                                            value={c.avaliacaoDesconto}
                                                            activeColor="#C20004"
                                                        />
                                                        </ul>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div>
                                    <form onSubmit={cadastrarComentario} className='input_modal_comentario_beneficio_g2'>
                                        <div class="rating_g2">
                                            <input type="radio" value={valorAvalicao} onChange={(e) => setValorAvalicao(e.target.value)} name="rating" id="rating-1_cadastro_beneficio_Favoritos" />
                                            <label for="rating-1_cadastro_beneficio_Favoritos"></label>

                                            <input type="radio" value={valorAvalicao} onChange={(e) => avaliacao2(e.target.value)} name="rating" id="rating-2_cadastro_beneficio_Favoritos" />
                                            <label for="rating-2_cadastro_beneficio_Favoritos"></label>

                                            <input type="radio" value={valorAvalicao} onChange={(e) => avaliacao3(e.target.value)} name="rating" id="rating-3_cadastro_beneficio_Favoritos" />
                                            <label for="rating-3_cadastro_beneficio_Favoritos"></label>

                                            <input type="radio" value={valorAvalicao} onChange={(e) => avaliacao4(e.target.value)} name="rating" id="rating-4_cadastro_beneficio_Favoritos" />
                                            <label for="rating-4_cadastro_beneficio_Favoritos"></label>


                                            <input type="radio" value={valorAvalicao} onChange={(e) => avaliacao5(e.target.value)} name="rating" id="rating-5_cadastro_beneficio_Favoritos" />
                                            <label for="rating-5_cadastro_beneficio_Favoritos"></label>

                                        </div>

                                        <input
                                            type="text"
                                            placeholder='Comente'
                                            value={comentarioDesconto1}
                                            onChange={(e) => setComentarioDesconto1(e.target.value)}
                                        />
                                        <button type="submit" className="botaoCadastroComentarioBeneficio_g2">Enviar</button>

                                    </form>
                                </div>
                            </div>
                            <hr className='hr_modal_beneficio_g2' />
                            <div className='container_descricao_beneficio_g2'>
                                <h2>Descrição</h2>

                                <div className='lista_descricao_beneficio_g2'>
                                    {beneficios.idDescontoNavigation.descricaoDesconto}
                                </div>

                                <div className='numeroCupom_g2'>
                                    <p> Seu cupom é:{beneficios.idDescontoNavigation.numeroCupom}</p>
                                </div>

                                <div className='btn_cadastrarComentario_beneficio_g2'>
                                    <img src={coracao} alt="" />
                                    <button type="submit" className="botaoCadastroComentarioBeneficio_g2">Inscrever-se</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </Modal>
            ) : null
            }
        </>
    );

}