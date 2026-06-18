
import { Router } from "express";
import { verifyToken } from '../middlewares/auth.middleware.js'; // <- Importar el middleware


const router = Router();


import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsByMarca,
} from "../controllers/product.controller.js";

// Prefijo: /api/products

// router.get("/", getProducts);
// router.get("/:id", getProductById);
// router.post("/", createProduct);
// router.delete("/:id", deleteProduct);
// router.put('/:id', updateProduct);


// Rutas Públicas (Cualquiera puede ver los electrodomésticos)
router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/search/filter', getProductsByMarca);

// Rutas Protegidas (Solo accesibles con un JWT válido)
router.post('/', verifyToken, createProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

export default router;
