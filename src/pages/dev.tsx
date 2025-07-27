"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Download,
  Upload,
  Undo,
  Redo,
  Trash2,
  LinkIcon,
  FileText,
  Lightbulb,
  CheckSquare,
  Paperclip,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react"

// Types
interface Node {
  id: string
  type: "idea" | "task" | "note" | "link" | "file"
  title: string
  content: string
  x: number
  y: number
  color: string
  width: number
  height: number
}

interface Connection {
  id: string
  fromNodeId: string
  toNodeId: string
  fromX: number
  fromY: number
  toX: number
  toY: number
}

interface Session {
  id: string
  name: string
  nodes: Node[]
  connections: Connection[]
  lastModified: Date
}

interface HistoryState {
  nodes: Node[]
  connections: Connection[]
}

// Node type configurations
const nodeTypeConfig = {
  idea: { icon: Lightbulb, color: "#fbbf24", label: "Idea" },
  task: { icon: CheckSquare, color: "#3b82f6", label: "Task" },
  note: { icon: FileText, color: "#10b981", label: "Note" },
  link: { icon: LinkIcon, color: "#8b5cf6", label: "Link" },
  file: { icon: Paperclip, color: "#f59e0b", label: "File" },
}

// Dummy data
const initialSessions: Session[] = [
  {
    id: "1",
    name: "Project Planning",
    lastModified: new Date(),
    nodes: [
      {
        id: "node1",
        type: "idea",
        title: "Main Concept",
        content: "Core project idea and vision",
        x: 400,
        y: 200,
        color: "#fbbf24",
        width: 200,
        height: 100,
      },
      {
        id: "node2",
        type: "task",
        title: "Research Phase",
        content: "Market research and analysis",
        x: 200,
        y: 350,
        color: "#3b82f6",
        width: 180,
        height: 80,
      },
      {
        id: "node3",
        type: "task",
        title: "Development",
        content: "Build MVP and iterate",
        x: 600,
        y: 350,
        color: "#3b82f6",
        width: 180,
        height: 80,
      },
    ],
    connections: [
      {
        id: "conn1",
        fromNodeId: "node1",
        toNodeId: "node2",
        fromX: 400,
        fromY: 250,
        toX: 290,
        toY: 350,
      },
      {
        id: "conn2",
        fromNodeId: "node1",
        toNodeId: "node3",
        fromX: 500,
        fromY: 250,
        toX: 600,
        toY: 350,
      },
    ],
  },
  {
    id: "2",
    name: "Marketing Strategy",
    lastModified: new Date(Date.now() - 86400000),
    nodes: [
      {
        id: "node4",
        type: "note",
        title: "Target Audience",
        content: "Define primary customer segments",
        x: 300,
        y: 150,
        color: "#10b981",
        width: 200,
        height: 100,
      },
    ],
    connections: [],
  },
]

