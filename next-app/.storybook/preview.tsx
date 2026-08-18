import type { Preview } from "@storybook/react-vite"
import pretendardVariableUrl from "pretendard/dist/web/variable/woff2/PretendardVariable.woff2?url"

import "./preview.css"

const fontFaceStyle = document.createElement("style")
fontFaceStyle.textContent = `
  @font-face {
    font-family: "Pretendard Variable";
    font-weight: 45 920;
    font-style: normal;
    font-display: swap;
    src: url(${pretendardVariableUrl}) format("woff2-variations");
  }
`
document.head.appendChild(fontFaceStyle)

const preview: Preview = {
  parameters: {
    options: {
      // 프리미티브(UI)를 맨 위에 두고, 그 아래 화면 단위 컴포넌트를 흐름 순서대로
      storySort: {
        order: ["UI", "Landing", "MyPage", "Classroom", "*"],
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
}

export default preview
