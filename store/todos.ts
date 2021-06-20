import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { Todo } from '~/models/Todo'

// stateFactory: true →Vuexをモジュールモードで扱うために指定
@Module({
  stateFactory: true,
  namespaced: true,
  name: 'todos',
})
export default class Todos extends VuexModule {
  todos: Todo[] = []

  /**
   * Todoを追加する
   * @param text Todo テキスト
   */
  @Mutation
  add(text: string) {
    const todos: Todo[] = this.todos
    // Todoを作成
    const todo: Todo = {
      // リストが無い場合、id=0
      // リストがある場合、id=リストの最終要素のid+1
      id: todos.length === 0 ? 0 : todos[todos.length - 1].id + 1,
      text,
      done: false,
    }
    // リストにTodoを追加
    this.todos.push(todo)
  }

  /**
   * Todoを削除する
   * @param todo 削除する todo インスタンス
   */
  @Mutation
  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1)
  }

  /**
   * Todoのdone(完了状態)を切り替える
   * @param todo 完了状態を切り替える対象のtodoインスタンス
   */
  @Mutation
  toggle(todo: Todo) {
    todo.done = !todo.done
  }
}
