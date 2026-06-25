import  {db}  from '../config/firebase.js';
import { productModel } from '../models/product.model.js';

export const getProducts = async (req, res) => {
    try {
        const products = await productModel.findAll();
        res.status(200).json({ message: "Productos obtenidos", data: products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        
        if (!product) {
            return res.status(404).json({ error: `El producto con ID ${id} no existe.` });
        }
        
        res.status(200).json({ data: product });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { nombre, precio, marca } = req.body;
        if (!nombre || !precio || !marca) {
            return res.status(400).json({ error: "El nombre, precio y la marca del producto son obligatorios." });
        }

        const newProduct = await productModel.create(req.body);
        res.status(201).json({ message: "Creado con éxito", data: newProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validar si existe antes de actualizar
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ error: `El producto con ID ${id} no existe.` });
        }

        const updated = await productModel.update(id, req.body);
        res.status(200).json({ message: "Actualizado con éxito", data: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validar si existe antes de eliminar
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ error: `El producto con ID ${id} no existe.` });
        }

        await productModel.delete(id);
        res.status(200).json({ message: `Producto ${id} eliminado` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getProductsByMarca = async (req, res) => {
    try {
        const { marca } = req.query; 

        if (!marca) {
            return res.status(400).json({ error: "La marca es requerida para realizar la búsqueda." });
        }

        const products = await productModel.findByMarca(marca);
        res.status(200).json({ 
            message: `Productos de la marca '${marca}' obtenidos con éxito`, 
            count: products.length,
            data: products 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
