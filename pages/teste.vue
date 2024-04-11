<template>
     <div class="m-0" v-if="dataUser">
        <Card class="m-5" style="width: 80%;">
            <template #title>Relatórios</template>
            <template #content>
              
                <DataTable :value="aaa" stripedRows tableStyle="width: 100%">
                  
                  <template #header>
                    <div class="mb-3">
                      Buscar:
                        <!-- <label for="n'ame">Ano</label> -->
                        <InputText id="tableFilter" v-model="tableFilter.year" autofocus  placeholder="Ano" style="width: 100px;" class="mx-1"/>
                        <!-- <label for="name">Mês</label> -->
                        <InputText id="tableFilter" v-model="tableFilter.month" autofocus  placeholder="Mês" style="width: 100px;" class="mx-1"/>
                        <!-- <Button label="Ok" @click="tableFilter.do" style="width: 100px;" class="mx-1"/> -->
                        <!-- <Button label="X"  _style="width: 100px;" class="mx-1"/> -->
                        <Button icon="pi pi-times" @click="tableFilter={}" severity="danger" text rounded aria-label="Cancel" />

                    </div>
                  </template>
                  
                    <Column field="year" header="Ano"></Column>
                    <Column field="month" header="Mês"></Column>
                    <Column field="title" header="Título"></Column>
                    <Column field="desc" header="Descrição"></Column>
                   
                   
                    <!-- <Column field="file" header="Arquivo">
                        <template #body="slotProps">
                            <a :href="'upload/reports/'+slotProps.data.file" target="_blank">{{ slotProps.data.file }}</a>
                        </template>
                    </Column> -->
                    <Column field="file" header="Relatório">
                        <template #body="slotProps">
                            <a :href="'file/'+slotProps.data.file" target="_blank">Baixar</a>
                        </template>
                    </Column>
                    <Column field="tag" header="Rótulos"></Column>
                </DataTable>
            </template>
        </Card>
    </div>
</template>
<script setup>
import { useAuthStore } from '~/store/auth';
import {db} from "@/data/db_cmds"
const router = useRouter();
const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
const dataUser = useCookie('dataUser')
console.log('dataUser---->:', dataUser.value);

// let data = ref([])
let data2 = []
const tableFilter = ref({
  year: null,
  month: null
})

if (dataUser.type !== 'clients'){
    logUserOut()
}

if (!authenticated.value) {
  router.push('/login');
}

const table = reactive({
      isLoading: false,
      columns: [
        {
          label: "ID",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Ano",
          field: "year",
          width: "10%",
          sortable: true,
        },
        {
          label: "Mês",
          field: "month",
          width: "10%",
          sortable: true,
        },
        {
          label: "Título",
          field: "title",
          width: "10%",
          sortable: true,
        },
        {
          label: "Arquivo",
          field: "file",
          width: "10%",
          sortable: true,
        },
        {
          label: "Etiquetas",
          field: "tags",
          width: "15%",
          sortable: true,
        },
      ],
      rows: [],
      totalRecordCount: 0,
      sortable: {
        order: "id",
        sort: "asc",
      },
    });
const data = await db.get(`select reports.year, reports.month, reports.name, reports.desc, reports.file, products.name as tag from reports, products where reports.tag = products.id`)
console.log('data:', data);


// const user_reports = await db.get(`select * from reports where tag in (${dataUser.value.tags.split(',').map(x=>"'"+x+"'")})`)


const aaa = computed(() => {
  return data.filter(x=>x.year==(tableFilter.value.year||x.year)&x.month==(tableFilter.value.month||x.month))
})
</script>