interface IconProps {
  className?: string
}

export const Icon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      width={68}
      height={68}
      className={className}
      style={{ width: '68px', height: '68px' }}
    >
      <path d='M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z'></path>
      <path d='M8 4l0 16'></path> <path d='M16 4l0 16'></path>
      <path d='M4 8l4 0'></path> <path d='M4 16l4 0'></path>
      <path d='M4 12l16 0'></path> <path d='M16 8l4 0'></path>
      <path d='M16 16l4 0'></path>
    </svg>
  )
}
