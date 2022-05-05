import { Link } from 'react-router-dom'
import '../../assets/css/header.css'
import logo from '../../assets/img/logo.svg'
import Perfil from '../../assets/img/Perfil.svg'
import logout from '../../assets/img/logout.png'
import setaBaixo from '../../assets/img/seta-para-baixo.png'
import { useState } from 'react'


export default function HeaderFuncionario() {
    // const [active, setMode] = useState(false);
    // const ToggleMode = () => {
    //     setMode(!active)
    // }
    return (
        <header className="header_g2">
            <div className='container container_header_g2' >
                <div className='logo_header_g2'>
                    <Link to="/"> <img  src={logo} alt="Logo do Senai" /></Link>
                </div>


                <div class='select_header_g2'>
                    <p class='input_header_g2'>Vantagens <img src={setaBaixo} /></p>
                    <input type='hidden' name='some_name_tosetaBaixosetaBaixo_form' />
                    <div class='hidden_header_g2'>
                        <Link className="text_link_header_g2" to='/Beneficios'> <span>Vantagens</span></Link>
                        <Link className="text_link_header_g2" to='/CursosRapidos'> <span> Cursos</span></Link>

                    </div>
                </div>
                <div class='select_header_g2'>
                    <p class='input_header_g2'>Acompanhar<img src={setaBaixo} /></p>
                    <input type='hidden' name='some_name_to_form' />
                    <div class='hidden_header_g2'>
                        <Link className="text_link_header_g2" to='/Adm' ><span>Carômetro</span></Link>
                        <Link className="text_link_header_g2" > <span>Dashboard</span></Link>
                        <Link className="text_link_header_g2" > <span>Democratização</span></Link>
                    </div>
                </div>

                <div class='select_header_g2'>
                    <Link class='input_header_g2 input_motivacao_header_g2'>Motivações</Link>
                    <input type='hidden' name='some_name_to_form' />
                </div>

                <div className="img_perfil_g2" >
                    <Link to="/perfil"> <img  src={Perfil}  alt="Meu Perfil" /> </Link> 
                </div>


                <img className='img_logout_header_g2' src={logout} alt="" />
            </div>
        </header>
    )
}