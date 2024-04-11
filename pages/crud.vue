<script setup>
import { FilterMatchMode } from 'primevue/api';
import DataItemService from '@/service/UserService';
import { useToast } from 'primevue/usetoast';
import '@/assets/styles.scss';
const toast = useToast();

const dataItems = ref(null);
const dataItemDialog = ref(false);
const deleteDataItemDialog = ref(false);
const deleteDataItemsDialog = ref(false);
const dataItem = ref({});
const selectedDataItems = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);

const dataGridColumns = ref([])


const route = useRoute()
const source = route.query.source
const dataItemService = new DataItemService();
    
onBeforeMount(() => {
    initFilters();
});

onMounted(() => {
    fetch(source)
        .then((res) => res.json())
        .then((data) => {
            dataItems.value = data.data
            dataGridColumns.value = data.schema 
            console.log('data:', dataGridColumns.value);
        });
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const openNew = () => {
    dataItem.value = {};
    submitted.value = false;
    dataItemDialog.value = true;
};

const hideDialog = () => {
    dataItemDialog.value = false;
    submitted.value = false;
};

const saveDataItem = async () => {
    submitted.value = true;
    // if (dataItem.value.name && dataItem.value.name.trim() && dataItem.value.price) {
        if (dataItem.value.id) {
            // dataItem.value.inventoryStatus = dataItem.value.inventoryStatus.value ? dataItem.value.inventoryStatus.value : dataItem.value.inventoryStatus;
            dataItems.value[findIndexById(dataItem.value.id)] = dataItem.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'DataItem Updated', life: 3000 });
        } else {
            dataItem.value.id = createId();
            dataItem.value.code = createId();
            // dataItem.value.image = 'dataItem-placeholder.svg';
            // dataItem.value.inventoryStatus = dataItem.value.inventoryStatus ? dataItem.value.inventoryStatus.value : 'INSTOCK';
            dataItems.value.push(dataItem.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'DataItem Created', life: 3000 });
        }
        dataItemDialog.value = false;
        dataItem.value = {};


        try {
            const txt = {
                schema: dataGridColumns.value,
                data: dataItems.value
            }
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({filename: source, txt: JSON.stringify(txt, null, 2)})
            }
            const response = await fetch('/api/save', config)
        } 
        catch (error) {
            console.log("save api error");
        }
    // }
};

const editDataItem = (editDataItem) => {
    dataItem.value = { ...editDataItem };
    console.log(dataItem);
    dataItemDialog.value = true;
};

const confirmDeleteDataItem = (editDataItem) => {
    dataItem.value = editDataItem;
    deleteDataItemDialog.value = true;
};

const deleteDataItem = async () => {
    dataItems.value = dataItems.value.filter((val) => val.id !== dataItem.value.id);
    deleteDataItemDialog.value = false;
    dataItem.value = {};
    

    try {
        const txt = {
            schema: dataGridColumns.value,
            data: dataItems.value
        }
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({filename: source, txt: JSON.stringify(txt, null, 2)})
        }
        const response = await fetch('/api/save', config)
    } 
    catch (error) {
        console.log("save api error");
    }

    toast.add({ severity: 'success', summary: 'Successful', detail: 'DataItem Deleted', life: 3000 });
};

const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < dataItems.value.length; i++) {
        if (dataItems.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
};

const createId = () => {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteDataItemsDialog.value = true;
};
const deleteSelectedDataItems = () => {
    dataItems.value = dataItems.value.filter((val) => !selectedDataItems.value.includes(val));
    deleteDataItemsDialog.value = false;
    selectedDataItems.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'DataItems Deleted', life: 3000 });
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

</script>

<template>
    <div class="grid" v-if="dataItems">
        <div class="col-12">
            <div class="card">
                <Toast />
                <Toolbar class="mb-4">
                    
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="Novo" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                            <Button label="Excluir" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedDataItems || !selectedDataItems.length" />
                        </div>
                    </template>

                    <!-- <template v-slot:end>
                        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Enviar arquivo" class="mr-2 inline-block" />
                        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template> -->
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="dataItems"
                    v-model:selection="selectedDataItems"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} dataItems"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Items</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                            </span>
                        </div>
                    </template>

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    
                   
                    <Column v-for="item in dataGridColumns" :field="item[0]" :header="item[1]" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">{{item[1]}}</span>
                            {{ slotProps.data[item[0]] }}
                        </template>
                    </Column>

                   
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editDataItem(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteDataItem(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="dataItemDialog" :style="{ width: '450px' }" header="DataItem Details" :modal="true" class="p-fluid">
                    <!-- <img :src="'demo/images/dataItem/' + dataItem.image" :alt="dataItem.image" v-if="dataItem.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" /> -->
                   
                   
                    <div v-for="item in dataGridColumns" class="field">
                        <label for="name">{{item[1]}}</label>
                        <InputText id="name" v-model.trim="dataItem[item[0]]" required="true" autofocus :class="{ 'p-invalid': submitted && !dataItem.name }" />
                        <small class="p-invalid" v-if="submitted && !dataItem.name">Preencha {{item[1]}}</small>
                    </div>



                    <!-- <div class="field">
                        <label for="description">Description</label>
                        <Textarea id="description" v-model="dataItem.description" required="true" rows="3" cols="20" />
                    </div>

                    <div class="field">
                        <label for="inventoryStatus" class="mb-3">Inventory Status</label>
                        <Dropdown id="inventoryStatus" v-model="dataItem.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <span :class="'dataItem-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                </div>
                                <div v-else-if="slotProps.value && !slotProps.value.value">
                                    <span :class="'dataItem-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>

                    <div class="field">
                        <label class="mb-3">Category</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category1" name="category" value="Accessories" v-model="dataItem.category" />
                                <label for="category1">Accessories</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category2" name="category" value="Clothing" v-model="dataItem.category" />
                                <label for="category2">Clothing</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category3" name="category" value="Electronics" v-model="dataItem.category" />
                                <label for="category3">Electronics</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category4" name="category" value="Fitness" v-model="dataItem.category" />
                                <label for="category4">Fitness</label>
                            </div>
                        </div>
                    </div>

                    <div class="formgrid grid">
                        <div class="field col">
                            <label for="price">Price</label>
                            <InputNumber id="price" v-model="dataItem.price" mode="currency" currency="USD" locale="en-US" :class="{ 'p-invalid': submitted && !dataItem.price }" :required="true" />
                            <small class="p-invalid" v-if="submitted && !dataItem.price">Price is required.</small>
                        </div>
                        <div class="field col">
                            <label for="quantity">Quantity</label>
                            <InputNumber id="quantity" v-model="dataItem.quantity" integeronly />
                        </div>
                    </div> -->
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveDataItem" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteDataItemDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="dataItem"
                            >Are you sure you want to delete <b>{{ dataItem.name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteDataItemDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteDataItem" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteDataItemsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="dataItem">Are you sure you want to delete the selected dataItems?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteDataItemsDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedDataItems" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
