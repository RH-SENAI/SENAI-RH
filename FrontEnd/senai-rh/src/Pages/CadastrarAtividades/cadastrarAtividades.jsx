import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Assets/css/gp1style.css'
import Rodape from '../../components/Footer';
import Header from '../../components/Header/headerFuncionario';
import { Link } from 'react-router-dom'
import img_olho from '../../Assets/img/Olho_Atividades.png'
import Modal from 'react-modal';
import React from 'react';

export default function CadastrarAtividades() {
    const [listaAtividades, setListaAtividades] = useState([]);
    const [listaAtividadesValidar, setListaAtividadesValidar] = useState([]);
    // const [listaSetores, setListaSetores] = useState([]);
    const [idAtividade, setIdAtividade] = useState('');
    const [idSetor, setIdSetor] = useState('');
    const [nomeAtividade, setNomeAtividade] = useState('');
    // const [dataInicio, setDataInicio] = useState('');
    // const [dataConclusao, setDataConclusao] = useState('');
    // const [dataCriacao, setDataCriacao] = useState('');
    const [recompensaMoeda, setRecompensaMoeda] = useState('');
    const [recompensaTrofeu, setRecompensaTrofeu] = useState('');
    const [descricaoAtividade, setDescricaoAtividade] = useState('');
    const [necessarioValidar, setNecessarioValidar] = useState(false);

    const [isLoading, setIsLoading] = useState(false);


    function listarAtividades() {
        console.log(necessarioValidar)
        axios("http://localhost:5000/api/Atividades"
            , {
                headers: {
                    // 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaAtividades(resposta.data)
                }
            })

            .catch(erro => console.log(erro))
    };

    useEffect(listarAtividades, []);

    function listarAtividadesValidar() {
        console.log(necessarioValidar)
        axios("http://localhost:5000/api/Atividades/ListaValidar"
            , {
                headers: {
                    // 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaAtividadesValidar(resposta.data)
                }
            })

            .catch(erro => console.log(erro))
    };

    useEffect(listarAtividadesValidar, []);

    // function listarSetores() {
    //     axios('http://localhost:5000/api/Setores', {
    //         headers: {
    //             // 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
    //         }
    //     })
    //         .then(resposta => {
    //             if (resposta.status === 200) {
    //                 setListaSetores(resposta.data)
    //             }
    //         })

    //         .catch(erro => console.log(erro))
    // };

    // useEffect(listarSetores, []);

    function cadastrarAtividade(evento) {
        setIsLoading(true);
        // evento.preventDefault()

        axios
            .post('http://localhost:5000/api/Atividades', {
                idAtividade: idAtividade,
                idSetor: idSetor,
                nomeAtividade: nomeAtividade,
                recompensaMoeda: recompensaMoeda,
                recompensaTrofeu: recompensaTrofeu,
                descricaoAtividade: descricaoAtividade,
                necessarioValidar: necessarioValidar
            }, {
                headers: {
                    // 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then((resposta) => {
                if (resposta.status === 201) {
                    console.log('Atividade cadastrada');
                    setIdAtividade('');
                    setIdSetor('');
                    setNomeAtividade('');
                    setRecompensaMoeda('');
                    setRecompensaTrofeu('');
                    setRecompensaTrofeu('');
                    setDescricaoAtividade('');
                    setNecessarioValidar(false);
                    setIsLoading(false);
                    // setListaSetores([]);
                }
            })
            .catch(erro => console.log(erro), setIdAtividade(''), setIdSetor(''), setNomeAtividade(''), setInterval(() => {
                setIsLoading(false)
            }, 5000));
    }

    function checkValidar() {
        console.log(necessarioValidar + " - Anterior")
        setNecessarioValidar(!necessarioValidar)
        console.log(necessarioValidar + " - Atual")
    }

    //========================== MODAL =============================//

    // const modal = document.querySelector('#my-modal');
    // const modalBtn = document.querySelector('#modal-btn');
    // const closeBtn = document.querySelector('.close');

    // // // Events
    // modalBtn.addEventListener('click', openModal);
    // closeBtn.addEventListener('click', closeModal);
    // window.addEventListener('click', outsideClick);

    // // // Open
    // function openModal() {
    //     modal.style.display = 'block';
    // }

    // // // Close
    // function closeModal() {
    //     modal.style.display = 'none';
    // }

    // // // Close If Outside Click
    // function outsideClick(e) {
    //     if (e.target == modal) {
    //         modal.style.display = 'none';
    //     }
    // }
    //========================== EDSON MODAL ============================//

    const [modalIsOpen, setIsOpen] = React.useState(false);
    let subtitle;


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const custonModal = {
        content: {
            display: 'none',
            position: 'fixed',
            left: '0',
            top: '0',
            height: '100%',
            width: '100%',
            overflow: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            overflowy: 'hidden',
            overflowx: 'hidden',
            zindex: '1'
        }
    }

    //========================== FIM MODAL ============================//

    return (
        <div className="div_container">
            <Header />
            <div className="container_">
                <div className="container_cards">

                    {/* CADASTRO DE ATIVIDADES */}
                    <div className="container_cadastro">
                        <div className="container_navs">
                            <nav className="nav_links">
                                <Link to="/" className="links">Cadastrar Atividades</Link>
                                <Link to="/" className="links">Validar Atividades</Link>
                                <Link to="/" className="links">Marketplace</Link>
                                <Link to="/" className="links">Usuários</Link>
                                <Link to="/" className="links">Ranking</Link>
                            </nav>
                        </div>
                        <h1>Cadastrar Atividade</h1>

                        <form onSubmit={cadastrarAtividade} className="form_cadastro">
                            <label className="label_form">Título da Atividade</label>
                            <input placeholder="Digite o título da atividade"
                                className="input_text"
                                type="text"
                                name="nome"
                                value={nomeAtividade}
                                onChange={(campo) => setNomeAtividade(campo.target.value)}
                            />

                            <label className="label_form">Descrição da Atividade</label>
                            <input placeholder="Digite a descição da atividade"
                                className="input_text"
                                type="text"
                                name="descricao"
                                value={descricaoAtividade}
                                onChange={(campo) => setDescricaoAtividade(campo.target.value)}
                            />

                            <label className="label_form">Premiação em moedas</label>
                            <input placeholder="Insira a premiação pela atividade"
                                className="input_text"
                                type="text"
                                name="moedas"
                                value={recompensaMoeda}
                                onChange={(campo) => setRecompensaMoeda(campo.target.value)}
                            />

                            <label className="label_form">Premiação em troféus</label>
                            <input placeholder="Insira a premiação pela atividade"
                                className="input_text"
                                type="text"
                                name="trofeu"
                                value={recompensaTrofeu}
                                onChange={(campo) => setRecompensaTrofeu(campo.target.value)}
                            />
                            <label className="label_form">Precisa Validar</label>
                            <div className="container_btn">
                                <input type="checkbox"
                                    id="switch"
                                    name="validar"
                                    value={necessarioValidar}
                                    onClick={checkValidar}
                                /><label className='label_switch' htmlFor="switch">Toggle</label>
                                {necessarioValidar && (
                                    <p className='text_switch'>
                                        SIM
                                    </p>
                                )}
                                {!necessarioValidar && (
                                    <p className='text_switch'>
                                        NÃO
                                    </p>
                                )}


                            </div>
                            {isLoading && (
                                <button disabled className='btn_cadastrar' type='submit'>
                                    Carregando...
                                </button>
                            )}
                            {!isLoading && (
                                <button className='btn_cadastrar' type='submit'>
                                    Cadastrar
                                </button>
                            )}
                        </form>
                    </div>

                    {/* LISTAGEM DE ATIVIDADES */}
                    <div>
                        <div className="container_card_atividades">
                            <h1>Todas Atividades</h1>
                            <div className='container_atividades'>

                                {listaAtividades.map((atividade) => {

                                    return (
                                        <div key={atividade.idAtividade}>
                                            {/* <div id="my-modal" class="modal">
                                                <div class="modal-content">
                                                    <div class="modal-body">
                                                        <span class="close">&times;</span>
                                                        <h2 className="titulo_atividade_modal">{atividade.nomeAtividade}</h2>
                                                        <p className="descricao_atividade_modal">{atividade.descricaoAtividade}</p>
                                                        <p className="descricao_atividade_modal">{atividade.descricaoAtividade}</p>
                                                        <p className="descricao_atividade_modal">{atividade.descricaoAtividade}</p>
                                                        <button className="btn_fechar_modal" onClick={closeModal}>Fechar</button>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <Modal
                                                isOpen={modalIsOpen}
                                                onRequestClose={closeModal}
                                                id={atividade.idAtividade}
                                                
                                            >
                                                <div class="modal-body">
                                                    <h2 className="titulo_atividade_modal">{atividade.nomeAtividade}</h2>
                                                    <p className="descricao_atividade_modal">{atividade.descricaoAtividade}</p>
                                                    <p className="descricao_atividade_modal">{atividade.descricaoAtividade}</p>
                                                    <p className="descricao_atividade_modal">{atividade.descricaoAtividade}</p>
                                                    <button className="btn_fechar_modal" onClick={closeModal}>Fechar</button>
                                                </div>
                                            </Modal>
                                            <div className='box_atividade'>
                                                <div className='organizar_atividade'>
                                                    <h2 className='titulo_atividade'>{atividade.nomeAtividade}</h2>
                                                    <p className='descricao_atividade'>{atividade.descricaoAtividade}</p>
                                                </div>
                                                <button onClick={openModal} id={atividade.idAtividade} className="button">
                                                    <img className='img_olho' src={img_olho} alt="Icone de um olho" />
                                                </button>
                                            </div>
                                            <hr className='linha_atividade' />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* LISTAGEM DE ATIVIDADES VALIDAR */}
                    <div>
                        <div className="container_card_atividades">
                            <h1>Validar Atividades</h1>
                            <div className='container_atividades'>

                                {listaAtividadesValidar.map((atividade) => {

                                    return (
                                        <div key={atividade.idAtividade}>
                                            <div id="my-modal" class="modal">
                                                <div className="modal-content">
                                                    <div className="modal-body">
                                                        <span className="close">&times;</span>
                                                        <h2 className="titulo_atividade_modal">{atividade.nomeAtividade}</h2>
                                                        <p className="descricao_atividade_modal">{atividade.descricaoAtividade}</p>
                                                        <p className="descricao_atividade_modal">{atividade.descricaoAtividade}</p>
                                                        <p className="descricao_atividade_modal">{atividade.descricaoAtividade}</p>
                                                        {/* <button className="btn_fechar_modal" onClick={closeModal}>Fechar</button> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='box_atividade'>
                                                <div className='organizar_atividade'>
                                                    <h2 className='titulo_atividade'>{atividade.nomeAtividade}</h2>
                                                    <p className='descricao_atividade'>{atividade.descricaoAtividade}</p>
                                                </div>
                                                <button id="modal-btn" class="button">
                                                    <img className='img_olho' src={img_olho} alt="Icone de um olho" />
                                                </button>
                                            </div>
                                            <hr className='linha_atividade' />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Rodape />
        </div>
    );
}