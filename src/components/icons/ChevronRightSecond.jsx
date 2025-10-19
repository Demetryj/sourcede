export default function ChevronRightSecond({ className, props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      {...props}
    >
      <rect x="0.5" y="0.5" width="31" height="31" stroke="transparent" />
      <path
        d="M12 8.00007C12 8.00007 20 13.8919 20 16.0001C20 18.1082 12 24 12 24"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
