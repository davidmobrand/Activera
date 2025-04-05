import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCE } from 'tinymce';
import { getEditorConfig } from '@/lib/editor/config';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  exerciseId: string;
}

export function RichTextEditor({ value, onChange, exerciseId }: RichTextEditorProps) {
  const editorRef = useRef<TinyMCE | null>(null);

  return (
    <div className="h-[50vh] sm:h-96">
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        value={value}
        onEditorChange={onChange}
        init={getEditorConfig(editorRef, exerciseId)}
      />
    </div>
  );
} 