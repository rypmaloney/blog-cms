import { Editor } from '@tinymce/tinymce-react';

const MCEeditor = (props) => {
    const { initialValue, editorRef } = props;

    return (
        <Editor
            apiKey={'4sotskl0ipae1fkhidjiczer00626csy54r5wcsptf8udmdb'}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={initialValue}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                    'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
        />
    );
};

export default MCEeditor;
