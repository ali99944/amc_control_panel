import React from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'accent' | 'danger' | 'inverted-primary' | 'inverted-secondary'
    size?: 'sm' | 'md' | 'lg' | 'icon'
    children: React.ReactNode
}

export function Button({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    children, 
    ...props 
}: ButtonProps) {
    return (
        <button
            className={cn(
                'cursor-pointer inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                {
                    'bg-primary hover:bg-primary/90 text-white': variant === 'primary',
                    'bg-secondary hover:bg-secondary/90 text-white': variant === 'secondary',
                    'border-2 border-primary text-primary hover:bg-primary hover:text-white': variant === 'outline',
                    'text-primary hover:bg-primary/10': variant === 'ghost',
                    'text-primary hover:text-primary/80 underline': variant === 'link',
                    'bg-accent hover:bg-accent/90 text-white': variant === 'accent',
                    'bg-red-600 hover:bg-red-700 text-white': variant === 'danger',
                    // Inverted variants
                    'bg-white text-primary hover:bg-white/90 hover:text-primary': variant === 'inverted-primary',
                    'bg-white text-secondary hover:bg-secondary/10 hover:text-secondary': variant === 'inverted-secondary',
                },
                {
                    'h-8 px-3 text-sm': size === 'sm',
                    'h-10 px-4': size === 'md',
                    'h-12 px-6 text-lg': size === 'lg',
                    'h-8 w-8': size === 'icon',
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
