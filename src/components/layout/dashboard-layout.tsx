"use client"

import { Outlet } from "react-router-dom"
import Sidebar from "./sidebar"


export default function ControlPanelLayout() {

  return (
    <>
      <div className="min-h-screen bg-background flex" dir="rtl">

        <Sidebar />

        {/* Main Content Container */}
        <div className="flex-1 h-screen overflow-auto">

          <main className="p-4">
            <div className="max-w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}