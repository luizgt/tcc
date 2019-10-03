import Realm from 'realm';
import Repository from '../schemas/Repository';
import User from '../schemas/User';

export default function getRealm(){
    return Realm.open({
        schema: [Repository],
    });
}

export function getUser(){
    return Realm.open({
        schema: [User],
    });
}