<script setup lang="ts">
import { Menu, MenuButton, MenuItems, TransitionRoot } from '@headlessui/vue'
import { defineProps, withDefaults,ref } from 'vue'
import DropdownMenuItem from './DropdownMenuItem.vue'
export interface Props {
  tags?: readonly string[]
}
const props = withDefaults(defineProps<Props>(),{
  tags: () => []
})
const isShowing = ref<boolean>(false)
</script>
<template>
  <Menu md:hidden  @click="isShowing = !isShowing" as="div" className="relative inline-block text-left">
    <div>
      <MenuButton className="inline-flex justify-center rounded-md border border-zinc-400
        dark:border-zinc-700 px-2 py-2 text-sm font-medium shadow-sm
        hover:bg-orange-200 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500
        focus:ring-offset-2 focus:ring-offset-gray-200 transition-all"
        aria-label="menu">
        <div i-carbon-menu  aria-hidden="true"></div>
      </MenuButton>
    </div>
    <TransitionRoot
      enter="transition ease-out duration-100"
      enter-from="transition opacity-0 scale-95"
      enter-to="transition opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leave-from="transition opacity-100 scale-100"
      leave-to="transition opacity-0 scale-95"
      >
      <MenuItems class="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md border
        border-zinc-400 dark:border-zinc-700 bg-orange-50 dark:bg-zinc-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-zinc-400 dark:divide-zinc-700">
        <div className="py-1">
          <div v-for="(item,index) in props.tags" :key="index">
            <DropdownMenuItem
            :href="item.toLocaleLowerCase() === 'project' ?
            '/projects/' + item.toLocaleLowerCase() :
            '/posts/'+item.toLocaleLowerCase()" >{{item[0].toLocaleUpperCase() + item.slice(1).toLocaleLowerCase()}}</DropdownMenuItem>
          </div>
        </div>
      </MenuItems>
      </TransitionRoot>
  </Menu>
  
</template>