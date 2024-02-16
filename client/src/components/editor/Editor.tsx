import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
	content: string;
	setContent: React.Dispatch<React.SetStateAction<string>>;
};

const Editor: React.FC<Props> = ({ content, setContent }) => {
	const modules = {
		toolbar: [
			[{ header: "1" }, { header: "2" }, { font: [] }],
			[{ size: [] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" },
			],
			["link"],
			["clean"],
		],
		clipboard: {
			// toggle to add extra line breaks when pasting HTML:
			matchVisual: false,
		},
	};

	const formats = [
		"header",
		"font",
		"size",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
		"link",
	];

	return (
		<ReactQuill
			theme="snow"
			value={content}
			modules={modules}
			formats={formats}
			onChange={setContent}
			placeholder="Add brief about note..."
		/>
	);
};

export default Editor;
