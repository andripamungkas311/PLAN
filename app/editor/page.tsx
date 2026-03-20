'use client'

import { useState } from 'react'
import { TopBar, LeftSidebar, Canvas, RightPanel } from '@/components/editor'

export default function EditorPage() {
  const [activeTool, setActiveTool] = useState('select')

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] overflow-hidden">
      <TopBar
        onUndo={() => {}}
        onRedo={() => {}}
        onSave={() => alert('Saved!')}
        onExport={() => alert('Exporting...')}
      />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar activeTool={activeTool} onToolChange={setActiveTool} />
        <Canvas activeTool={activeTool} />
        <RightPanel />
      </div>
    </div>
  )
}
