export default class Repository{
    static schema = {
        name: 'Repository',
        primaryKey: 'id',
        properties:{
            id: {type: 'int'},
            imagem: 'string',
            latitude: 'double',
            longitude: 'double',
            acuracia: 'double',          
            altitude: 'int',          
            perguntas: 'string',        
            respostas:'string',         
            descricao: 'string',             
            extensao: 'string',
            direcao: 'double',       
            dataHora: 'string',              
            x: 'string',
            y: 'string',
            z: 'string',
            nomeUsuario: 'string',
            emailUsuario: 'string'
        }
    }
}
