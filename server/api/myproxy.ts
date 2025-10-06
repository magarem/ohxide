export default defineEventHandler(async (event) => {
    const req = await readBody(event)
    console.log('req:', req);

    let data22 = await $fetch(`http://77.37.69.142:3005/test?year=${req.year}&month=${req.month}&client=${JSON.stringify(req.client).replace(/\s+/g,' ').trim()}&files=${req.files}`);
    console.log("data22:", data22);

    return data22

})