import Realm from 'realm';
import Repository from '../schemas/Repository';

export default function getRealm(){
    return Realm.open({
        schema: [Repository],
    });
}