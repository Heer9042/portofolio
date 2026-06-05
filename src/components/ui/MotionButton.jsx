import React from 'react'
import { m } from 'framer-motion'

export default function MotionButton({ children, className = '', as = 'button', ...props }) {
  const Component = m[as] || m.button
  return (
    <Component
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`inline-flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
