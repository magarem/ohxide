export const products = {
    table: "products",
    title: "Produtos",
    desc: "Gerenciamento de produtos",
    schema: {
      id: {
        label: "ID",
        type: "STRING",
        extra: "PRIMARY KEY",
        null: false
      },
      name: {
        label: "Nome",
        type: "STRING",
        null: false
      },
      desc: {
        label: "Descrição",
        type: "STRING",
        null: true
      }
    }
  }
  