const BASE_URL = 'http://localhost:4000';

export const apiRegister = async (user: any) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Register failed');
  return data;
};

export const apiLogin = async (user: any) => {
  console.log('inapifie',user)
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const apiGetProfile = async () => {
  const res = await fetch(`${BASE_URL}/auth/profile`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Unauthorized');
  return data;
};

export const apiGetAllUsers = async () => {
  const res = await fetch(`${BASE_URL}/auth`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch users');
  return data;
};

export const apiGetUserById = async (id: number) => {
  const res = await fetch(`${BASE_URL}/auth/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'User not found');
  return data;
};

export const apiDeleteUser = async (id: number) => {
  const res = await fetch(`${BASE_URL}/auth/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Delete failed');
  return data;
};
