function extraiTextoEditor(){
    return({
        dataAdmissao,
        dataDemissao,
        valorUltimaRemuneracao,
        valorMaiorRemuneracao
    })
}

async function extraiDadosPJE(){
    return({
        reclamante,
        cpfReclamante,
        dataAjuizamento
    })
}

async function gerarPJC(){
    let dadosProcesso = await extraiDadosPJE()
    let textoSentenca = extraiTextoEditor()
    let dataCalculo = new Date().setHours(0,0,0,0)
    let indice = 0
    let versao = 0
    let ordem = 0
    let gprec = criaGprec(dadosProcesso, dataCalculo)
    let dadosEstruturados = criaDadosEstruturados(dataCalculo)
    let parametros = criaParametrosIniciais(
        {
            id: ++indice, 
            versao: ++versao, 
            dataCriacao: dataCalculo
        },
        textoSentenca,
        dadosProcesso
    )
}

function criaParametrosIniciais(
    {id, versao, dataCriacao}, // vem do gerarPJC
    {
        dataAdmissao,
        dataDemissao,
        valorUltimaRemuneracao,
        valorMaiorRemuneracao,
        valorCargaHorariaPadrao = '220'
    }, // vem do extraiTextoEditor
    {dataAjuizamento} // vem do extraiDadosPJE
){
    let parametros = {
        id: id,
        versao: versao,
        atualizacao: 'null',
        hashCodeLiquidacao,
        dataCriacao,
        dataAdmissao,
        dataDemissao,
        dataAjuizamento,
        valorUltimaRemuneracao,
        valorMaiorRemuneracao,
        dataInicioCalculo: 'null',
        dataTerminoCalculo: 'null',
        valorCargaHorariaPadrao,
        sabadoDiaUtil,
        projetaAvisoIndenizado,
        consideraFeriadoEstadual,
        prescricaoFgts,
        prescricaoQuinquenal,
        limitarAvosAoPeriodoDoCalculo,
        zeraValorNegativo,
        consideraFeriadoMunicipal,
        tipoCalculo,
        prazoFeriasProporcional,
        dataDeLiquidacao,
        regimeDoContrato,
        indicesAcumulados,
        usuarioCriador,
        apuracaoPrazoDoAvisoPrevio,
        prazoAvisoInformado,
        ativo,
        processoInformadoManualmente,
        comentarios,
        idSetor,
        instancia,
        validado,
        hashCalculoCorreto,
        hashAtualizacaoCorreto,
        diaFechamentoMes,
        calculoExterno,
        parcelasAtualizaveisCreditosReclamante,
        parcelasAtualizaveisDescontoCreditosReclamante,
        parcelasAtualizaveisOutrosDebitosReclamado,
        parcelasAtualizaveisDebitosReclamante,
        versaoDoSistema,
    }
}

function criaDadosEstruturados(dataCalculo){
    let dadosEstruturados = {
        dataLiquidacao: dataCalculo,
        hashLiquidacao,
        contrSocialDezPorcento: 0,
        contrSocialMeioPorcento: 0,
        custasReclamado: 0,
        custasReclamante: 0,
        debitoReclamantePensaoAlimenticia: 0,
        debitoReclamantePrevidenciaPrivada: 0,
        fgtsDepositoContaVinculada: 0,
        impostoRenda: 0,
        inssReclamado: 0,
        inssReclamante: 0,
        jurosMora:'null',
        jurosPrevidenciaPrivada:'null',
        valorPrincipal: 0,
        tipoRegistroCalculo: 'CALCULO',
        multas,
        honorarios,
    }
}

function criaGprec({reclamante, cpfReclamante}, dataCalculo){
    let gprec = {
        dataCalculo: dataCalculo,
        nomeBeneficiario: reclamante,
        documentoFiscalBeneficiario: cpfReclamante,
        liquidoExequente: 0,
        inssBeneficiario: 0,
        inssExecutado: 0,
        impostoRenda: 0,
        depositoFgts: 0,
        custasJudiciais: 0,
        honorariosReclamante,
        honorariosReclamado,
    }
    return {gprec}
}

function JsonToXml(objeto) {
    var xml = ''
    for (var propriedade in objeto) {
        xml += Array.isArray(objeto[propriedade]) ? '' : "<" + propriedade + ">"
        if (Array.isArray(objeto[propriedade])) {
            for (var array in objeto[propriedade]) {
                xml += "<" + propriedade + ">"
                xml += JsonToXml(objeto[propriedade][array])
                xml += "</" + propriedade + ">"
            }
        } else if (typeof objeto[propriedade] == "object") {
            xml += JsonToXml(objeto[propriedade])
        } else {
            xml += objeto[propriedade]
        }
        xml += Array.isArray(objeto[propriedade]) ? '' : "</" + propriedade + ">"
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '')
    return xml
}