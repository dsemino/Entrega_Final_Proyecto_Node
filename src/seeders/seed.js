import { productModel } from '../models/product.model.js';
import dotenv from 'dotenv';

dotenv.config();

const electrodomesticos = [
    { nombre: "Heladera No Frost", marca: "Whirlpool", modelo: "WRM57K2", precio: 1200.00, stock: 15, color: "Inoxidable", categoria: "Refrigeración", origen: "Argentina", description: "Heladera de alta eficiencia con freezer superior." },
    { nombre: "Lavarropas Automático", marca: "Samsung", modelo: "WW90J54", precio: 850.00, stock: 10, color: "Blanco", categoria: "Lavado", origen: "Argentina", description: "Carga frontal con tecnología EcoBubble y capacidad de 9kg." },
    { nombre: "Microondas Digital", marca: "BGH", modelo: "B223DN", precio: 180.00, stock: 25, color: "Negro", categoria: "Cocina", origen: "China", description: "Microondas con grill y menús programados de cocción rápida." },
    { nombre: "Smart TV 55\" 4K", marca: "LG", modelo: "55UQ8000", precio: 650.00, stock: 8, color: "Negro", categoria: "Entretenimiento", origen: "Tierra del Fuego", description: "Televisor inteligente con inteligencia artificial ThinQ y WebOS." },
    { nombre: "Aire Acondicionado Split", marca: "Surrey", modelo: "553GFQ", precio: 950.00, stock: 12, color: "Blanco", categoria: "Climatización", origen: "Argentina", description: "Frío/Calor de 3500W con tecnología Inverter para ahorro de energía." },
    { nombre: "Cocina a Gas", marca: "Longvie", modelo: "18431X", precio: 720.00, stock: 7, color: "Inoxidable", categoria: "Cocina", origen: "Argentina", description: "Multigas con encendido a una mano y timer digital." },
    { nombre: "Aspiradora Robot", marca: "Xiaomi", modelo: "Mop 2 Ultra", precio: 450.00, stock: 20, color: "Negro", categoria: "Limpieza", origen: "China", description: "Aspira y trapea con navegación láser inteligente de alta precisión." },
    { nombre: "Pava Eléctrica", marca: "Philips", modelo: "HD9300", precio: 45.00, stock: 50, color: "Rojo", categoria: "Pequeños Electrodomésticos", origen: "China", description: "Selector de temperatura ideal para mate y corte automático." },
    { nombre: "Cafetera Express", marca: "Oster", modelo: "PrimaLatte II", precio: 320.00, stock: 14, color: "Rojo", categoria: "Pequeños Electrodomésticos", origen: "China", description: "Bomba italiana de 19 bares y depósito de leche automático." },
    { nombre: "Licuadora de Vaso", marca: "Moulinex", modelo: "PerfectMix+", precio: 110.00, stock: 30, color: "Plata", categoria: "Pequeños Electrodomésticos", origen: "Francia", description: "Cuchillas de tecnología Powelix y vaso de vidrio termorresistente." },
    { nombre: "Freezer Horizontal", marca: "Gafa", modelo: "Eternity S120", precio: 540.00, stock: 6, color: "Blanco", categoria: "Refrigeración", origen: "Argentina", description: "Capacidad de 115 litros con triple función (enfria, friza, ultra)." },
    { nombre: "Secarropas por Calor", marca: "Koh-i-noor", modelo: "C-755", precio: 290.00, stock: 11, color: "Blanco", categoria: "Lavado", origen: "Argentina", description: "Secado centrífugo de alta velocidad que cuida las prendas." },
    { nombre: "Extractor de Aire Campana", marca: "Spar", modelo: "Flexa", precio: 210.00, stock: 18, color: "Inoxidable", categoria: "Cocina", origen: "Italia", description: "Campana purificadora de cocina de 60cm con tres velocidades." },
    { nombre: "Horno Eléctrico de Mesa", marca: "Atma", modelo: "HG4010E", precio: 160.00, stock: 22, color: "Negro", categoria: "Cocina", origen: "China", description: "Capacidad de 40 litros con convección y timer programable." },
    { nombre: "Lavavajillas 12 Cubiertos", marca: "Drean", modelo: "Dish 12.2X", precio: 780.00, stock: 5, color: "Inoxidable", categoria: "Lavado", origen: "Argentina", description: "Eficiencia energética clase A con programa de lavado rápido." },
    { nombre: "Tostadora Eléctrica", marca: "Black+Decker", modelo: "T2500", precio: 35.00, stock: 40, color: "Negro", categoria: "Pequeños Electrodomésticos", origen: "China", description: "Ranuras extra anchas con 7 niveles de tostado y función descongelar." },
    { nombre: "Procesadora de Alimentos", marca: "Liliana", modelo: "Amproc", precio: 85.00, stock: 25, color: "Blanco", categoria: "Pequeños Electrodomésticos", origen: "Argentina", description: "Pica, rebana, ralla, licúa y amasa con sus múltiples accesorios." },
    { nombre: "Plancha a Vapor", marca: "Braun", modelo: "TexStyle 3", precio: 65.00, stock: 35, color: "Azul", categoria: "Cuidado de la Ropa", origen: "Hungría", description: "Suela de cerámica antiadherente con golpe de vapor potente." },
    { nombre: "Termotanque Eléctrico", marca: "Rheem", modelo: "TE085", precio: 410.00, stock: 9, color: "Blanco", categoria: "Climatización", origen: "Argentina", description: "Capacidad de 85 litros con aislamiento de poliuretano de alta densidad." },
    { nombre: "Fabrica de Pan Automática", marca: "Yelmo", modelo: "FP-1500", precio: 195.00, stock: 13, color: "Plata", categoria: "Pequeños Electrodomésticos", origen: "China", description: "12 programas digitales para hacer pan, masas, budines y mermeladas." }
];

async function seedDatabase() {
    console.log("Iniciando la carga de electrodomésticos en Firestore...");
    
    for (const producto of electrodomesticos) {
        try {
            // Usamos directamente tu servicio para respetar la arquitectura
            const resultado = await productModel.create(producto);
            console.log(`Guardado con éxito: ${resultado.nombre} (ID: ${resultado.id})`);
        } catch (error) {
            console.error(`Error guardando ${producto.nombre}:`, error.message);
        }
    }
    
    console.log("\n¡Proceso finalizado! Los 20 datos ya están en tu Firebase.");
    process.exit(0);
}

seedDatabase();

