import React from 'react';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import gerarPDF from '../relatorios/impressao';
import ClienteService from '../../app/service/clienteService';
import { Button } from 'react-bootstrap';
import Card from "../../components/card";
import FormGroup from '../../components/form-group'
import moment from 'moment';
import CpfCnpj from '../../components/inputs/cpfInput';



class RelatorioCliente extends React.Component {


  constructor() {
    super();
    this.clienteService = new ClienteService();
  }

  state = {
    dataInicial: '',
    dataFinal: '',
    filtro: true
  }

  relatorioTodosClientes = async () => {
    await this.clienteService.listar()
      .then(response => {
        this.setState({ dados: response.data })
      })
      .catch(error => console.log("deupau"))


    const colunas = [
      { text: 'Código', style: 'tableHeader', fontSize: 10 },
      { text: 'Nome', style: 'tableHeader', fontSize: 10 },
      { text: 'E-mail', style: 'tableHeader', fontSize: 10 },
      { text: 'Telefone', style: 'tableHeader', fontSize: 10 }
    ]

    const dadosAMostrar = this.state.dados.map((dado) => {
      return [
        { text: dado.id, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },
        { text: dado.nome, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },
        { text: dado.email, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },
        { text: dado.telefone, style: 'tableHeader', fontSize: 9, margin: [0, 2, 0, 2] },

      ]
    })

    const tamanho = ['*', '*', '*', '*'];

    gerarPDF("Todos os clientes cadastrados", dadosAMostrar, colunas, "relatorio_clientes", tamanho);

    this.setState({ dados: [] })
  }

  render() {
    return (

      <div className="row justify-content-center">
        <div className="col-6 justify-content-center mb-3">

          <Card title="Filtrar por data">

            <div className="row">


              <div className="col-sm-12 col-md-6 col-xl-6 col-xxl-6">
                <FormGroup id="inputdataInicial" label="Data inicial: *">
                  <input id="dataInicial" type="date" className="form-control"



                             /* TODO pattern=""*/ required />
                </FormGroup>
              </div>


              <div className="col-sm-12 col-md-6 col-xl-6 col-xxl-6 mb-2">
                <FormGroup id="inputDataFinal" label="Data final: *">
                  <input id="dataFinal" type="date" className="form-control"



                             /* TODO pattern=""*/ required />
                </FormGroup>
              </div>
              <div className="d-flex justify-content-end">
                <div className="p-1">
                  <button onClick={this.props.editar ? this.editar : this.cadastrar} type="button" className="btn btn-success">Filtrar</button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card subtitulo title="Relatórios">
            <div className="row">

              <div className="col-6">

                <Button className="col-12 btn btn-info" onClick={e => this.relatorioTodosClientes()}><FontAwesomeIcon className="mr-3" icon={faFilePdf} />
                  Listar todos os clientes
                </Button>
              </div>
              <div className="col-6">
                <Button className="col-12 btn btn-info" onClick={e => this.relatorioTodosClientes()}><FontAwesomeIcon className="mr-3" icon={faFilePdf} />
                  Listar quantidades de animais por cliente
                </Button>
              </div>
            </div>

          </Card>


        </div>
      </div>


    )
  }
}

export default RelatorioCliente;