// Reusable Components
const NodeComponent: React.FC<{
  node: Node
  isSelected: boolean
  onSelect: (id: string) => void
  onDrag: (id: string, x: number, y: number) => void
  onEdit: (id: string, title: string, content: string) => void
  onDelete: (id: string) => void
  scale: number
}> = ({ node, isSelected, onSelect, onDrag, onEdit, onDelete, scale }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(node.title)
  const [editContent, setEditContent] = useState(node.content)
  const dragRef = useRef<{ startX: number; startY: number; nodeX: number; nodeY: number }>(null)

  const IconComponent = nodeTypeConfig[node.type].icon

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect(node.id)
    setIsDragging(true)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      nodeX: node.x,
      nodeY: node.y,
    }
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && dragRef.current) {
        const deltaX = (e.clientX - dragRef.current.startX) / scale
        const deltaY = (e.clientY - dragRef.current.startY) / scale
        onDrag(node.id, dragRef.current.nodeX + deltaX, dragRef.current.nodeY + deltaY)
      }
    },
    [isDragging, node.id, onDrag, scale],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    onEdit(node.id, editTitle, editContent)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSaveEdit()
    } else if (e.key === "Escape") {
      setEditTitle(node.title)
      setEditContent(node.content)
      setIsEditing(false)
    }
  }

  return (
    <motion.div
      className={`absolute cursor-move select-none ${isSelected ? "ring-4 ring-[#2d6a4f]" : ""}`}
      style={{
        left: node.x,
        top: node.y,
        width: node.width,
        height: node.height,
        transform: `scale(${scale})`,
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      whileHover={{ scale: scale * 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="w-full h-full rounded-xl p-4 flex flex-col" style={{ backgroundColor: node.color }}>
        <div className="flex items-center justify-between mb-2">
          <IconComponent className="w-5 h-5 text-white" />
          {isSelected && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(node.id)
              }}
              className="text-white hover:text-red-200 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="flex-1 flex flex-col gap-2">
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="bg-white/20 text-white placeholder-white/70 rounded-lg px-2 py-1 text-sm font-semibold"
              placeholder="Title"
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="bg-white/20 text-white placeholder-white/70 rounded-lg px-2 py-1 text-xs flex-1 resize-none"
              placeholder="Content"
              onKeyDown={handleKeyDown}
            />
            <div className="flex gap-1">
              <button
                onClick={handleSaveEdit}
                className="bg-white/20 text-white rounded px-2 py-1 text-xs hover:bg-white/30"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-white/20 text-white rounded px-2 py-1 text-xs hover:bg-white/30"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <h3 className="text-white font-semibold text-sm mb-1 truncate">{node.title}</h3>
            <p className="text-white/80 text-xs flex-1 overflow-hidden">{node.content}</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const ConnectionComponent: React.FC<{
  connection: Connection
  scale: number
}> = ({ connection, scale }) => {
  const dx = connection.toX - connection.fromX
  const dy = connection.toY - connection.fromY
  const length = Math.sqrt(dx * dx + dy * dy)
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: connection.fromX,
        top: connection.fromY,
        width: length,
        height: 2,
        backgroundColor: "#2d6a4f",
        transformOrigin: "0 50%",
        transform: `rotate(${angle}deg) scale(${scale}, 1)`,
      }}
    >
      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: "8px solid #2d6a4f",
          borderTop: "4px solid transparent",
          borderBottom: "4px solid transparent",
        }}
      />
    </div>
  )
}

