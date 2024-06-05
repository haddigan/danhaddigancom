export function ImagePreview({
  onRemoveImage: handleRemoveImage = () => {},
  previewSrc,
}: {
  onRemoveImage?: () => void;
  previewSrc: string;
}) {
  return (
    <div className="card">
      <figure>
        <img
          src={previewSrc}
          alt="Preview of the uploaded file"
          className="w-full"
        />
      </figure>
      <div className="py-3 w-full">
        <button className="btn btn-error w-full" onClick={handleRemoveImage}>
          Remove Image
        </button>
      </div>
    </div>
  );
}
