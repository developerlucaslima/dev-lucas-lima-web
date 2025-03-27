import { useCallback, useEffect, useRef, useState } from 'react'

interface UseTypeWriterProps {
  words: string[]
  isLoopingWords?: boolean
  typeSpeed?: number
  deleteSpeed?: number
  delaySpeed?: number
}

export function useTypeWriter({
  words = [''],
  isLoopingWords = false,
  typeSpeed = 80,
  deleteSpeed = 50,
  delaySpeed = 1500,
}: UseTypeWriterProps) {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [isWaiting, setIsWaiting] = useState(false)
  const isCompleteMounted = useRef(true)

  useEffect(() => {
    isCompleteMounted.current = true
    return () => {
      isCompleteMounted.current = false
    }
  }, [])

  const getNextWordIndex = useCallback((): number => {
    const isLastWord = wordIndex === words.length - 1
    if (isLastWord) {
      return isLoopingWords ? 0 : wordIndex
    }
    return wordIndex + 1
  }, [wordIndex, words.length, isLoopingWords])

  const handleTyping = useCallback(() => {
    if (!isCompleteMounted.current) return

    const currentWord = words[wordIndex]
    const isWordComplete = text === currentWord

    if (isWordComplete) {
      setIsWaiting(true)
      return
    }
    setText(currentWord.substring(0, text.length + 1))
  }, [text, words, wordIndex])

  const handleDeleting = useCallback(() => {
    if (!isCompleteMounted.current) return

    const currentWord = words[wordIndex]

    if (text === '') {
      setIsDeleting(false)
      setWordIndex(getNextWordIndex())
      return
    }
    setText(currentWord.substring(0, text.length - 1))
  }, [text, words, wordIndex, getNextWordIndex])

  // Main effect to control the typewriter timing.
  useEffect(() => {
    let timer: number

    if (isWaiting) {
      timer = window.setTimeout(() => {
        if (isCompleteMounted.current) {
          setIsWaiting(false)
          setIsDeleting(true)
        }
      }, delaySpeed)
    }

    if (!isWaiting && isDeleting) {
      timer = window.setTimeout(handleDeleting, deleteSpeed)
    }

    if (!isWaiting && !isDeleting) {
      timer = window.setTimeout(handleTyping, typeSpeed)
    }

    return () => window.clearTimeout(timer)
  }, [
    text,
    isDeleting,
    isWaiting,
    typeSpeed,
    deleteSpeed,
    delaySpeed,
    handleTyping,
    handleDeleting,
  ])
}
