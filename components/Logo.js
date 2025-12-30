export default function Logo({ className = '', width = 180 }) {
  return (
    <img
      src="/assets/logo.svg"
      alt="Quasar Markets"
      className={className}
      width={width}
      style={{ height: 'auto' }}
    />
  );
}
