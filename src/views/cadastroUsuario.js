import React from 'react'
import { withRouter } from "react-router-dom";
import Card from '../components/card'
import FormGroup from '../components/form-group'
import UsuarioService from '../app/service/usuarioService';
import { mensagemErro, mensagemSucesso } from '../components/toastr';


class CadastroUsuario extends React.Component {



    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    validar() {
        const msgs = []

        if (!this.state.nome) {
            msgs.push('O campo Nome é obrigatório.')
        }

        if (!this.state.email) {
            msgs.push('O campo Email é obrigatório.')
        }
        else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9.]+\.[a-z]/)) {
            msgs.push('Informe um email válido.')
        }

        if (!this.state.senha || !this.state.senhaRepeticao) {
            msgs.push('Digite a senha 2x.')
        } else if (this.state.senha !== this.state.senhaRepeticao) {
            msgs.push('As senhas devem coincidir.')
        }


        return msgs;
    }

    cadastrar = () => {

        const msgs = this.validar();

        if (msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }
        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <Card title=" Cadastro de Usuário">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input className="form-control" type="text"
                                    id="inputNome"
                                    name="nome"
                                    onChange={e => this.setState({ nome: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input className="form-control"
                                    type="email"
                                    id="inputEmail"
                                    name="email"
                                    onChange={e => this.setState({ email: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input className="form-control"
                                    type="password"
                                    id="inputSenha"
                                    name="senha"
                                    onChange={e => this.setState({ senha: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                <input className="form-control"
                                    type="password"
                                    id="inputRepitaSenha"
                                    name="senhaRepeticao"
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })}
                                />
                            </FormGroup>
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>

                        </Card>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(CadastroUsuario)