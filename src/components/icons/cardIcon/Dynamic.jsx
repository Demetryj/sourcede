export default function Dynamic({ className, props }) {
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
      <path
        d="M28 28H13.3333C8.93356 28 6.73367 28 5.36684 26.6332C4 25.2663 4 23.0664 4 18.6667V4"
        stroke="#22281E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M9.33398 5.33301H10.6673" stroke="#22281E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.33398 9.33301H14.6673" stroke="#22281E" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M6.66602 26.6663C8.09392 24.0703 10.0297 17.3582 13.7411 17.3582C16.3061 17.3582 16.9704 20.6286 19.4841 20.6286C23.8089 20.6286 23.182 13.333 27.9993 13.333"
        stroke="#22281E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
