<<<<<<< HEAD
import { api } from '../lib/api.js'
=======
import { api } from "../lib/api.js";
>>>>>>> dev

function normalizeLimit(limit) {
  return Number.isInteger(limit) && limit > 0 ? limit : undefined;
}

function normalizeService(service) {
<<<<<<< HEAD
  return typeof service === 'string' && service.trim() ? service.trim() : undefined
}

export async function getGallery({ limit, service } = {}) {
  const response = await api.get('/gallery', {
=======
  return typeof service === "string" && service.trim()
    ? service.trim()
    : undefined;
}

export async function getGallery({ limit, service } = {}) {
  const response = await api.get("/gallery", {
>>>>>>> dev
    params: {
      limit: normalizeLimit(limit),
      service: normalizeService(service),
    },
<<<<<<< HEAD
  })
  return response.data
=======
  });

  return response.data;
>>>>>>> dev
}

export async function getGalleryItems(options = {}) {
  const data = await getGallery(options);
  return data.galleryItems || [];
}

export async function getGalleryServices() {
<<<<<<< HEAD
  const response = await api.get('/gallery/services')
  return response.data.services || []
=======
  const response = await api.get("/gallery/services");
  return response.data.services || [];
>>>>>>> dev
}
