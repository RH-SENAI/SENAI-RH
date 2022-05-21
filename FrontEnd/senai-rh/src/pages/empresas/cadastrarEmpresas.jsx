import HeaderAdm from "../../components/header/headerAdm";
import cadastroEmpresa from '../../assets/img/cadastroEmpresa.svg'
import '../../assets/css/cadastroEmpresa.css'
import iconeEnviarArquivo from '../../assets/img/iconeEnviarArquivo.png'
import Footer from "../../components/footer";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import api from "../../services/api";
import axios from "axios";
import PhoneInput from 'react-phone-number-input/input'
import { useForm } from "react-hook-form";


export default function CadastrarEmpresa() {

    const notify_Logar_Failed = () => toast.error("Você esqueceu de algum campo, por favor tente novamente!")
    const notify_cadastro_sucess = () => toast.success("Cadastro realizado com sucesso!")
    const [idLocalizacao, setIdLocalizacao] = useState(0)
    const [localizacao, setLocalizacao] = useState([])
    const [estados, setEstados] = useState([])
    const [idEstado, setIdEstado] = useState(0)
    const [nomeEmpresa, setNomeEmpresa] = useState('')
    const [emailEmpresa, setEmailEmpresa] = useState('')
    const [caminhoImagemEmpresa, setCaminhoImagemEmpresa] = useState('');
    const [telefoneEmpresa, setTelefoneEmpresa] = useState()
    const [rua, setRua] = useState('')
    const { handleSubmit, setValue, setFocus, register } = useForm();

    const checkCEP = (campo) => {
        const cep1 = campo.target.value.replace(/\D/g, '');
        console.log(cep1);
        fetch(`https://viacep.com.br/ws/${cep1}/json/`)
            .then(res => res.json()).then(data => {
                console.log(data);
                setValue('logradouro', data.logradouro);
                setValue('bairro', data.bairro);
                setValue('cidade', data.localidade);
                setValue('estado', data.uf);
                setFocus('addressNumber')
            });
    }


    function buscarLocalizacao() {
        api('/Localizacaos', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setLocalizacao(resposta.data)
                    console.log('Aqui resposta')
                    console.log(resposta)
                }
            })
            .catch(erro => console.log(erro))
    }
    useEffect(buscarLocalizacao, [])

    function buscarEstados() {
        api('/Estados', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    setEstados(resposta.data)
                    console.log('Estados')
                    console.log(resposta)
                }
            })
            .catch(erro => console.log(erro))
    }
    useEffect(buscarEstados, [])

    const [nomeBairro, setNomeBairro] = useState('')
    const [nomeLogradouro, setNomeLogradouro] = useState('')
    const [nomeCidade, setNomeCidade] = useState('')
    const [nomeEstado, setNomeEstado] = useState('')
    const [cep1, setCep1] = useState('')
    const [numero, setNumero] = useState(0)


    const efetuarCadastro = (event) => {
        event.preventDefault();

        //Testando

        var inputNumero = document.getElementById('numero');
        console.log('inputNumero:' + inputNumero.value)

        //

        // //Bairro
        // api.post('/Bairros/Cadastrar', nomeBairro)
        //     .then(function (response) {
        //         console.log(response);
        //         console.log("Cadastrou o Bairro")

        //     })
        //     .catch(erro => console.log("Erro Bairro" + erro))

        // //logradouro
        // api.post('/Lougradouros/Cadastrar', nomeLogradouro)
        //     .then(function (response) {
        //         console.log(response);
        //         console.log("Cadastrou o Logradouro")

        //     })
        //     .catch(erro => console.log("Erro Logradouro" + erro))

        // //Cidade
        // api.post('/Cidades/Cadastrar', nomeCidade)
        //     .then(function (response) {
        //         console.log(response);
        //         console.log("Cadastrou o Cidade")
        //     })
        //     .catch(erro => console.log("Erro Cidade" + erro))

        // //Estado
        // api.post('/Estados/Cadastrar', nomeEstado)
        //     .then(function (response) {
        //         console.log(response);
        //         console.log("Cadastrou o Estado")

        //     })
        //     .catch(erro => console.log("Erro Estado" + erro))

        // //Cep
        // api.post('/Ceps/Cadastrar', cep1)
        //     .then(function (response) {
        //         console.log(response);
        //         console.log("Cadastrou o Cep")

        //     })
        //     .catch(erro => console.log("Erro Cep" + erro))




        // //Empresa

        // var formData = new FormData();

        // const element = document.getElementById('arquivo')
        // const file = element.files[0]
        // formData.append('fotoEmpresa', file, file.name)
        // formData.append('nomeEmpresa', nomeEmpresa);
        // formData.append('idLocalizacao', idLocalizacao);
        // formData.append('emailEmpresa', emailEmpresa);
        // formData.append('telefoneEmpresa', telefoneEmpresa);
        // formData.append('caminhoImagemEmpresa', caminhoImagemEmpresa);

        // api({
        //     method: "post",
        //     url: "/Empresa/Cadastrar",
        //     data: formData,
        //     headers: { "Content-Type": "multipart/form-data" },
        // })
        //     .then(function (response) {
        //         console.log(response);
        //         notify_cadastro_sucess();
        //     })
        //     .catch(resposta => notify_Logar_Failed())
    }

    return (

        <div className="geral_g2">
            <HeaderAdm />

            <div className="container_empresa_g2 container_forms_cadastroEmpresa_g2">
                <div className="box_img_cadastroEmpresa_g2">
                    <img src={cadastroEmpresa} alt="imagemCadastroEmpresa" />
                </div>

                <form onSubmit={efetuarCadastro}>
                    <div className="box_forms_cadastroEmpresa_g2">
                        <div className="title_cadastroEmpresa_g2">
                            <h1>Cadastrar Empresa</h1>
                        </div>


                        <div className="box_inputs_cadastroEmpresa_g2">
                            <div>
                                <div className="container_cadastroEmpresa_inputs_g2">
                                    <div className="input_g2_cadastro">
                                        <input
                                            id="nomeEmpresa"
                                            onChange={(campo) => setNomeEmpresa(campo.target.value)}
                                            value={nomeEmpresa}
                                            type="text"
                                            name="nomeEmpresa"
                                            placeholder="Nome da Empresa"
                                        />
                                        <label htmlFor="nomeEmpresa">Nome da Empresa</label>
                                    </div>

                                    <div className="input_g2_cadastro">
                                        <input
                                            id="telefoneEmpresa"
                                            onChange={(campo) => setTelefoneEmpresa(campo.target.value)}
                                            value={telefoneEmpresa}
                                            type="tel"
                                            name="telefoneEmpresa"
                                            pattern="\([0-9]{2}\)[9]{1}[0-9]{3}-[0-9]{4}"
                                            placeholder="(xx)9xxx-xxxx"
                                        />
                                        <label htmlFor="telefoneEmpresa" >Telefone</label>
                                    </div>

                                    {/* <PhoneInput
                                        country="BR"
                                    /> */}

                                    <div className="input_g2_cadastro">
                                        <input
                                            id="cep"
                                            onChange={(campo) => setCep1(campo.target.value)}
                                            value={cep1}
                                            // {...register('cep')}
                                            type="text"
                                            name="nomeDesconto"
                                            placeholder="cep"
                                            onBlur={(campo) => checkCEP(campo)}
                                        />
                                        <label htmlFor="nomeDesconto" >Cep</label>
                                    </div>

                                    <div className="input_g2_cadastro">
                                        <input
                                            id="numero"
                                            onChange={(campo) => setNumero(campo.target.value)}
                                            // value={numero}
                                            {...register('addressNumber')}
                                            type="text"
                                            name="numero"
                                            placeholder="Numero"
                                        />
                                        <label htmlFor="numero">Número</label>
                                    </div>


                                    <div className="input_g2_cadastro">
                                        <input
                                            id="nomeCidade"
                                            onChange={(campo) => setNomeCidade(campo.target.value)}
                                            value={nomeCidade}
                                            type="text"
                                            name="nomeCidade"
                                            placeholder="CEP"
                                            {...register('cidade')}
                                        />
                                        <label htmlFor="nomeCidade">Cidade</label>
                                    </div>





                                </div>
                            </div>

                            <div>

                                <div className="input_g2_cadastro">
                                    <input
                                        id="emailEmpresa"
                                        onChange={(campo) => setEmailEmpresa(campo.target.value)}
                                        value={emailEmpresa}
                                        type="text"
                                        name="emailEmpresa"
                                        placeholder="E-mail"
                                    />
                                    <label htmlFor="emailEmpresa">E-mail</label>
                                </div>

                                <div>
                                    <label></label>
                                    <label className="label_arquivo_cadastroEmpresa_g2" htmlFor="fotoDesconto">  <img className="img_file_cadastro_empresa_g2" src={iconeEnviarArquivo} alt="iconeEnviarArquivo" />Enviar arquivo</label>
                                    <input
                                        accept="image/png, image/jpeg"
                                        id="fotoDesconto"
                                        name="arquivo"
                                        className="input_file_cadastroEmpresa_g2"
                                        type="file"
                                    />
                                </div>


                                <div className="input_g2_cadastro">
                                    <input
                                        id="logradouro"
                                        onChange={(campo) => setNomeLogradouro(campo.target.value)}
                                        value={nomeLogradouro}
                                        type="text"
                                        {...register('logradouro')}
                                        name="logradouro"
                                        placeholder="Rua"
                                    />
                                    <label htmlFor="logradouro" >Rua</label>
                                </div>


                                <div className="input_g2_cadastro">
                                    <input
                                        id="bairro"
                                        onChange={(campo) => setNomeBairro(campo.target.value)}
                                        value={nomeBairro}
                                        type="text"
                                        name="bairro"
                                        {...register('bairro')}
                                        placeholder="Bairro"
                                    />
                                    <label htmlFor="bairro" >Bairro</label>
                                </div>



                                <div className="input_g2_cadastro">
                                    <input
                                        id="nomeEstado"
                                        onChange={(campo) => setNomeEstado(campo.target.value)}
                                        value={nomeEstado}
                                        type="text"
                                        {...register('estado')}
                                        name="nomeEstado"
                                        placeholder="Estado"
                                    />
                                    <label htmlFor="nomeEstado" >Estado</label>
                                </div>




                                {/* <div>
                                    <label for="idLocalizacao" ></label>
                                    <select
                                        className="inputCadastroCursoSelect_g2"
                                        id="idLocalizacao"
                                        onChange={(campo) => setIdLocalizacao(campo.target.value)}
                                        value={idLocalizacao}
                                    >

                                        <option value="0">Localizações</option>

                                        {
                                            localizacao.map((local) => {
                                                return (
                                                    <option key={local.idLocalizacao} value={local.idLocalizacao}>
                                                        {local.idLocalizacao}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div> */}


                                {/* <div>
                                    <label for="idEmpresa" ></label>
                                    <select
                                        className="inputCadastroCursoSelect_g2"
                                        id="idEstado"
                                        onChange={(campo) => setIdEstado(campo.target.value)}
                                        value={idEstado}
                                    >

                                        <option value="0">Estados</option>

                                        {
                                            estados.map((estado) => {
                                                return (
                                                    <option key={estado.idEstado} value={estado.idEstado}>
                                                        {estado.nomeEstado}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div> */}





                            </div>
                        </div>
                        <div className="btn_cadastroEmpresa_g2">
                            <button type="submit" className="botaoCadastroEmpresa_g2">Cadastrar</button>
                        </div>
                    </div>
                </form>

            </div>

            <Footer />
        </div>

    )
}