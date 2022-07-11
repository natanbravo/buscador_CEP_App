import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import api from './src/services/api';

export default function App() {
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  function limpar() {
    setCep('');
    inputRef.current.focus();
    setCepUser(null);
  }

  async function buscar() {
    if (cep === '') {
      alert('Digite um CEP válido');
      setCep('');
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss();
    } catch (error) {
      console.log('ERROR: ' + error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#13293D'} barStyle={'light-content'} />
      <SafeAreaView>
        <Text style={styles.title}>Digite seu CEP</Text>
        <TextInput
          style={styles.txtInput}
          placeholder="EX: 85818270"
          placeholderTextColor={'#E8F1F2'}
          keyboardType={'numeric'}
          value={cep}
          onChangeText={texto => setCep(texto)}
          ref={inputRef}
        />

        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.buscarBtn} onPress={buscar}>
            <Text style={styles.buscarText}>BUSCAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteBtn} onPress={limpar}>
            <Text style={styles.limparText}>LIMPAR</Text>
          </TouchableOpacity>
        </View>

        {cepUser && (
          <View style={styles.resultArea}>
            <Text style={styles.resultTitle}>Resultado</Text>
            <Text style={styles.resultTxt}>CEP: {cepUser.cep}</Text>
            <Text style={styles.resultTxt}>
              Logradouro: {cepUser.logradouro}
            </Text>
            <Text style={styles.resultTxt}>Bairro: {cepUser.bairro} </Text>
            <Text style={styles.resultTxt}>Cidade: {cepUser.localidade} </Text>
            <Text style={styles.resultTxt}>Estado: {cepUser.uf}</Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13293D',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: '#E8F1F2',
    marginVertical: 50,
  },
  txtInput: {
    backgroundColor: '#006494',
    width: 300,
    height: 60,
    borderRadius: 15 / 2,
    color: '#E8F1F2',
    marginTop: 40,
    padding: 20,
  },
  btnWrapper: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginVertical: 50,
  },
  buscarBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00ff00',
    width: 100,
    height: 50,
    borderRadius: 15 / 2,
  },
  deleteBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff0000',
    width: 100,
    height: 50,
    borderRadius: 15 / 2,
  },
  buscarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E8F1F2',
  },
  limparText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E8F1F2',
  },
  resultArea: {
    backgroundColor: '#006494',
    width: 300,
    height: 350,
    borderRadius: 20 / 2,
  },
  resultTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1B98E0',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 30,
  },
  resultTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E8F1F2',
    marginTop: 10,
    marginHorizontal: 20,
    paddingBottom: 10,
  },
});
