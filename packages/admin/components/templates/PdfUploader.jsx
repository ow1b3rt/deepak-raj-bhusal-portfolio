"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

import { fetcher, resolveUrl } from "../../utils/utils.js";
import { useResolvedDefault } from "../atoms/Input.jsx";
import { MediaLibraryModal } from "../organisms/MediaLibraryModal.jsx";

export function PdfUploader({
  name,
  id = "pdf-input",
  caption = "PDF Document",
  ...rest
}) {
  const [selectedMedia, setSelectedMedia] = useState(null); // { id, url, title }
  const [modalOpen, setModalOpen] = useState(false);
  const defaultProps = useResolvedDefault(name, rest);
  const defValue = defaultProps?.defaultValue;

  // Load existing value (a media UUID stored on the record)
  useEffect(() => {
    if (!defValue) return;
    fetcher(`/media/${defValue}`).then((res) => {
      if (res?.item) setSelectedMedia(res.item);
    });
  }, [defValue]);

  const handleSelect = (media) => {
    setSelectedMedia(media);
    setModalOpen(false);
  };

  const handleRemove = () => {
    setSelectedMedia(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">{caption}</label>

      {selectedMedia ? (
        <div className="group relative flex w-full overflow-hidden items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <FileText className="h-8 w-8 shrink-0 text-red-500" />
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <span className="truncate text-sm font-medium text-gray-800">
              {selectedMedia.title || selectedMedia.alt || "PDF Document"}
            </span>
            {selectedMedia.url && (
              <a
                href={resolveUrl(selectedMedia)}
                target="_blank"
                rel="noopener noreferrer"
                className="block truncate text-xs text-blue-500 hover:underline"
              >
                {selectedMedia.url}
              </a>
            )}
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:border-blue-500 hover:text-blue-600"
            >
              Change
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:border-red-400 hover:text-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="flex h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-5 text-gray-400 transition-colors hover:border-red-400 hover:text-red-500"
          onClick={() => setModalOpen(true)}
        >
          <FileText className="h-8 w-8" />
          <span className="text-sm font-medium">Click to choose a PDF from media library</span>
          <span className="text-xs text-gray-300">Supports PDF files</span>
        </button>
      )}

      {/* Hidden input carries the media UUID to the form payload */}
      {selectedMedia?.id && (
        <input type="hidden" name={name} id={id} value={selectedMedia.id} readOnly />
      )}

      {modalOpen && (
        <MediaLibraryModal
          onClose={() => setModalOpen(false)}
          onSelect={handleSelect}
          name={name}
        />
      )}
    </div>
  );
}
