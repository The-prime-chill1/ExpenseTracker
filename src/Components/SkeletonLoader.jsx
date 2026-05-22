import '../styles/global.css'

export default function SkeletonLoader({ type = 'card' }) {
  if (type === 'card') {
    return (
      <div className="skeleton" style={{ height: '180px', width: '100%', borderRadius: '1rem' }} />
    )
  }
  return <div className="skeleton" style={{ height: '60px', width: '100%', marginBottom: '0.5rem' }} />
}