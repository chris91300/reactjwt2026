import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from './auth.service';

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('bastien@example.com');
  const [password, setPassword] = useState('tacostacos');
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // TODO: authenticate against the backend before navigating.
    const response = await login(username, password);

    if (response.success) {
      navigate('/todos');
    } else {
      setErrorMessage(response.error)
    }

  }

  return (
    <>
      <h2>Sign in</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Email: </span>
          <input
            type="email"
            autoComplete="username"
            placeholder="email@example.com"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>

        <label>
          <span>Password: </span>
          <input
            type="password"
            autoComplete="current-password"
            placeholder="**********"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <button type="submit">Send</button>
        <p>{errorMessage}</p>
      </form>
    </>
  );
}
