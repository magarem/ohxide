export const userroles = {
    table: "userroles",
    title: "Tipos de Usuários",
    desc: "Gerenciamento de tipos de usuários",
    schema: {
      id: {
        label: "ID",
        type: "STRING",
        extra: "PRIMARY KEY"
      },
      name: {
        label: "Nome",
        type: "STRING",
        null: false
      }
    }
  }
  