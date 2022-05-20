import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import "../../assets/css/democratizacao.css";
import Footer from '../../components/footer';
import FotoPerfil from '../../assets/img/perfilVazio.svg'
import Header from '../../components/header/headerFuncionario'
import ImgDemocratizacao from '../../assets/img/ImgDemocratizacao.svg'
import imgPadrao from '../../assets/img/imgPadrao.png'
import moment from 'moment';
import { parseJwt } from '../../services/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Democratizacao() {

    //States 
    let param  =  useParams();
    
    const [idUsuario, setIdUsuario] = useState(1);
    const [idFeedback, setIdFeedback] = useState(0);
    const [listaFeedbacks, setListaFeedbacks] = useState([]);
    const [listaDecisao, setListaDecisao] = useState([]);
    const [descricaoDecisao, setDescricaoDecisao] = useState('');
    const [comentarioFeedback, setComentarioFeedback] = useState('');
    const [valorMoedas] = useState(0);
    const [notaDecisao, setNotaDecisao] = useState(0);
    const [dataPublicacao] = useState(moment().format("YYYY-MM-DD"));
    const [nomeFuncionario, setNomeFuncionario] = useState('');
    const notify_feedback = () => toast.success("FeedBack Cadastrado!");

    const notify_erroFeedback = () => toast.error("Preencha todos os campos!");

    console.log(param)

    function cadastrarFeedback(event) {
        event.preventDefault();




        let cadastro = {
            idUsuario: parseJwt().jti,
            idDecisao: idDecisao.idDecisao,
            comentarioFeedBack: comentarioFeedback,
            dataPublicacao: dataPublicacao,
            valorMoedas: valorMoedas,
            // notaDecisao: notaDecisao,
        }

        console.log(cadastro)

        axios.post("https://apigrupo3.azurewebsites.net/api/Feedbacks/Cadastrar", cadastro, {

            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }



        })
            .then(response => {
                if (response.status === 201) {
                    ListarFeedback();
                    console.log('feedback cadastrado')
                    notify_feedback();
                }
            })
            .catch(erro => console.log(erro), notify_erroFeedback())

    }

    function ListarDecisao() {

        axios.get('https://apigrupo3.azurewebsites.net/api/Decisoes/Listar', {
            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }
        )

            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaDecisao(resposta.data)
                    console.log(resposta)
                }
            })

            .catch(erro => console.log(erro))
    }

    function ListarFeedback() {
        axios.get('https://apigrupo3.azurewebsites.net/api/Feedbacks/Listar', {
            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }
        )

            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaFeedbacks(resposta.data)
                    console.log(resposta)
                }
            })

            .catch(erro => console.log(erro))
    }

    useEffect(ListarDecisao, [])
    useEffect(ListarFeedback, [])


    return (
        <body>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Header />
            <main>
                <div className='container g3_containerOrganizador'>
                    <div className='g3_containerDecisao'>
                        <div className='g3_organizadorDecisao'>
                            <span className='g3_boldDecisao'>ÁREA DE</span>
                            <span className='g3_nonBoldDecisao'>DEMOCRATIZAÇÃO</span>
                            {
                                listaDecisao.map((decisao) => {
                                    if (decisao.idDecisao == idDecisao) {
                                        return (
                                            <div key={decisao.idDecisao} className='g3_decisao'>
                                                <div className='g3_boxDecisao'>
                                                    <span className='g3_tituloDecisao'>o gerente tomou a seguinte decisao:</span>
                                                    <p className='g3_paragrafoDecisao'>{decisao.descricaoDecisao}</p>
                                                </div>

                                            </div>
                                        )
                                    }
                                })

                            }
                            <form className='g3_formCadastroFeedback' onSubmit={cadastrarFeedback}>
                                <input className='g3_inputCadastroFeedback' type='text' value={comentarioFeedback} onChange={(event) => setComentarioFeedback(event.target.value)} placeholder='Deseja adicionar alguma sugestão de melhora ou feedback?'></input>
                                {/* <input className='g3_inputCadastroFeedback' type='number' value={notaDecisao} onChange={(event) => setNotaDecisao(event.target.value)} placeholder='Insira uma nota para a decisão'></input> */}
                                <button className='g3_btnCadastroFeedback' type="submit">Cadastrar</button>
                            </form>

                        </div>
                        <div className='g3_bannerDemocratizacao'>
                            <img className='g3_imgDemocratizacao' src={ImgDemocratizacao} />
                        </div>

                    </div>

                    <span className='g3_boldFeedback'>Feedbacks</span>
                    <div className='g3_containerFeedback'>
                        {

                            listaFeedbacks.map((feedback) => {
                                if (feedback.idDecisao == idDecisao) {
                                    return (
                                        <div key={feedback.idFeedBack} className='g3_feedback'>
                                            <div className='g3_fotoPerfilFeedback'>
                                                <img className='g3_imgFotoFeedback' src={imgPadrao} />
                                            </div>
                                            <div className='g3_boxFeedback'>
                                                <span className='g3_tituloDecisao'>{feedback.idUsuarioNavigation.nome} comentou:</span>
                                                <p className='g3_paragrafoDecisao'>{feedback.comentarioFeedBack}</p>
                                            </div>

                                        </div>
                                    )
                                }
                            })
                        }

                    </div>
                </div>

            </main>
            <Footer />
        </body>
    )

}