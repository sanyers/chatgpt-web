<template>
  <div class="home-page">
    <div class="page-main">
      <div class="chat-list">
        <ul ref="listRef">
          <li
            v-for="item in chatList"
            :class="{ 'chat-me': item.role === 'user' }">
            <template v-if="isLines(item.content)">
              <v-md-preview :text="item.content"></v-md-preview>
            </template>
            <!-- v-if="item.role === 'user'" -->
            <template v-else>
              <span class="chat-message">
                <span>{{ item.content }}</span>
              </span>
            </template>
          </li>
        </ul>
      </div>
      <n-input-group class="chat-input">
        <n-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 3 }"
          v-model:value="sendMsg"
          placeholder="输入消息，Ctrl + Enter 发送"
          @keyup.ctrl.enter="onSend" />
        <n-button
          class="btn-send"
          :type="isMsg ? 'primary' : 'default'"
          :disabled="!isMsg"
          @click="onSend">
          发送
        </n-button>
      </n-input-group>
      <!-- <n-button @click="getChatModels">获取模型列表</n-button> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, nextTick, watch } from 'vue'
import { chatCompletions, chatModels } from '@/api/chat'

type ChatData = {
  role: string
  content: string
}

const chatList = ref<Array<ChatData>>([])

const listRef = ref(null)
const setListScroll = () => {
  nextTick(() => {
    const div: HTMLElement = listRef.value
    if (div) {
      if (div.scrollHeight > div.clientHeight) {
        setTimeout(() => {
          div.scrollTop = div.scrollHeight
        }, 0)
      }
    }
  })
}

watch(
  chatList.value,
  () => {
    setListScroll()
  },
  { immediate: false },
)

const sendChat = async () => {
  const { data } = await chatCompletions({ messages: chatList.value })
  if (data) {
    const d = data[data.length - 1]
    const datas: ChatData = {
      content: d.message.content,
      role: d.message.role,
    }
    chatList.value.push(datas)
  }
}

const sendMsg = ref('')
const onSend = () => {
  if (!sendMsg.value) {
    return
  }
  const data: ChatData = {
    content: sendMsg.value,
    role: 'user',
  }
  chatList.value.push(data)
  sendChat()
  sendMsg.value = ''
}

const isMsg = computed(() => {
  return Boolean(sendMsg.value)
})

const isLines = computed(() => {
  return function (content: string) {
    return content.includes('\n')
  }
})

const getChatModels = async () => {
  const { data } = await chatModels({})
  console.log(data)
}
</script>
<style lang="less" scoped>
.home-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  .page-main {
    width: 80vw;
    height: 80vh;
    background-color: #fff;
    padding: 12px;

    .chat-list {
      height: calc(100% - 94px);
      padding: 13px;
      box-sizing: border-box;
      padding-right: 0;
      ul {
        height: 100%;
        overflow: auto;
        padding-right: 13px;
        li {
          margin-top: 20px;
        }
        .chat-me {
          // text-align: right;
          .chat-message {
            border-top-right-radius: 0;
            background-color: rgba(0, 190, 189, 0.2);
          }
        }
        .chat-message {
          background-color: #f1f1f1;
          padding: 8px 12px;
          vertical-align: top;
          word-break: break-all;
          border-radius: 8px;
          border-top-left-radius: 0;
          color: #333;
          display: inline-block;
          max-width: 420px;
          text-align: left;
        }
        .v-md-editor-preview {
          background-color: #f1f1f1;
          border-radius: 8px;
          border-top-left-radius: 0;
          ::v-deep(> div) {
            padding: 8px 12px;
          }
        }
      }
    }
    .chat-input {
      margin-top: 14px;
      position: relative;
      .btn-send {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }
  }
}
</style>
