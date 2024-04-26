import {db} from "@/data/db_cmds"

let ops = []
const products = await db.get("select * from products")
products?.forEach(element => {
  ops.push({name: element.name, code: element.id})
});

export const reports = {
  table: "reports",
  title: "Relatórios",
  desc: "Gerenciamento de Relatórios",
  schema: {
    id: {
      label: "ID",
      type: "STRING",
      extra: "PRIMARY KEY",
      null: false
    },
    year: {
      label: "Ano",
      type: "STRING",
      null: false
    },
    month: {
      label: "Mês",
      type: "STRING",
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
    },
    file: {
      label: "Arquivo",
      type: "UPLOAD",
      null: true
    },
    tag: {
        label: "Etiqueta",
        type: "SELECT",
        null: false,
        placeholder: "Selecione",
        options: ops
    }
  }
}
// export reports
// export default reports