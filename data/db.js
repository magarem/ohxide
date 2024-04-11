export const sqlExec = async (str) => {
    const  data  = await $fetch('/api/dbservices', {
        method: 'PUT',
        body: JSON.stringify({ str })
    });
    console.log('return data: ', data);
}