export function RegisterButton({ event, isRegistering, onRegister }) {
  const isFull = event.registrations >= event.capacity
  return <button className="register-button" type="button" disabled={isFull || isRegistering} onClick={() => onRegister(event._id)}>
    {isFull ? 'Event full' : isRegistering ? 'Registering…' : 'Register'}
  </button>
}
