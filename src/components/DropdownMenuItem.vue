<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import { MenuItem } from '@headlessui/vue'
export interface Props {
  href: string
}
const props = withDefaults(defineProps<Props>(),{
  href: ''
})
</script>
<template>
  <MenuItem v-slot="{ active }">
    <a :class='[{ "bg-orange-200 dark:bg-zinc-700": active },
      "block","px-4","py-2","text-sm"]' :href="props.href">
      <slot />
    </a>
  </MenuItem>
</template>