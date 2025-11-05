'use server';
import { cookies } from "next/headers";

export async function getCookieValue(name: string): Promise<any> {
  const cookieStore = cookies();
  const c = (await cookieStore).get(name);
  if (!c) return null;

  const raw = c.value;
  try {
    return JSON.parse(raw);
  } catch {
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }
}