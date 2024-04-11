// import {userroles} from "@/data/userroles.js"
import {db} from "@/data/db_cmds"

let ops = []
const userrolesData = await db.get("select * from userroles")
userrolesData.forEach(element => {
  ops.push({name:element.name, code:element.id})
});

let array_client_planos = []
// const table_exists = await db.get("SELECT name FROM sqlite_master WHERE type='table'")
// if (table_exists.find(x=>x.name=="client_planos")){
  const client_planos_data = await db.get("select * from client_planos")
  client_planos_data.forEach(element => {
    array_client_planos?.push({name:element.name, code:element.id})
  });
// }else{
  // array_client_planos = [{name:"", code: ""}]
// }


let array_client_status = []
const client_status_data = await db.get("select * from client_status")
client_status_data?.forEach(element => {
  array_client_status.push({name:element.name, code:element.id})
});

let Array_products = []
const db_products = await db.get("select * from products")
db_products.forEach(element => {
    Array_products.push({name: element.name, code: element.id})
});

const users = {
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

const clients = {
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
      empresa: {
        label: "Empresa",
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
      data_adesao: {
        label: "Data de adesão",
        type: "STRING",
        null: false
      },
      plano: {
        label: "Plano",
        type: "SELECT",
        null: true,
        placeholder: "Selecione",
        options: array_client_planos
      },
      // data_limite: {
      //   label: "Data limite",
      //   type: "STRING",
      //   null: false
      // }
      // ,
      status: {
        label: "Status",
        type: "SELECT",
        null: true,
        placeholder: "Selecione",
        options: array_client_status
      },
      tags: {
          label: "Etiqueta",
          type: "MULTISELECT",
          null: true,
          placeholder: "Selecione",
          options: Array_products
      }
    }
}


const client_planos = {
  table: "client_planos",
  title: "Planos do cliente",
  desc: "Gerenciamento de planos de clientes",
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
    },
    desc: {
      label: "Descrição",
      type: "STRING",
      null: null
    }
  }
}


const client_status = {
  table: "client_status",
  title: "Status do cliente",
  desc: "Gerenciamento de status de cliente",
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
  
const userroles = {
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

const products = {
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

const reports = {
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
          options: Array_products
      }
    }
}

const config = {
    table: "config",
    title: "Configurações",
    desc: "Gerenciamento de configurações",
    schema: {
      id: {
        label: "ID",
        type: "STRING",
        extra: "PRIMARY KEY",
        null: false
      },
      data: {
        label: "Conteúdo",
        type: "STRING",
        null: false
      }
    }
}

export {users, userroles, clients, products, reports, config, client_status, client_planos}