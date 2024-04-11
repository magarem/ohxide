import {db} from "@/data/db_cmds"

let ops = []
const products = await db.get("select * from products")
products.forEach(element => {
  ops.push({name: element.name, code: element.id})
});
export const clients = {
    table: "clients",
    title: "Clientes",
    desc: "Gerenciamento de clientes",
    schema: {
      id: {
        label: "ID",
        type: "STRING",
        extra: "PRIMARY KEY"
      },
      name: {
        label: "Nome completo",
        type: "STRING",
        null: false
      },
      email: {
        label: "E-mail",
        type: "STRING",
        null: true
      },
      username: {
        label: "Nome de usuário",
        type: "STRING",
        null: false
      },
      password: {
        label: "Senha",
        type: "STRING",
        null: false
      },
      status: {
        label: "Status",
        type: "STRING",
        null: true
      },
      tags: {
          label: "Etiqueta",
          type: "MULTISELECT",
          null: true,
          placeholder: "Selecione",
          options: ops
      }
    }
  }
  