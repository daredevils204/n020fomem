"use client"

import { useEffect } from "react"

export function PWARegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("Đăng ký ServiceWorker thành công với phạm vi: ", registration.scope)
          },
          (err) => {
            console.log("Đăng ký ServiceWorker không thành công: ", err)
          },
        )
      })
    }
  }, [])

  return null
}

