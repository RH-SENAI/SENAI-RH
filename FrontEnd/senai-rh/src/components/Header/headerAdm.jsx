import { Link } from 'react-router-dom'
import '../../Assets/css/header.css'
import logo from '../../Assets/img/logo1.svg'
import Perfil from '../../Assets/img/Perfil.svg'
import logout from '../../Assets/img/logout.png'
import setaBaixo from '../../Assets/img/seta-para-baixo.png'
import seta from '../../Assets/img/seta.svg'
import { useHistory } from "react-router-dom";
// import sino from '../../assets/img/sino.svg'
import { useState } from 'react'


export default function HeaderAdm() {
    let history = useHistory();
    function logOut() {
        localStorage.removeItem("usuario-login");

        history.push("/");
    }
    return (
        <header className='header_g2'>
            <div className='container container_header_g2' >
                <div className='logo_header_g2'>
                    <Link to="/"> <img src={logo} alt="" /></Link>
                </div>

                <div class='select_header_g2'>
                    <p class='input_header_g2'>Vantagens <img src={setaBaixo} /></p>
                    <input type='hidden' name='some_name_tosetaBaixosetaBaixo_form' />
                    <div class='hidden_header_g2'>
                        <Link className="text_link_header_g2" to='/BeneficiosCadastrar' >  <span> Cadastrar Vantagem </span> </Link>
                        <Link className="text_link_header_g2" to='/CadastrarCursos' > <span> Cadastrar Cursos </span>  </Link>
                        <Link className="text_link_header_g2" to='/cadastrarEmpresa' > <span> Cadastrar Empresa </span>  </Link>
                    </div>
                </div>

                <div class='select_header_g2'>
                    <p class='input_header_g2'>Acompanhar<img src={setaBaixo} /> </p>
                    <input type='hidden' name='some_name_to_form' />
                    <div class='hidden_header_g2'>
                        <Link className="text_link_header_g2" to='#' ><span>Carômetro</span> </Link>
                        <Link className="text_link_header_g2" ><span>Dashboard</span> </Link>
                        <Link className="text_link_header_g2" ><span>Democratização</span> </Link>
                        <Link className="text_link_header_g2" ><span>Cadastrar Funcionário</span> </Link>
                    </div>

                </div>

                <div class='select_header_g2'>
                    <p class='input_header_g2'>Motivações<img src={setaBaixo} /> </p>
                    <input type='hidden' name='some_name_to_form' />
                    <div class='hidden_header_g2'>
                        <Link to='/TodasAtividades' className="text_link_header_g2" ><span>Todas Atividades</span> </Link>
                        <Link to='/ValidarAtividades' className="text_link_header_g2" ><span>Validar Atividades</span> </Link>
                        <Link to='/RankingUsuarios' className="text_link_header_g2" ><span>Ranking</span> </Link>
                        <Link to='/CadastrarAtividades' className="text_link_header_g2" ><span>Cadastrar Atividades</span> </Link>
                        <div class='select'>
                        </div>
                    </div>
                </div>

                <img className='img_logout' onClick={logOut} src={logout} alt="logout" />

            </div>

        </header >
    )
}