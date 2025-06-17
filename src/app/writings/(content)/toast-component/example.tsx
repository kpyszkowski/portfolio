'use client'
import React from 'react'
import { Playground } from '~/components/playground'
import { ToastProvider, useToast } from './toast'
import { Button } from '~/components/ui/button'

const ToastExampleContent = () => {
  const toast = useToast()

  return (
    <Playground
      content={({ registerControl }) => {
        const [title] = registerControl('title', 'Example toast!', {
          label: 'Title',
        })
        const [description] = registerControl(
          'description',
          'This is toast message',
          {
            label: 'Description',
          },
        )
        const [timeout] = registerControl('timeout', 3000, {
          label: 'Timeout (ms)',
          step: 100,
          min: 1000,
          max: 10000,
        })

        return (
          <Button
            onClick={() => {
              toast.add({
                title,
                description,
                timeout,
              })
            }}
          >
            Add Toast
          </Button>
        )
      }}
      sourceCodeLanguage="tsx"
      sourceCode={({ title, description, timeout }) => [
        `<ToastProvider>`,
        `  <Button onClick={() => {`,
        `    useToast().add({`,
        `      title: '${title}',`,
        `      description: '${description}',`,
        `      timeout: ${timeout},`,
        `    })`,
        `  }}>`,
        `    Add Toast`,
        `  </Button>`,
        `</ToastProvider>`,
      ]}
    />
  )
}

const ToastExample = () => {
  return (
    <ToastProvider>
      <ToastExampleContent />
    </ToastProvider>
  )
}

export default ToastExample
