export const db = {
    init: async (table, obj) => {
        let auxSchema = []
        
        for (const [key, value] of Object.entries(obj.schema)) {
            let aux_type = value.type
            if (value.type=='SELECT') {
                aux_type = "STRING"
            }
            auxSchema.push(`${key} ${aux_type} ${value.extra||''} ${value.null?'':'NOT NULL'}`)
        }
        const str = `
          CREATE TABLE IF NOT EXISTS ${table}
          (${auxSchema.join(',')})
        `
        const  data  = await $fetch('/api/dbservices', {
            method: 'PUT',
            body: JSON.stringify({ str })
        });
        // console.log('return data: ', data);

        return data
    },
    exec: async (txt) => {
        const  data  = await $fetch('/api/dbservices', {
            method: 'PUT',
            body: JSON.stringify({ txt })
        });
    },
    get: async (sql) => {
        const data = await $fetch('/api/dbservices?sql=' + sql);
        // console.log('getTodos data: ', data);
        return data
    },
    insert: async (obj) => {
        // delete obj.data.id
        const data = await $fetch('/api/dbservices', {
            method: 'POST',
            body: JSON.stringify({table: obj.table, data: obj.data})
        })
        console.log('data:', data);
        return data
    },
    update: async (obj) => {
        const data = await $fetch('/api/dbservices', {
            method: 'PATCH',
            body: JSON.stringify({table: obj.table, data: obj.data, where: obj.where})
        })
        return data
    },
    delete: async (obj) => {
        const data = await $fetch('/api/dbservices', {
            method: 'DELETE',
            body: JSON.stringify({table: obj.table, where: obj.where})
        })
        return data
    }
}