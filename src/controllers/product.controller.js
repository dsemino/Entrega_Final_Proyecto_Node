// import express from 'express';

// const app = express;


// app.use(express.json());


// const products = [
//   { id: 1, name: "Mouse", price: 12000 },
//   { id: 2, name: "Teclado", price: 25000 },
//   { id: 3, name: "Monitor", price: 150000 },
// ];

// export const getProducts = (req, res) => {
//   res.json(products);
// };

// export const getProductById = (req, res) => {
//   const id = Number(req.params.id);
//   // const { id } = req.params;

//   const product = products.find((product) => product.id === id);

//   if (!product) {
//     return res.status(404).json({
//       message: "Producto no encontrado",
//     });
//   }

//   res.json(product);
// };

// export const createProduct = (req, res) => {
//   const { name, price } = req.body;

//   if (!name || !price ) {
//     return res.status(422).json({
//       message: "Faltan datos obligatorios",
//     });
//   }

//   const newProduct = {
//      id: products.length + 1,
//      name,
//      price,
//   //   category: 1, // Solo es un ejemplo, todas las categorías son 1
//    };

//   products.push(newProduct);

//   res.status(201).json(newProduct);
// };

// export const deleteProduct = (req, res) => {
//   const id = Number(req.params.id);

//   const productIndex = products.findIndex((product) => product.id === id);

//   if (productIndex === -1) {
//     return res.status(404).json({
//       message: "Producto no encontrado",
//     });
//   }

//   const deletedProduct = products.splice(productIndex, 1);

//   res.json({
//     message: "Producto eliminado",
//     product: deletedProduct[0],
//   });
// };


// Simularemos las respuestas por ahora; luego se conectarán a los servicios de Firebase
/*export const getProducts = async (req, res) => {
    try {
        res.status(200).json({ message: "Lista de productos obtenida con éxito", data: [] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json({ message: `Producto con ID ${id} obtenido`, data: { id } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        res.status(201).json({ message: "Producto creado con éxito", data: newProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        res.status(200).json({ message: `Producto con ID ${id} actualizado`, data: updatedData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json({ message: `Producto con ID ${id} eliminado con éxito` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

*/

import { productService } from '../services/product.service.js';

export const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.status(200).json({ message: "Productos obtenidos", data: products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(id);
        res.status(200).json({ data: product });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json({ message: "Creado con éxito", data: newProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await productService.updateProduct(id, req.body);
        res.status(200).json({ message: "Actualizado con éxito", data: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await productService.deleteProduct(id);
        res.status(200).json({ message: `Producto ${id} eliminado` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getProductsByMarca = async (req, res) => {
    try {
        // Captura la marca desde la Query String (?marca=Valor)
        const { marca } = req.query; 

        if (!marca) {
            return res.status(400).json({ error: "Debe proporcionar el parámetro 'marca' en la URL." });
        }

        const products = await productService.getProductsByMarca(marca);
        res.status(200).json({ 
            message: `Productos de la marca '${marca}' obtenidos con éxito`, 
            count: products.length,
            data: products 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
