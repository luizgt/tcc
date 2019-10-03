export default class User{
    static schema = {
        name: 'User',
        primaryKey: 'id',
        properties:{
            id: 'int',
            emailUsuario: 'string',
            nomeUsuario: 'string',
            fotoUsuario: 'string'
        }
    }
}
