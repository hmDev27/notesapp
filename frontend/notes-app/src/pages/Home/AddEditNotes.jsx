import {useState} from 'react'
import TagInput from '../../components/Navbar/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosinstance';


const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage}) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    
    const [error, setError] = useState(null);

    // Add Note
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags,
            });

            if (response.data && response.data.note) {
                showToastMessage("မှတ်တမ်းတည်‌ဆောက်မှု အောင်မြင်သည်။")
                getAllNotes()
                onClose();
            }
        } catch (error) {
            if(
                error.response &&
                error.response.data && 
                error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        }
    };

    // Edit Note 
    const editNote = async () => {
        const noteId = noteData._id

        try {
            const response = await axiosInstance.put("/edit-note/" + noteId, {
                title,
                content,
                tags,
            });

            if (response.data && response.data.note) {
                showToastMessage("မှတ်တမ်းပြင်ဆင်မှု အောင်မြင်သည်။")
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        }
    };

    const handleAddNote = () => {
        if(!title){
            setError("ခေါင်းစဥ် ရေးမှတ်ပါ");
            return;
        }
        if(!content) {
            setError("အကြောင်းအရာ ရေးမှတ်ပါ")
            return;
        }

        setError("");

        if(type === 'edit'){
            editNote();
        }else {
            addNewNote()
        }
    };

  return (
    <div className="relative w-full max-w-lg mx-auto bg-white p-4 rounded shadow">
        <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute top-0 right-0 hover:bg-slate-50"onClick={onClose}>
            <MdClose className="text-xl text-slate-400"/>
        </button>

        <div className="flex flex-col gap-2">
            <label className="input-label">TITLE</label>
            <input type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="ခေါင်းစဥ်.."
            value={title}
            onChange={({target}) => setTitle(target.value)}/>
        </div>
        
        <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">CONTENT</label>
            <textarea 
                type="text"
                className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                placeholder="အကြောင်းအရာ.."
                rows={10}
                value={content}
                onChange={({target}) => setContent(target.value)}
                />
        </div>

         <div className="mt-3"> 
            <label className="input-label">TAGS</label>
            <TagInput tags={tags} setTags={setTags} />
         </div>

         {error && <p className="text-red-500 text-xs pt-4">{error}</p>}       
         <button className="btn-primary font-medium mt-5 p-3" 
         onClick={handleAddNote}>
            {type === "edit"? "မှတ်တမ်းကို ပြင်ဆင်ပါ" :"မှတ်တမ်း တည်ဆောက်ပါ"}
         </button>
    </div>
  )
}   

export default AddEditNotes