const SidebarSessionItem: React.FC<{
  session: Session
  isActive: boolean
  onClick: () => void
  onDelete: () => void
}> = ({ session, isActive, onClick, onDelete }) => {
  return (
    <motion.div
      className={`p-4 rounded-xl cursor-pointer transition-colors ${
        isActive ? "bg-[#2d6a4f] text-white" : "bg-white hover:bg-gray-50"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">{session.name}</h3>
          <p className={`text-xs ${isActive ? "text-white/70" : "text-gray-500"}`}>{session.nodes.length} nodes</p>
          <p className={`text-xs ${isActive ? "text-white/70" : "text-gray-400"}`}>
            {session.lastModified.toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className={`p-1 rounded hover:bg-red-100 ${isActive ? "text-white hover:text-red-600" : "text-gray-400 hover:text-red-600"}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

// Main Component
export default function MindMapApp() {
  const [sessions, setSessions] = useState<Session[]>(initialSessions)
  const [activeSessionId, setActiveSessionId] = useState<string>(sessions[0]?.id || "")
  const [selectedNodeId, setSelectedNodeId] = useState<string>("")
  const [scale, setScale] = useState(1)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  // const [isPanning, setIsPanning] = useState(false)
  const [history, setHistory] = useState<HistoryState[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectingFromId, setConnectingFromId] = useState<string>("")

  const canvasRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const activeSession = sessions.find((s) => s.id === activeSessionId)

  // Save to history for undo/redo
  const saveToHistory = useCallback(() => {
    if (!activeSession) return

    const newState: HistoryState = {
      nodes: [...activeSession.nodes],
      connections: [...activeSession.connections],
    }

    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newState)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [activeSession, history, historyIndex])

  // Update session
  const updateSession = useCallback(
    (updates: Partial<Session>) => {
      setSessions((prev) =>
        prev.map((session) =>
          session.id === activeSessionId ? { ...session, ...updates, lastModified: new Date() } : session,
        ),
      )
    },
    [activeSessionId],
  )

  // Node operations
  const addNode = useCallback(
    (type: Node["type"], x = 300, y = 200) => {
      if (!activeSession) return

      saveToHistory()
      const newNode: Node = {
        id: `node_${Date.now()}`,
        type,
        title: `New ${nodeTypeConfig[type].label}`,
        content: "Click to edit content",
        x,
        y,
        color: nodeTypeConfig[type].color,
        width: 200,
        height: 100,
      }

      updateSession({ nodes: [...activeSession.nodes, newNode] })
    },
    [activeSession, saveToHistory, updateSession],
  )

  const updateNode = useCallback(
    (id: string, updates: Partial<Node>) => {
      if (!activeSession) return

      updateSession({
        nodes: activeSession.nodes.map((node) => (node.id === id ? { ...node, ...updates } : node)),
      })
    },
    [activeSession, updateSession],
  )

  const deleteNode = useCallback(
    (id: string) => {
      if (!activeSession) return

      saveToHistory()
      updateSession({
        nodes: activeSession.nodes.filter((node) => node.id !== id),
        connections: activeSession.connections.filter((conn) => conn.fromNodeId !== id && conn.toNodeId !== id),
      })
      setSelectedNodeId("")
    },
    [activeSession, saveToHistory, updateSession],
  )

  // Connection operations
  const addConnection = useCallback(
    (fromId: string, toId: string) => {
      if (!activeSession || fromId === toId) return

      const fromNode = activeSession.nodes.find((n) => n.id === fromId)
      const toNode = activeSession.nodes.find((n) => n.id === toId)

      if (!fromNode || !toNode) return

      saveToHistory()
      const newConnection: Connection = {
        id: `conn_${Date.now()}`,
        fromNodeId: fromId,
        toNodeId: toId,
        fromX: fromNode.x + fromNode.width / 2,
        fromY: fromNode.y + fromNode.height / 2,
        toX: toNode.x + toNode.width / 2,
        toY: toNode.y + toNode.height / 2,
      }

      updateSession({ connections: [...activeSession.connections, newConnection] })
    },
    [activeSession, saveToHistory, updateSession],
  )

  // Session operations
  const createNewSession = useCallback(() => {
    const newSession: Session = {
      id: `session_${Date.now()}`,
      name: `New Session ${sessions.length + 1}`,
      nodes: [],
      connections: [],
      lastModified: new Date(),
    }
    setSessions((prev) => [...prev, newSession])
    setActiveSessionId(newSession.id)
  }, [sessions.length])

  const deleteSession = useCallback(
    (id: string) => {
      setSessions((prev) => prev.filter((s) => s.id !== id))
      if (activeSessionId === id) {
        const remaining = sessions.filter((s) => s.id !== id)
        setActiveSessionId(remaining[0]?.id || "")
      }
    },
    [activeSessionId, sessions],
  )

  // Export/Import
  const exportSession = useCallback(() => {
    if (!activeSession) return

    const dataStr = JSON.stringify(activeSession, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${activeSession.name}.json`
    link.click()
    URL.revokeObjectURL(url)
  }, [activeSession])

  const importSession = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string) as Session
        imported.id = `session_${Date.now()}`
        imported.lastModified = new Date()
        setSessions((prev) => [...prev, imported])
        setActiveSessionId(imported.id)
      } catch (error) {
        alert("Invalid file format")
      }
    }
    reader.readAsText(file)
  }, [])

  // Undo/Redo
  const undo = useCallback(() => {
    if (historyIndex > 0 && activeSession) {
      const prevState = history[historyIndex - 1]
      updateSession(prevState)
      setHistoryIndex(historyIndex - 1)
    }
  }, [historyIndex, history, activeSession, updateSession])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1 && activeSession) {
      const nextState = history[historyIndex + 1]
      updateSession(nextState)
      setHistoryIndex(historyIndex + 1)
    }
  }, [historyIndex, history, activeSession, updateSession])

  // Canvas operations
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        setSelectedNodeId("")
        if (isConnecting) {
          setIsConnecting(false)
          setConnectingFromId("")
        }
      }
    },
    [isConnecting],
  )

  const handleNodeSelect = useCallback(
    (id: string) => {
      if (isConnecting && connectingFromId && connectingFromId !== id) {
        addConnection(connectingFromId, id)
        setIsConnecting(false)
        setConnectingFromId("")
      } else {
        setSelectedNodeId(id)
      }
    },
    [isConnecting, connectingFromId, addConnection],
  )

  const handleNodeDrag = useCallback(
    (id: string, x: number, y: number) => {
      updateNode(id, { x, y })

      // Update connections
      if (!activeSession) return

      const updatedConnections = activeSession.connections.map((conn) => {
        if (conn.fromNodeId === id) {
          return { ...conn, fromX: x + 100, fromY: y + 50 }
        }
        if (conn.toNodeId === id) {
          return { ...conn, toX: x + 100, toY: y + 50 }
        }
        return conn
      })

      updateSession({ connections: updatedConnections })
    },
    [updateNode, activeSession, updateSession],
  )

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "z":
            e.preventDefault()
            if (e.shiftKey) {
              redo()
            } else {
              undo()
            }
            break
          case "s":
            e.preventDefault()
            // Autosave is handled automatically
            break
          case "n":
            e.preventDefault()
            addNode("idea")
            break
        }
      }

      if (selectedNodeId) {
        switch (e.key) {
          case "Delete":
          case "Backspace":
            deleteNode(selectedNodeId)
            break
          case "c":
            if (e.ctrlKey || e.metaKey) {
              setIsConnecting(true)
              setConnectingFromId(selectedNodeId)
            }
            break
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [selectedNodeId, undo, redo, addNode, deleteNode])

  // Zoom and pan
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    if (e.ctrlKey || e.metaKey) {
      // Zoom
      const delta = e.deltaY > 0 ? 0.9 : 1.1
      setScale((prev) => Math.max(0.1, Math.min(3, prev * delta)))
    } else {
      // Pan
      setPanOffset((prev) => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY,
      }))
    }
  }, [])

  return (
    <div className="h-screen flex" style={{ backgroundColor: "#ededed" }}>
      {/* Sidebar */}
      <div className="w-1/5 p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#2d6a4f]">Mind Maps</h1>
          <button
            onClick={createNewSession}
            className="p-2 bg-[#2d6a4f] text-white rounded-xl hover:bg-[#2d6a4f]/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          <AnimatePresence>
            {sessions.map((session) => (
              <SidebarSessionItem
                key={session.id}
                session={session}
                isActive={session.id === activeSessionId}
                onClick={() => setActiveSessionId(session.id)}
                onDelete={() => deleteSession(session.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="p-4 flex items-center gap-2 bg-white/50">
          <div className="flex gap-1">
            {Object.entries(nodeTypeConfig).map(([type, config]) => (
              <button
                key={type}
                onClick={() => addNode(type as Node["type"])}
                className="p-2 bg-white rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
                title={`Add ${config.label}`}
              >
                <config.icon className="w-4 h-4" style={{ color: config.color }} />
                <span className="text-sm">{config.label}</span>
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2" />

          <div className="flex gap-1">
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="p-2 bg-white rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 bg-white rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2" />

          <div className="flex gap-1">
            <button
              onClick={() => setScale((prev) => Math.min(3, prev * 1.2))}
              className="p-2 bg-white rounded-xl hover:bg-gray-50 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScale((prev) => Math.max(0.1, prev * 0.8))}
              className="p-2 bg-white rounded-xl hover:bg-gray-50 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setScale(1)
                setPanOffset({ x: 0, y: 0 })
              }}
              className="p-2 bg-white rounded-xl hover:bg-gray-50 transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2" />

          <div className="flex gap-1">
            <button
              onClick={exportSession}
              className="p-2 bg-white rounded-xl hover:bg-gray-50 transition-colors"
              title="Export Session"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-white rounded-xl hover:bg-gray-50 transition-colors"
              title="Import Session"
            >
              <Upload className="w-4 h-4" />
            </button>
          </div>

          <div className="ml-auto text-sm text-gray-600">
            {activeSession?.name} • {activeSession?.nodes.length || 0} nodes
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={canvasRef}
          className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
          onClick={handleCanvasClick}
          onWheel={handleWheel}
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
          }}
        >
          {activeSession && (
            <>
              {/* Connections */}
              {activeSession.connections.map((connection) => (
                <ConnectionComponent key={connection.id} connection={connection} scale={scale} />
              ))}

              {/* Nodes */}
              {activeSession.nodes.map((node) => (
                <NodeComponent
                  key={node.id}
                  node={node}
                  isSelected={selectedNodeId === node.id}
                  onSelect={handleNodeSelect}
                  onDrag={handleNodeDrag}
                  onEdit={(id, title, content) => updateNode(id, { title, content })}
                  onDelete={deleteNode}
                  scale={scale}
                />
              ))}
            </>
          )}

          {/* Connection indicator */}
          {isConnecting && (
            <div className="absolute top-4 left-4 bg-[#2d6a4f] text-white px-4 py-2 rounded-xl">
              Click on a node to connect
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept=".json" onChange={importSession} className="hidden" />
    </div>
  )
}
