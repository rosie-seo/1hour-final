/**
 * next/navigation 대체. 사이드바처럼 현재 경로로 활성 상태를 정하는 컴포넌트가
 * 스토리에서도 렌더되도록 고정 경로를 돌려준다.
 */
export function usePathname() {
  return "/mypage"
}

export function useRouter() {
  return {
    push: () => {},
    replace: () => {},
    back: () => {},
    forward: () => {},
    refresh: () => {},
    prefetch: () => {},
  }
}

export function useSearchParams() {
  return new URLSearchParams()
}

export function notFound(): never {
  throw new Error("notFound() called in Storybook")
}
