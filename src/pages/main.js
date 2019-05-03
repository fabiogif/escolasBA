import React from 'react';
import axios from 'axios';

import api from '../services/api';
import { View , Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';

export default class Main extends React.Component{
    state = {
        escolaInfo: {},
        escolas: [],
        arrayEscolas: [],
        page:1,
      }
    static navigationOptions = {
        title: 'Encontre sua escola',
        headerStyle: {
          backgroundColor: '#0000CD',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };


    //Assim que pagina é carregada é executado
    componentDidMount(){
       this.loadEscolas();
    }

    loadEscolas = async (page =1) => {
        const response = await api.get(`/escolas?page=${page}`);
        const escolas = response.data;
        const { ...escolaInfo } = response.data;
        const arrayEscolas  = escolas['_embedded']['escolas']
         this.setState({ arrayEscolas, escolaInfo })
        
    };

    loadMore = ()=>{
        const { page, escolaInfo} = this.state
        if(page === escolaInfo.pages) return;
        const pageNumber = page + 1;
        this.loadEscolas()
    }
    renderItem = ({ item }) =>(
        <View style={ styles.escolaContainer} >
            <Text style={ styles.escolaNome }>{item.nome}</Text>
            <Text style={ styles.escolaMunicipio }>Município: {item.nomeMunicipio}</Text>
            <Text style={ styles.escolaMunicipio }>Responsável: {item.responsavel}</Text>
            
            <TouchableOpacity  style={styles.escolaButton} onPress={() => {}}>
                <Text style={styles.escolaButtonText}>Mais Informações</Text>
            </TouchableOpacity>
        </View>
    )
    ///Criar mais Informações com maps 
    render(){
        return(
            <View style={ styles.container }>
             <Text>Lista de escolas:</Text>
             <FlatList
                contentContainerStyle={ styles.list}
                data={this.state.arrayEscolas}
                keyExtractor={item =>  item.id }
                renderItem = {this.renderItem }
                onEndReached={this.loadMore}
                onEndReachedThreshold={0.1}
             />

            </View>
        );
    }
}

const styles =  StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fafafa'
    },
    list:{
        padding:20
    },
    escolaContainer: {
        backgroundColor: '#FFF',
        borderWidth:1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding:15,
        marginBottom:15,
    },
    escolaNome:{
        fontSize:14,
        textTransform: 'capitalize',
        fontWeight: 'bold',
        color: "#333"
    },
    escolaMunicipio:{
        fontSize:12,
        color: '#999',
        textTransform: 'capitalize',
        marginTop:5,
        lineHeight:24
    },
    escolaButton:{
        height: 42,
        borderRadius:5,
        borderWidth:2,
        borderColor: '#0000CD',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10
    },
    escolaButtonText:{
        fontSize:16,
        color:"#000",
        fontWeight: "bold"
    }

    
})

