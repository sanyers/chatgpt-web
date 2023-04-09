import {
  create,
  NButton,
  NIcon,
  NTooltip,
  NLayout,
  NLayoutSider,
  NMenu,
  NInput,
  NInputGroup,
  NGrid,
  NGi,
  NSelect,
  NDataTable,
  NDrawer,
  NDrawerContent,
  NPopover,
  NForm,
  NFormItem,
  NProgress,
  NLoadingBarProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
  NDropdown,
  MessageApi,
  NModal,
  NScrollbar,
  NTabs,
  NTabPane,
} from 'naive-ui'

declare global {
  interface Window {
    $message: MessageApi
  }
}

const naive = create({
  components: [
    NButton,
    NIcon,
    NTooltip,
    NLayout,
    NLayoutSider,
    NMenu,
    NInput,
    NInputGroup,
    NGrid,
    NGi,
    NSelect,
    NDataTable,
    NDrawer,
    NDrawerContent,
    NPopover,
    NForm,
    NFormItem,
    NProgress,
    NLoadingBarProvider,
    NMessageProvider,
    NDialogProvider,
    NNotificationProvider,
    NDropdown,
    NModal,
    NScrollbar,
    NTabs,
    NTabPane
  ],
})

export default naive
