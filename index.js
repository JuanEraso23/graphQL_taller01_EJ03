const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// 1. ESQUEMA (Qué se puede pedir)
const schema = buildSchema(`
  type Query {
    # Listas básicas
    colores: [String!]!
    numeros: [Int!]!
    frutas: [String!]!
    diasSemana: [String!]!
    
    # Listas con elementos opcionales
    numerosPares: [Int]!
    nombres: [String]!
    
    # Listas de objetos (avanzado)
    numerosConDescripcion: [NumeroInfo!]!
  }
  
  # Tipo para lista de objetos
  type NumeroInfo {
    valor: Int!
    descripcion: String!
    esPar: Boolean!
  }
`);

// 2. RESOLVERS (La lógica que responde)
const root = {
  // Listas básicas
  colores: () => ["rojo", "verde", "azul", "amarillo", "naranja"],
  
  numeros: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  
  frutas: () => ["manzana", "banana", "naranja", "fresa", "uva"],
  
  diasSemana: () => ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"],
  
  // Listas con elementos opcionales (algunos null)
  numerosPares: () => [2, 4, null, 8, null, 12],
  
  nombres: () => ["Ana", null, "Carlos", "María", null, "Juan"],
  
  // Lista de objetos
  numerosConDescripcion: () => {
    const numeros = [1, 2, 3, 4, 5];
    return numeros.map(num => ({
      valor: num,
      descripcion: num === 1 ? "Uno" : 
                   num === 2 ? "Dos" :
                   num === 3 ? "Tres" :
                   num === 4 ? "Cuatro" : "Cinco",
      esPar: num % 2 === 0
    }));
  }
};

// 3. CONFIGURACIÓN DEL SERVIDOR
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log('✅ Servidor GraphQL - Ejercicio 3 (Listas)');
  console.log(`📝 Abre http://localhost:${PORT}/graphql en tu navegador`);
  console.log('📋 Prueba las consultas con listas');
});