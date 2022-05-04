import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './Pages/Home/App';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import './index.css';
import cadastro from './pages/cadastrarUsuario/cadastrarUsuario';
import TelaAcesso from './pages/acesso/telaAcesso'
import atualizarPerfil from './pages/atualizarUsuario/atualizarUsuario';
import reportWebVitals from './reportWebVitals';
import democratizacao from './pages/democratizacao/democratizacao';
import democratizacaoAdm from './pages/democratizacao/democratizacaoAdm';
import redirecionar from './pages/redirecionar/redirecionar';
import redirecionarADM from './pages/redirecionar/redirecionarADM';
import decisao from './pages/democratizacao/decisoes';
import rankingAcompanhar from './pages/ranking/rankingAcompanhar';
import Carometro from './pages/carometro/carometro';
import Login from './pages/login/login.jsx';
import Dashboard from './pages/dashboard/dashboardFuncionario';
// import reportWebVitals from './reportWebVitals';


const routing = (
  <Router>
    <div>
      <Switch>
      <Route path="/carometro" component={Carometro}/>
      <Route exact path="/" component={TelaAcesso}/>
      <Route path="/login" component={Login}/>
      <Route path="/cadastro" component={cadastro}/> 
      <Route path ="/atualizar" component={atualizarPerfil}/>
      <Route exact path="/democratizacao/:iddecisao" component={democratizacao}/>
      <Route exact path="/democratizacaoAdm" component={democratizacaoAdm}/>
      <Route path="/redirecionar" component={redirecionar} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/redirecionarADM" component={redirecionarADM} />
      <Route path="/decisao" component={decisao} />
      <Route path="/rankingAcompanhar" component={rankingAcompanhar} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
