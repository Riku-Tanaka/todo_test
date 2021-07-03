<template>
  <div id="app">
    <h1>簡単なTodoリスト</h1>
    <!-- Todoリスト -->
    <ul>
      <li v-for="(todo, i) in todos" :key="i">
        <input type="checkbox" :checked="todo.done" @change="toggle(todo)" />
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="remove(todo)">削除</button>
      </li>
      <!-- 新規Todo入力エリア -->
      <li>
        <input placeholder="Todoを入力" @keyup.enter="addTodo" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

// Todoの型定義をインポート
import { Todo } from '~/models/Todo'
// Todoリストのストアモジュールをインポート
import { todosStore } from '~/store'

export default Vue.extend({
  computed: {
    todos(): Array<Todo> {
      // リスト（todos）を取得
      // ※todosStore.と打つと、インテリセンス（入力補完機能）が働く
      return todosStore.todos
    },
  },
  methods: {
    // todoの追加
    addTodo(e: MouseEvent): void {
      const target = e.target as HTMLInputElement
      todosStore.add(target.value)
      target.value = ''
    },
    // todoの削除
    remove(todo: Todo) {
      todosStore.remove(todo)
    },
    // Todoのdone（完了状態）に切り替え
    toggle(todo: Todo) {
      todosStore.toggle(todo)
    },
  },
})
</script>

<style>
/* 完了状態の Todo には打消し線をつける */
.done {
  text-decoration: line-through;
}
</style>
