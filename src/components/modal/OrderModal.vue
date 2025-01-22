<template>
    <div>
        Order
    </div>
</template>

<script setup>
const props = defineProps({
    product : {
        type : Object,
        default : ()=>{},
    },
    isOpen : {
        type : Boolean,
        default : false
    }
})

</script>