<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import "codemirror/theme/idea.css";
import "codemirror/mode/shell/shell";
// 代码提示功能 具体语言可以从 codemirror/addon/hint/ 下引入多个
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";
// 高亮行功能
import "codemirror/addon/selection/active-line";
import "codemirror/addon/selection/selection-pointer";
// 全屏功能 由于项目复杂，自带的全屏功能一般不好使
import "codemirror/addon/display/fullscreen.css";
import "codemirror/addon/display/fullscreen";
import { reactive, ref } from "vue";

const state = reactive({
      code: "",
      cmOptions: {
        mode: "shell",
        theme: "idea",
        line: true,
        lineNumbers: true,
        lineWrapping: true,
        // 高亮行功能
        styleActiveLine: true,
        hintOptions: {
          completeSingle: false,
          hint: handleShowHint,
        },
      },
    })

  function handleShowHint () {
    const hintList = [
        {
          name: "xiaohong",
          value: "xiaohong"
        },
        {
          name: "xiaozhang",
          value: [
            {
              name: "xiaoli",
            },
            {
              name: "xiaosun",
            },
          ],
        },
      ]
      const cm = ref(null)

      const cmInstance = cm.value.codemirror;
      console.log(cmInstance, 54);
      // 得到光标
      let cursor = cmInstance.getCursor();
      // 得到行内容
      let cursorLine = cmInstance.getLine(cursor.line);
      // 得到光标位置
      let end = cursor.ch;
      let start = end;
      const Two = `${cursorLine.charAt(start - 2)}${cursorLine.charAt(start - 1)}`;
      const One = `${cursorLine.charAt(start - 1)}`;
      let list = [];
      if (Two === "${") {
        hintList.forEach(e => {
          list.push(e.name)
        })
      } else if (One === ".") {
        let lastIndex = cursorLine.lastIndexOf('${', start)
        let key = cursorLine.substring(lastIndex + 2, start - 1)
        list = []
        hintList.forEach((e) => {
          if (e.name === key && lastIndex !== -1 && Object.prototype.toString.call(e.value) === '[object Array]') {
            e.value.forEach(el => {
              list.push(el.name)
            })
          }
        })
      }
      // 得到光标标识
      let token = cmInstance.getTokenAt(cursor);
      // console.log(cmInstance, cursor, cursorLine, end, token);
      return {
        list: list,
        from: { ch: end, line: cursor.line },
        to: { ch: token.end, line: cursor.line },
      };
  }
</script>

<template>
  <div class="app">
    <codemirror
      ref="cm"
      v-model="code"
      :options="cmOptions"
      @input="inputChange"
    ></codemirror>
  </div>
</template>

<style scoped>
</style>
