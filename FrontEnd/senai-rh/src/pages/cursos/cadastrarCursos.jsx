import HeaderAdm from "../../components/header/headerAdm";
import cadastroCurso from '../../assets/img/cadastroCurso.svg'
import iconeEnviarArquivo from '../../assets/img/iconeEnviarArquivo.png'
import '../../assets/css/cadastroCursos.css'
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/footer";
import api from "../../services/api";

export default function CadastrarCursos() {
    const [idEmpresa, setIdEmpresa] = useState(0)
    const [nomeCurso, setNomeCurso] = useState('')
    const [descricaoCurso, setDescricaoCurso] = useState('')
    const [siteCurso, setSiteCurso] = useState('')
    const [cargaHoraria, setCargaHoraria] = useState(0)
    const [modalidadeCurso, setModalidadeCurso] = useState(false)
    const [dataFinalizacao, setDataFinalizacao] = useState(new Date())
    const [fotoCurso, setFotoCurso] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [erroMensagem, setErroMensagem] = useState(false);
    const [msgSucesso, setMsgSucesso] = useState(false);
    const [caminhoImagemCurso, setCaminhoImagemCurso] = useState('');
    const [listaEmpresa, setListaEmpresa] = useState([])



    function presencial() {
        setModalidadeCurso(true)
        console.log('True')
    }

    function ead() {
        setModalidadeCurso(false)
        console.log('False')
    }

    function buscarEmpresas() {
        api('/Empresas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    setListaEmpresa(resposta.data)
                    console.log('Aqui resposta')
                    console.log(resposta)
                }
            })
            .catch(erro => console.log(erro))
    }
    useEffect(buscarEmpresas, [])

    const efetuarCadastro = (event) => {

        event.preventDefault();

        var formData = new FormData();

        const element = document.getElementById('arquivo')
        const file = element.files[0]
        formData.append('fotoCurso', file, file.name)



        formData.append('idEmpresa', idEmpresa);
        formData.append('nomeCurso', nomeCurso);
        formData.append('descricaoCurso', descricaoCurso);
        formData.append('siteCurso', siteCurso);
        formData.append('modalidadeCurso', modalidadeCurso);
        formData.append('cargaHoraria', cargaHoraria);
        formData.append('dataFinalizacao', dataFinalizacao);
        formData.append('caminhoImagemCurso', caminhoImagemCurso);

        axios({
            method: "post",
            // url: "https://apibackgrupo2.azurewebsites.net/api/Cursos/Cadastrar",
            url: "http://localhost:5000/api/Cursos/Cadastrar",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                console.log(response);
                setMsgSucesso(true);
                setFotoCurso();
            })
            .catch((erro) => console.log(erro),
                setErroMensagem(true));
    }

    return (
        <div>
            <HeaderAdm />

            <div className="container container_forms_cadastroCursos_g2">

                <div className="box_img_cadastroCurso_g2">
                    <img src={cadastroCurso} alt="imagemCadastroCurso" />
                </div>


                <form onSubmit={efetuarCadastro}>

                    <div className="box_forms_cadastroCurso_g2">

                        <div className="title_cadastroCurso_g2">
                            <h1>Cadastro de Cursos</h1  >
                        </div>

                        <div className="box_inputs_cadastroCurso_g2">
                            <div className="container_cadastroCurso_inputs_g2">

                                <div>
                                    <label htmlFor="nomeCurso" ></label>
                                    <input
                                        id="nomeCurso"
                                        onChange={(campo) => setNomeCurso(campo.target.value)}
                                        value={nomeCurso}
                                        type="text"
                                        name="nomeCurso"
                                        placeholder="Curso"
                                    />
                                </div>

                                <div>
                                    <label></label>
                                    <input
                                        onChange={(campo) => setDescricaoCurso(campo.target.value)}
                                        value={descricaoCurso} name="descricaoCurso"
                                        type="text"
                                        placeholder="Descrição"
                                    />
                                </div>

                                <div>
                                    <label></label>
                                    <input
                                        value={siteCurso}
                                        name="siteCurso"
                                        onChange={(campo) => setSiteCurso(campo.target.value)}
                                        type="text"
                                        placeholder="Site do Curso"
                                    />
                                </div>



                                <div>
                                    <label className="label_arquivo_cadastroCurso_g2" htmlFor="arquivo"> <img  className="img_file_cadastro_curso_g2" src={iconeEnviarArquivo} alt="" /> Enviar arquivo</label>
                                    <input
                                        accept="image/png, image/jpeg"
                                        id="arquivo"
                                        name="arquivo"
                                        className="input_file_cadastroCurso_g2 "
                                        type="file"
                                    />
                                </div>

                            </div>


                            <div>
                                <div>
                                    <label htmlFor="dataFinalizacao"></label>
                                    <input
                                        id="dataFinalizacao"
                                        onChange={(campo) => setDataFinalizacao(campo.target.value)}
                                        name="data"
                                        value={dataFinalizacao}
                                        type="date"
                                        placeholder="Data de Finalização"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="idEmpresa" ></label>
                                    <select
                                        className="inputCadastroCursoSelect_g2"
                                        id="idEmpresa"
                                        onChange={(campo) => setIdEmpresa(campo.target.value)}
                                        value={idEmpresa}
                                    >

                                        <option value="0">Empresa</option>

                                        {
                                            listaEmpresa.map((empresa) => {
                                                return (
                                                    <option key={empresa.idEmpresa} value={empresa.idEmpresa}>
                                                        {empresa.nomeEmpresa}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>


                                <div>
                                    <label htmlFor="modalidade"></label>
                                    <select
                                        className="inputCadastroCursoSelect_g2"
                                        id="modalidade"
                                        onChange={(campo) => setModalidadeCurso(campo.target.value)}
                                    >

                                        <option value={presencial}>Presencial</option>
                                        <option value={modalidadeCurso}>EAD</option>
                                    </select>
                                </div>


                                {/* <div>
                                    <label htmlFor="cashes" ></label>
                                    <input
                                        // onChange={(campo) => setDescricaoDesconto(campo.target.value)}
                                        // value={}
                                        id='cashes'
                                        name="cashes"
                                        type="number"
                                        placeholder="$ Cashes"
                                    />
                                </div> */}

                                <div>
                                    <label htmlFor="cargaHoraria"></label>
                                    <input
                                        onChange={(campo) => setCargaHoraria(campo.target.value)}
                                        className="flex_co"
                                        value={cargaHoraria}
                                        id="cargaHoraria"
                                        placeholder="Carga horária"
                                        type="number"
                                    />
                                </div>


                            </div>

                        </div>
                        <div className="btn_cadastroCurso_g2">
                            <button type="submit" className="botaoCadastroCurso_g2">Cadastrar</button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}