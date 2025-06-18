import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { apiCreateLetter, apiUpdateLetter, apiGetLetter } from '../../apis/letter';

const LetterForm = () => {
    const [letterId, setLetterId] = useState('');
    const [bodyLetter, setBodyLetter] = useState('');
    const [message, setMessage] = useState('');
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);

    // Hàm lấy danh sách thư
    const fetchLetters = async () => {
        setLoading(true);
        try {
            const response = await apiGetLetter();
            const sortedLetters = [...(response.bodyLetter || [])].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setLetters(sortedLetters);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi tải danh sách thư');
        } finally {
            setLoading(false);
        }
    };

    // Lấy thư khi khởi tạo
    useEffect(() => {
        fetchLetters();
    }, []);
    useEffect(() => {
    if (!letterId) {
        setBodyLetter('');
        return;
    }

    const selectedLetter = letters.find(letter => letter._id === letterId);
    if (selectedLetter) {
        setBodyLetter(selectedLetter.bodyLetter);
    } else {
        setBodyLetter('');
    }
}, [letterId, letters]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bodyLetter) {
            setIsError(true);
            setMessage('Vui lòng nhập nội dung!');
            return;
        }

        const data = { bodyLetter };
        try {
            let response;
            if (letterId) {
                await apiUpdateLetter(data, letterId);
                setMessage('Cập nhật thư thành công!');
            } else {
                await apiCreateLetter(data);
                setMessage('Tạo thư thành công!');
            }

            setIsError(false);
            setLetterId('');
            setBodyLetter('');
            await fetchLetters(); // Cập nhật lại danh sách
        } catch (error) {
            setIsError(true);
            setMessage(`Lỗi: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Quản lý thư</h2>

            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md mb-6">
                <div className="mb-4">
                    <label htmlFor="letterId" className="block text-sm font-medium text-gray-700">
                        ID thư (để cập nhật):
                    </label>
                    <input
                        type="text"
                        id="letterId"
                        value={letterId}
                        onChange={(e) => setLetterId(e.target.value)}
                        placeholder="Để trống nếu tạo mới"
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="bodyLetter" className="block text-sm font-medium text-gray-700">
                        Nội dung:
                    </label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={bodyLetter}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setBodyLetter(data);
                        }}
                        config={{
                            toolbar: [
                                'heading', '|',
                                'bold', 'italic', 'underline', 'strikethrough', '|',
                                'bulletedList', 'numberedList', '|',
                                'link', 'undo', 'redo'
                            ]
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                >
                    Gửi
                </button>

                {message && (
                    <div className={`mt-4 text-center ${isError ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </div>
                )}
            </form>

            <div>
                <h3 className="text-xl font-semibold mb-3 text-center">Danh sách thư</h3>
                {loading ? (
                    <p className="text-center text-gray-500">Đang tải thư...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : letters.length === 0 ? (
                    <p className="text-center text-gray-500">Không có thư nào.</p>
                ) : (
                    <ul className="space-y-4">
                        {letters.map((letter) => (
                            <li key={letter._id} className="p-4 border rounded-md shadow-sm bg-white">
                                <p className="text-xs text-gray-400 mb-1">ID: {letter._id}</p>
                                <div dangerouslySetInnerHTML={{ __html: letter.bodyLetter }} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default LetterForm;
