import { apiClient } from "@/shared/api";

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("allowType", "IMAGE");
  const data = await apiClient.post<{ url: string }>("/file/upload", formData);
  return data.data.url;
}
