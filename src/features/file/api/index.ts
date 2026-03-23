import { api } from "@/shared/api";

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("allowType", "IMAGE");

  const { data } = await api.post("/file/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data.data.url;
}
