// import {userroles} from "@/data/userroles.js"
import {db} from "@/data/db_cmds"

let ops = []
const userrolesData = await db.get("select * from userroles")
userrolesData?.forEach(element => {
  ops.push({name:element.name, code:element.id})
});

export const users = {
    table: "users",
    title: "Usuários",
    desc: "Gerenciamento de usuários",
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
        null: false
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
        type: "SELECT",
        null: false,
        placeholder: "Selecione",
        options: ops
      }
    }
  }
  