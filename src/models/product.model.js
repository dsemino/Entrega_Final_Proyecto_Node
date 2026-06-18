import { db } from '../config/firebase.js';
import { 
    collection, 
    addDoc, 
    getDocs, 
    getDoc, 
    doc, 
    updateDoc, 
    deleteDoc,
    query,
    where 
} from 'firebase/firestore';

const productCollection = collection(db, 'products');

export const productModel = {
    // Obtener todos los productos
    async findAll() {
        const snapshot = await getDocs(productCollection);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    async findByMarca(marca) {
        // Crea una consulta: busca en la colección donde el campo 'marca' sea igual al parámetro
        const q = query(productCollection, where("marca", "==", marca));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Obtener un producto por ID
    async findById(id) {
        const docRef = doc(db, 'products', id);
        const snapshot = await getDoc(docRef);
        return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
    },

    // Crear un producto
    async create(data) {
        const docRef = await addDoc(productCollection, data);
        return { id: docRef.id, ...data };
    },

    // Actualizar un producto
    async update(id, data) {
        const docRef = doc(db, 'products', id);
        await updateDoc(docRef, data);
        return { id, ...data };
    },

    // Eliminar un producto
    async delete(id) {
        const docRef = doc(db, 'products', id);
        await deleteDoc(docRef);
        return true;
    }
};
