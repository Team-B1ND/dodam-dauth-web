import { api } from "@/shared/api";
import type { ClientInfo } from "@/entities/client/types";

export async function getClient(clientId: string): Promise<ClientInfo> {
  const { data } = await api.get(`/oauth/clients/${clientId}`);
  return data.data;
}

export async function getMyClients(): Promise<ClientInfo[]> {
  const { data } = await api.get("/oauth/clients/me");
  return data.data;
}

export async function registerClient(body: {
  clientName: string;
  redirectUris: string[];
  scopes: string[];
  websiteUrl?: string;
  description?: string;
  logoUrl?: string;
}): Promise<{ clientId: string; clientSecret: string }> {
  const { data } = await api.post("/oauth/clients", body);
  return data.data;
}

export async function updateClient(clientId: string, secret: string, body: {
  clientName: string;
  redirectUris: string[];
  scopes: string[];
  websiteUrl?: string;
  description?: string;
  logoUrl?: string;
}): Promise<ClientInfo> {
  const { data } = await api.put(`/oauth/clients/${clientId}`, { clientSecret: secret, ...body });
  return data.data;
}

export async function deactivateClient(clientId: string, secret: string): Promise<void> {
  await api.delete(`/oauth/clients/${clientId}`, { data: { clientSecret: secret } });
}

export async function transferOwnership(clientId: string, secret: string, newOwnerPublicId: string): Promise<ClientInfo> {
  const { data } = await api.post(`/oauth/clients/${clientId}/transfer`, { clientSecret: secret, newOwnerPublicId });
  return data.data;
}

export async function resetClientSecret(clientId: string, secret: string): Promise<{ clientId: string; clientSecret: string }> {
  const { data } = await api.post(`/oauth/clients/${clientId}/secret/reset`, { clientSecret: secret });
  return data.data;
}

export async function ownerResetSecret(clientId: string): Promise<{ clientId: string; clientSecret: string }> {
  const { data } = await api.post(`/oauth/clients/${clientId}/secret/owner-reset`);
  return data.data;
}
