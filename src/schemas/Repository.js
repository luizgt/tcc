export default class Repository{
    static schema = {
        name: 'Repository',
        primaryKey: 'id',
        properties:{
            id: {type: 'int'},
            imagem: 'string',
            latitude: 'string',
            longitude: 'string',
            acuracia: 'string',          
            altitude: 'string',          
            perguntas: 'string',        
            respostas:'string',         
            descricao: 'string',             
            extensao: 'string',
            direcao: 'string',       
            dataHora: 'string',              
            x: 'string',
            y: 'string',
            z: 'string'
        }
    }
}
