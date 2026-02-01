/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './index.html',
        './**/*.js'
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                    700: '#6d28d9',
                    800: '#5b21b6',
                    900: '#4c1d95',
                },
                secondary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                dark: {
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                    950: '#0a0f1a',
                },
            },
            boxShadow: {
                glow: '0 0 15px rgba(139, 92, 246, 0.5), 0 0 30px rgba(139, 92, 246, 0.3)',
                'glow-sm': '0 0 10px rgba(139, 92, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.2)',
                'glow-blue': '0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)',
            },
            animation: {
                'bounce-slow': 'bounce 3s infinite',
                'blink': 'blink 1s step-end infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 8s linear infinite',
            },
            keyframes: {
                blink: {
                    '0%, 100%': {
                        opacity: '1'
                    },
                    '50%': {
                        opacity: '0'
                    },
                },
                float: {
                    '0%, 100%': {
                        transform: 'translateY(0)'
                    },
                    '50%': {
                        transform: 'translateY(-10px)'
                    },
                }
            }
        },
    },
    plugins: [],
}
