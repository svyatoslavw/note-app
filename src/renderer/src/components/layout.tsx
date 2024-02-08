import clsx from 'clsx'
import { ComponentProps, forwardRef } from 'react'

const Container = ({ children, ...props }: ComponentProps<'main'>) => {
  return (
    <main {...props} className="flex flex-row h-screen">
      {children}
    </main>
  )
}

const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('flex-1 overflow-auto', className)} {...props}>
      {children}
    </div>
  )
)

Content.displayName = 'Content'

export { Container, Content }
