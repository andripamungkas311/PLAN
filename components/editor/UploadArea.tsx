'use client'

import { useRef, useState } from 'react'
import { Upload, Plus } from 'lucide-react'

interface UploadAreaProps {
  onUpload: (dataUrl: string) => void
  onStartEmpty: () => void
}

export default function UploadArea({ onUpload, onStartEmpty }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Поддерживаются только изображения: PNG, JPG, JPEG, WebP, GIF')
      return
    }
    setIsLoading(true)
    setError(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      setIsLoading(false)
      onUpload(e.target?.result as string)
    }
    reader.onerror = () => {
      setIsLoading(false)
      setError('Ошибка чтения файла. Попробуйте ещё раз.')
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  return (
    <div className="flex flex-col items-center gap-8 max-w-2xl w-full px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Начать новый проект</h2>
        <p className="text-[#8A8A8A] text-sm">
          Загрузите изображение планировки или начните с чистого листа
        </p>
      </div>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full border-2 border-dashed rounded-xl p-12 flex flex-col items-center gap-4 cursor-pointer transition-all ${
          isDragging
            ? 'border-[#C9A84C] bg-[rgba(201,168,76,0.1)]'
            : 'border-[rgba(201,168,76,0.3)] hover:border-[#C9A84C] hover:bg-[rgba(201,168,76,0.05)] bg-[#111111]'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="w-16 h-16 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center">
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload size={28} className="text-[#C9A84C]" />
          )}
        </div>
        <div className="text-center">
          <p className="text-[#E8D5A3] font-medium mb-1">
            {isLoading ? 'Загрузка...' : 'Перетащите файл сюда'}
          </p>
          <p className="text-[#8A8A8A] text-sm">или нажмите для выбора файла</p>
          <p className="text-[#555] text-xs mt-2">PNG, JPG, JPEG, WebP</p>
        </div>
        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 px-3 py-1.5 rounded-lg">{error}</p>
        )}
      </div>

      <div className="flex items-center gap-4 w-full">
        <div className="flex-1 h-px bg-[rgba(201,168,76,0.2)]" />
        <span className="text-[#555] text-sm">или</span>
        <div className="flex-1 h-px bg-[rgba(201,168,76,0.2)]" />
      </div>

      <button
        onClick={onStartEmpty}
        className="flex items-center gap-2 bg-[#1a1a1a] border border-[rgba(201,168,76,0.3)] hover:border-[#C9A84C] text-[#E8D5A3] hover:text-white px-6 py-3 rounded-lg transition-all font-medium"
      >
        <Plus size={18} className="text-[#C9A84C]" />
        Начать с пустого холста
      </button>
    </div>
  )
}
