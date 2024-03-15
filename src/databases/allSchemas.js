import Realm from "realm";

export const LoggedInUser = 'LoggedInUser';
export const System = 'System';
export const MyCart= 'MyCart';

export const LoggedInUserSchema = {
    name: LoggedInUser,
    primaryKey:'tableId',
    properties:{
        id: 'int',
        age: {type:'int', optional: true},
        code: {type:'string', optional: true},
        contact: {type:'string', optional: true},
        createdBy: {type:'int', optional: true},
        createdOn: {type:'date', optional: true},
        email: {type: 'string', indexed: true, optional:true},
        firstName: {type: 'string', indexed: true, optional:true},
        lastName: {type: 'string', indexed: true, optional:true},
        status: {type: 'string', indexed: true, optional:true},
        token: {type: 'string', indexed: true, optional: true},
        updatedBy: {type:'int', optional: true},
        updatedOn: {type:'date', optional: true},
        userType: {type:'string', optional: true},
        tableId: 'int'
    }
};

export const SystemSchema ={
    name: System,
    primaryKey: 'id',
    properties:{
        id: 'int',
        key: {type: 'string', indexed: true, optional: true},
        description: {type: 'string', optional: true},
        status:{type: 'string', optional: true},
        done: {type: 'bool', default: false},
        createdOn: {type:'date', optional: true}
    }
}

export const CartSchema = {
    name: MyCart,
    primaryKey:'id',
    properties:{
        id: 'int',
        name: {type: 'string', optional: true},
        price: {type: 'double', optional:true},
        quantity: {type: 'double', optional:true},
        subtotal: {type: 'float'},
        tableId: 'int'
    }
}

// export const CartItemsSchema={
//     name: CartItems,
//     primaryKey:'tableId',
//     id: 'int',
//     name: {type: 'string', optional: true},
//     price: {type: 'double', optional:true},
//     tableId: 'int'
// }

const databaseOptions ={
    path: 'smart_collect.realm',
    schema: [SystemSchema, LoggedInUserSchema, CartSchema],
    schemaVersion: 0,
}

//Generic Insert
export const GenericInsert = (schema, newItem) => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            realm.create(schema, newItem);
            resolve(newItem); 
        })
    }).catch((error)=>reject(error));
});


//GenericUpdate
export const GenericUpdate = (schema, item) => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            let updatingItem = realm.objectForPrimaryKey(schema, item.id);
            updatingItem.name = item.name;
            resolve(); 
        })
    }).catch((error)=>reject(error));
});

// GenericDelete
export const GenericDelete = (schema, todoListId) => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            let item = realm.objectForPrimaryKey(schema, todoListId);
            realm.delete(item);
            resolve(); 
        })
    }).catch((error)=>reject(error));
});

// delete all
export const GenericDeleteAll = (schema) => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            let items = realm.objects(schema);
            realm.delete(items);
            resolve(); 
        })
    }).catch((error)=>reject(error));
});

// Generic select all
export const GenericQueryAll = (schema) => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            let results = realm.objects(schema);
            resolve(results); 
        })
    }).catch((error)=>reject(error));
});

// Generic select where
export const GenericQueryWhere = (schema, filters) => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            let results = realm.objects(schema).filtered(filters);
            resolve(results); 
        })
    }).catch((error)=>reject(error));
});

//GenericCartUpdate
export const GenericCartUpdate = (schema, item, action) => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
            let updatingCart = realm.objectForPrimaryKey(schema, item.id);
            if(action == 'ADD'){
                updatingCart.quantity = item.quantity +1;
            }else if(action == 'REMOVE'){
                updatingCart.quantity = item.quantity -1;
            }else if(action == 'DELETE'){
                realm.delete(updatingCart);
            }
            resolve(); 
        })
    }).catch((error)=>reject(error));
});

export default new Realm(databaseOptions);
