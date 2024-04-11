<template>
    <h1>Tempo</h1>
    {{ ret }}
</template>
<script setup>
    let ret = ref("início")
    var myDate = "26-01-2012";
    myDate = myDate.split("-");

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }


    var newDate = new Date( myDate[2], myDate[1]-1, myDate[0]);
    console.log(newDate.getTime());
    
    ret.value = addDays(newDate.getTime(), 12*30)
</script>