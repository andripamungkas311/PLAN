'use client'

import { useState } from 'react'
import TopBar from '@/components/editor/TopBar'
import LeftSidebar from '@/components/editor/LeftSidebar'
import Canvas from '@/components/editor/Canvas'
import RightPanel from '@/components/editor/RightPanel'

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
