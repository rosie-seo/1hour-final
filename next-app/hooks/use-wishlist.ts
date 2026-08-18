"use client"

import { useCallback, useSyncExternalStore } from "react"

const STORAGE_KEY = "cally:wishlist"
/** 같은 탭 안의 다른 컴포넌트끼리 동기화하기 위한 이벤트 (storage 이벤트는 타 탭에만 발생) */
const SYNC_EVENT = "cally:wishlist-change"

const EMPTY: string[] = []

/**
 * getSnapshot은 값이 바뀌지 않았다면 같은 참조를 돌려줘야 무한 렌더를 피할 수 있다.
 * 원본 문자열을 기억해 두고 달라졌을 때만 새로 파싱한다.
 */
let cachedRaw: string | null = null
let cachedIds: string[] = EMPTY

function parse(raw: string | null): string[] {
  if (!raw) return EMPTY
  try {
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as string[]) : EMPTY
  } catch {
    return EMPTY
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(SYNC_EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(SYNC_EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

function getSnapshot(): string[] {
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return EMPTY
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw
    cachedIds = parse(raw)
  }
  return cachedIds
}

function getServerSnapshot(): string[] {
  return EMPTY
}

/**
 * 찜한 강의 목록.
 *
 * 서버가 없으므로 localStorage에 담는다. 서버 렌더 결과와 어긋나지 않도록
 * useSyncExternalStore의 서버 스냅샷은 항상 빈 목록이고, 하이드레이션이 끝나야
 * `ready`가 true가 된다. 하트 버튼과 마이페이지 목록이 같은 화면에 있을 수 있어
 * 커스텀 이벤트로 탭 안에서도 동기화한다.
 */
export function useWishlist() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

  const toggle = useCallback((id: string) => {
    const current = getSnapshot()
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // 저장에 실패하면 상태를 바꾸지 않는다 (화면과 저장소가 어긋나는 편이 더 나쁘다)
      return
    }
    window.dispatchEvent(new Event(SYNC_EVENT))
  }, [])

  const has = useCallback((id: string) => ids.includes(id), [ids])

  return { ids, ready, has, toggle }
}
