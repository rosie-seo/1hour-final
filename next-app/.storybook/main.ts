import path from "node:path"
import { fileURLToPath } from "node:url"

import type { StorybookConfig } from "@storybook/react-vite"

const dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  // UI 프리미티브뿐 아니라 화면 단위 컴포넌트(마이페이지·수강·랜딩)까지 문서화한다
  stories: ["../components/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: "@storybook/react-vite",
  viteFinal: async (viteConfig) => {
    viteConfig.base = "/storybook/"
    viteConfig.resolve = {
      ...viteConfig.resolve,
      alias: {
        ...(viteConfig.resolve?.alias ?? {}),
        // 앱과 같은 경로 별칭
        "@": path.resolve(dirname, ".."),
        // Next.js 런타임이 없는 환경이라 전용 모듈은 스텁으로 대체한다
        "next/link": path.resolve(dirname, "next-stubs/link.tsx"),
        "next/image": path.resolve(dirname, "next-stubs/image.tsx"),
        "next/navigation": path.resolve(dirname, "next-stubs/navigation.ts"),
      },
    }
    return viteConfig
  },
}
export default config
