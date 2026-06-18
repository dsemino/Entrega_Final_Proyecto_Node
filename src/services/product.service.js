import { productModel } from '../models/product.model.js';

export const productService = {
    async getProducts() {
        return await productModel.findAll();
    },

    async getProductById(id) {
        const product = await productModel.findById(id);
        if (!product) {
            throw new Error(`El producto con ID ${id} no existe.`);
        }
        return product;
    },

    async createProduct(productData) {
        // Ejemplo de validación de negocio simple
        if (!productData.nombre || !productData.precio) {
            throw new Error("El nombre y el precio del producto son obligatorios.");
        }
        return await productModel.create(productData);
    },

    async updateProduct(id, productData) {
        // Verificar primero si el producto existe antes de actualizar
        await this.getProductById(id); 
        return await productModel.update(id, productData);
    },

    async deleteProduct(id) {
        // Verificar primero si existe
        await this.getProductById(id);
        return await productModel.delete(id);
    },

    async getProductsByMarca(marca) {
        if (!marca) {
            throw new Error("La marca es requerida para realizar la búsqueda.");
        }
        return await productModel.findByMarca(marca);
    }
};
