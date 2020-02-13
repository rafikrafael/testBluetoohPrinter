import React, {Component} from 'react';
import {Text, View, Button, StyleSheet, Image} from 'react-native';
import ViewShot from 'react-native-view-shot';
import {BluetoothEscposPrinter} from 'react-native-bluetooth-escpos-printer';
import dateFormat from 'dateformat';
import {base64JpgLogo} from './constImages';

export default class ViewToImage extends Component {
  state = {
    imagem: '',
  };

  onCapture = uri => {
    this.setState(() => ({
      imagem: uri,
    }));
  };

  printView = async () => {
    await BluetoothEscposPrinter.printPic(this.state.imagem, {
      left: 0,
    });
    await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.btn}>
          <Button
            onPress={() => {
              this.props.navigator.pop();
            }}
            title="&lt;= Voltar para Menu Principal"
          />
        </View>
        <View style={styles.btn}>
          <Button
            disabled={!this.state.imagem}
            onPress={this.printView}
            title="Imprimir Comanda Gerada pela View"
          />
        </View>
        <ViewShot
          onCapture={this.onCapture}
          captureMode="mount"
          options={{format: 'png', quality: 1, result: 'base64'}}>
          <View style={styles.container}>
            <View style={styles.containerTop}>
              <View style={styles.logo}>
                <Image
                  style={{width: 150, height: 70}}
                  source={{uri: 'data:image/jpeg;base64,' + base64JpgLogo}}
                />
              </View>
              <View style={styles.textoCabecalho}>
                <Text style={styles.nomeEmpresa}>Empresa XXXX</Text>
                <Text style={styles.tipoComanda}>Comanda de Consumo</Text>
                <Text style={styles.semValorFiscal}>Sem Valor Fiscal</Text>
              </View>
              
            </View>

            <View>
              <Text style={styles.textInfoRowLeft}>
                Data: {dateFormat(new Date(), 'dd/mm/yyyy hh:MM:ss')}
              </Text>
              <Text style={styles.textInfoRowLeft}>
                Usuário: Rafael Santos
              </Text>
              <Text style={styles.textInfoRowLeft}>Terminal: Caixa</Text>
            </View>

            <View style={styles.containerItens}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.produtoCodigoHeader}>Código</Text>
                <Text style={styles.produtoDescricaoHeader}>Descrição</Text>
                <Text style={styles.produtoQtdeHeader}>
                  Qtde
                </Text>
                <Text style={styles.produtoValorHeader}>
                  Valor Unit.
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.produtoCodigo}>00001</Text>
                <Text style={styles.produtoDescricao}>Produto A</Text>
                <Text style={styles.produtoQtde}>1,00</Text>
                <Text style={styles.produtoValor}>5,00</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.produtoCodigo}>00002</Text>
                <Text style={styles.produtoDescricao}>Produto B</Text>
                <Text style={styles.produtoQtde}>2,00</Text>
                <Text style={styles.produtoValor}>2,50</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.produtoCodigo}>00010</Text>
                <Text style={styles.produtoDescricao}>Produto C</Text>
                <Text style={styles.produtoQtde}>10,00</Text>
                <Text style={styles.produtoValor}>1,50</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textBottomLeft}>Valor Bruto:</Text>
              <Text style={styles.textBottomRight}>R$ 25,00</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textBottomLeft}>Valor Couver:</Text>
              <Text style={styles.textBottomRight}>R$ 10,00</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textBottomLeft}>Valor Desconto:</Text>
              <Text style={styles.textBottomRight}>R$ 0,00</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textBottomLeft}>Valor Total:</Text>
              <Text style={styles.textBottomRight}>R$ 35,00</Text>
            </View>

            <View style={styles.containerBottom}>
              <Text style={styles.msgAgradecimento}>
                AGRADECEMOS A PREFERÊNCIA
              </Text>
            </View>
          </View>
        </ViewShot>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginBottom: 8,
  },
  container: {
    backgroundColor: '#fff',
  },
  containerTop: {
    flexDirection: 'row',
    marginVertical: 10,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  logo: {
    alignItems: 'center',
    width: '30%',
  },
  textoCabecalho: {
    alignItems: 'center',
    width: '70%',
  },
  nomeEmpresa: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  tipoComanda: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  semValorFiscal: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  textInfoRowLeft: {
    fontSize: 22,
  },
  containerItens: {
    marginVertical: 10,
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  produtoCodigoHeader: {
    width: '20%',
    fontSize: 17,
    fontWeight: 'bold',
  },
  produtoDescricaoHeader: {
    width: '40%',
    fontSize: 17,
    fontWeight: 'bold',
  },
  produtoQtdeHeader: {
    width: '15%',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  produtoValorHeader: {
    width: '25%',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  produtoCodigo: {
    width: '20%',
    fontSize: 17,
  },
  produtoDescricao: {
    width: '40%',
    fontSize: 17,
  },
  produtoQtde: {
    width: '15%',
    textAlign: 'right',
    fontSize: 17,
  },
  produtoValor: {
    width: '25%',
    textAlign: 'right',
    fontSize: 17,
  },

  containerInfo: {
    flex: 1,
  },
  containerInfoLine: {
    flex: 1,
    flexDirection: 'row',
  },
  containerBottom: {
    alignItems: 'center',
    marginVertical: 20,
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  textBottomLeft: {
    width: '70%',
    textAlign: 'right',
    fontSize: 20,
  },
  textBottomRight: {
    width: '30%',
    textAlign: 'right',
    fontSize: 20,
  },
  msgAgradecimento: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
