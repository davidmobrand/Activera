import { Editor as TinyMCEEditor } from 'tinymce';

interface FilePickerCallback {
  (value: string, meta?: { alt: string; source2?: string }): void;
}

interface FilePickerMeta {
  filetype: 'image' | 'media' | 'file';
}

export const getEditorConfig = (editorRef: React.MutableRefObject<TinyMCEEditor | null>, exerciseId: string) => ({
  height: '100%',
  menubar: true,
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'help', 'wordcount', 'codesample',
    'emoticons', 'paste', 'mediaembed'
  ],
  toolbar: [
    'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify',
    'bullist numlist outdent indent | image media mediaembed link | removeformat | help'
  ].join(' | '),
  content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; line-height: 1.5; }',
  extended_valid_elements: 'audio[controls|src],source[src|type],iframe[src|width|height|frameborder|allow|allowfullscreen]',
  media_live_embeds: true,
  paste_data_images: true,
  automatic_uploads: true,
  images_upload_handler: async (blobInfo: any) => {
    try {
      const formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());
      formData.append('type', 'IMAGE');

      const response = await fetch(`/api/exercises/${exerciseId}/media`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },
  file_picker_callback: async (callback: FilePickerCallback, value: string, meta: FilePickerMeta) => {
    if (meta.filetype === 'image') {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'IMAGE');

        try {
          const response = await fetch(`/api/exercises/${exerciseId}/media`, {
            method: 'POST',
            body: formData
          });

          if (!response.ok) throw new Error('Upload failed');
          const data = await response.json();
          callback(data.url, { alt: data.name });
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };
    }

    if (meta.filetype === 'media') {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'audio/*');
      input.click();

      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'AUDIO');

        try {
          const response = await fetch(`/api/exercises/${exerciseId}/media`, {
            method: 'POST',
            body: formData
          });

          if (!response.ok) throw new Error('Upload failed');
          const data = await response.json();
          callback(data.url);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };
    }
  },
  setup: (editor: TinyMCEEditor) => {
    editor.on('init', () => {
      editorRef.current = editor;
    });
  },
  mobile: {
    menubar: true,
    toolbar: [
      'undo redo | bold italic | bullist numlist',
      'image media link | blocks | help'
    ].join(' | '),
    height: '100%'
  }
}); 